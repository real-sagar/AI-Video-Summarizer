import { motion } from 'motion/react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-red-50 border border-red-200 rounded-2xl p-8"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-red-900">Processing Failed</h3>
          <p className="text-sm text-red-700">{message}</p>
        </div>

        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 border-red-300 text-red-700 hover:bg-red-100"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </motion.div>
  );
}
