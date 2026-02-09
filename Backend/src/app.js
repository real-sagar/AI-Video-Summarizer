import cors from "cors";
import express from "express"

app.use(cors({
  origin: [
    process.env.CORS_ORIGIN, 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true , limit: "16kb"}))
app.use(express.static("public"))
app.use(express.json());

import videoRouter from "./routes/video.route.js"

app.use("/api/videos", videoRouter);

export {app}