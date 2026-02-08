import fs from "fs";

export const deleteFileAfterDelay = (filePath, delayMs) => {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Auto-delete failed:", err.message);
      } else {
        console.log("Auto-deleted file:", filePath);
      }
    });
  }, delayMs);
};