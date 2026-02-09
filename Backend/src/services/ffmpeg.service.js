import ffmpeg from "fluent-ffmpeg";



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
