import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { videoUpload, generateUploadURL, startProcessing, jobStatus } from "../controllers/video.controller.js"
const videoRouter = Router()

videoRouter.route("/upload").post(
  upload.single("userVideo"),
  videoUpload

)
videoRouter.route("/generate-upload-url").post(generateUploadURL);
videoRouter.route("/start-processing").post(startProcessing);
videoRouter.route("/job-status/:id").get(jobStatus);

export default videoRouter;