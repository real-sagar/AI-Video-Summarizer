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


const videoUpload = asyncHandler(async (req, res) => {
    const videoPath = req.file?.path;

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


    const summary = await summarizeText(text, 'medium')
    const keyPoints = await extractKeyPoints(text)




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

export default videoUpload;