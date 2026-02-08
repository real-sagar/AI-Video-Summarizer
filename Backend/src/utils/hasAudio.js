import { exec } from "child_process";

export const hasAudioStream = (videoPath) => {
  return new Promise((resolve) => {
    exec(`ffmpeg -i "${videoPath}"`, (err, stdout, stderr) => {
      resolve(stderr.includes("Audio:"));
    });
  });
};
