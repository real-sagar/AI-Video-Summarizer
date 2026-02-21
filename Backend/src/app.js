import cors from "cors";
import express from "express"
import pool from "./config/db.js";
import s3Client from "./config/s3.js";

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true , limit: "16kb"}))
app.use(express.static("public"))
app.use(express.json());

import videoRouter from "./routes/video.route.js"

app.use("/api/videos", videoRouter);
app.use("api/videos", videoRouter)

export {app}