import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import videoUpload from "../controllers/video.controller.js"
const videoRouter = Router()

videoRouter.route("/upload").post(
  upload.single("userVideo"),
  videoUpload

)

export default videoRouter;