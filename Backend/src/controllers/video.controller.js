import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteFileAfterDelay } from "../utils/fileCleanup.js";
import { extractAudioFromVideo } from "../services/ffmpeg.service.js";
import path from "path";
import fs from "fs";
import { hasAudioStream } from "../utils/hasAudio.js";
import { transcribeAudio } from "../services/whisper.service.js";
import { extractKeyPoints, summarizeText } from "../services/gemini.service.js";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";
import pool from "../config/db.js";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import sqsClient from "../config/sqs.js";


const videoUpload = asyncHandler(async (req, res) => {
    const videoPath = req.file?.path;
    const summaryLength = req.body.summaryLength;
    const summaryStyle = req.body.summaryStyle;
    const outputLanguage = req.body.outputLanguage;
    console.log(summaryLength);


    if (!videoPath) {
        throw new ApiError(400, "Please upload video")
    }

    if (!req.file) {
        return res.status(400).json({ error: "No video file uploaded" });
    }


    const hasAudio = await hasAudioStream(videoPath);

    if (!hasAudio) {
        throw new ApiError(400, "Uploaded video does not contain audio");
    }


    deleteFileAfterDelay(videoPath, 1 * 60 * 1000);




    const dir = path.dirname(videoPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const audioPath = path.resolve(
        path.join(
            "uploads",
            "audio",
            `${path.parse(videoPath).name}.wav`
        )
    );

    fs.mkdirSync(path.dirname(audioPath), { recursive: true });

    await extractAudioFromVideo(
        path.resolve(videoPath),
        path.resolve(audioPath)
    );

    const text = await transcribeAudio(audioPath);
    if (!text) {
        throw new ApiError(500, "Something went wrong");
    }


    const summary = await summarizeText(text, summaryLength, summaryStyle, outputLanguage)
    const keyPoints = await extractKeyPoints(text, outputLanguage)




    deleteFileAfterDelay(audioPath, 1 * 60 * 1000);
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                path: videoPath,
                audioPath: audioPath,
                filename: req.file.filename,
                textFromSpeech: text,
                summary: summary,
                keyPoints: keyPoints
            },
            "Video uploaded successfully"
        ))
})

const generateUploadURL = asyncHandler(async (req, res) => {
    try {
        // 1️⃣ Generate unique job ID
        const jobId = uuidv4();

        // 2️⃣ Create S3 object key
        const objectKey = `videos/${jobId}.mp4`;

        // 3️⃣ Insert job into database
        await pool.query(
            "INSERT INTO jobs (id, object_key, status) VALUES ($1, $2, $3)",
            [jobId, objectKey, "uploaded"]
        );

        // 4️⃣ Create S3 upload command
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: objectKey,
            ContentType: "video/mp4",
        });

        // 5️⃣ Generate signed URL (valid for 5 minutes)
        const uploadUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300,
        });

        // 6️⃣ Return jobId + uploadUrl
        res.json({ jobId, uploadUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate upload URL" });
    }
})

const startProcessing = asyncHandler(async (req, res) => {
    try {
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ error: "jobId is required" });
        }

        const result = await pool.query(
            "SELECT * FROM jobs WHERE id = $1",
            [jobId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Job not found" });
        }

        if (result.rows[0].status !== "uploaded") {
            return res.status(400).json({ error: "Job already started" });
        }

        await pool.query(
            "UPDATE jobs SET status = $1, updated_at = NOW() WHERE id = $2",
            ["processing", jobId]
        );

        await sqsClient.send(
            new SendMessageCommand({
                QueueUrl: process.env.SQS_QUEUE_URL,
                MessageBody: JSON.stringify({ jobId }),
            })
        );

        res.json({ message: "Processing started" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to start processing" });
    }
})

const jobStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT status, summary FROM jobs WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch job status" });
    }
})
export { videoUpload, generateUploadURL, startProcessing, jobStatus };