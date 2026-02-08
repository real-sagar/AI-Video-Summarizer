import { motion } from 'motion/react';
import { Loader2, Upload as UploadIcon, FileAudio, Sparkles } from 'lucide-react';
import { Progress } from './ui/progress';

interface ProcessingStateProps {
  stage: 'uploading' | 'transcribing' | 'generating';
  progress: number;
  filename: string;
}

const stageConfig = {
  uploading: {
    icon: UploadIcon,
    title: 'Uploading video...',
    description: 'Please wait while we upload your video file',
    color: 'text-blue-600'
  },
  transcribing: {
    icon: FileAudio,
    title: 'Transcribing audio...',
    description: 'Converting speech to text using AI',
    color: 'text-purple-600'
  },
  generating: {
    icon: Sparkles,
    title: 'Generating summary...',
    description: 'Our AI is analyzing the content and creating your summary',
    color: 'text-indigo-600'
  }
};

export function ProcessingState({ stage, progress, filename }: ProcessingStateProps) {
  const config = stageConfig[stage];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.div
          animate={{ rotate: stage === 'uploading' ? 0 : 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        <div className="space-y-2 w-full">
          <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600">{config.description}</p>
          <p className="text-xs text-gray-500 font-medium mt-2">
            Processing: {filename}
          </p>
        </div>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm font-medium text-gray-700">{progress}% complete</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>This may take a few moments...</span>
        </div>
      </div>
    </motion.div>
  );
}
