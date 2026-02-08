import { Upload, FileVideo } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadArea({ onFileSelect, disabled }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes('video') || file.name.match(/\.(mp4|mkv|avi)$/))) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="video/mp4,video/x-matroska,video/avi"
        className="hidden"
        onChange={handleFileInput}
        disabled={disabled}
      />
      
      <motion.div
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          {isDragging ? (
            <Upload className="w-8 h-8 text-white" />
          ) : (
            <FileVideo className="w-8 h-8 text-white" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-1">
            {isDragging ? 'Drop your video here' : 'Drag & drop your video here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to browse (MP4, MKV, AVI)
          </p>
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          Maximum file size: 200MB
        </div>
      </motion.div>
    </motion.div>
  );
}