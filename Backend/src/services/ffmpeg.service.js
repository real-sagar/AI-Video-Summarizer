import ffmpeg from "fluent-ffmpeg";

// ❌ REMOVE this line completely
// ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

export const extractAudioFromVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .noVideo()
      .output(outputPath)
      .on("start", cmd => console.log("FFmpeg command:", cmd))
      .on("end", () => resolve(outputPath))
      .on("error", err => reject(err))
      .run();
  });
};
