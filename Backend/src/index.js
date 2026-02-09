import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

import { app } from "./app.js"

import fs from "fs";
import path from "path";
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is runnning at PORT at ${process.env.PORT}`);

})

const uploadDir = path.join(process.cwd(), "uploads/videos");

fs.mkdirSync(uploadDir, { recursive: true });