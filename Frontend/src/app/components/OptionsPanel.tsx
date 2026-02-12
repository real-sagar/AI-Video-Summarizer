import { Settings2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface OptionsPanelProps {
  summaryLength: string;
  setSummaryLength: (value: string) => void;
  summaryStyle: string;
  setSummaryStyle: (value: string) => void;

  outputLanguage: string;
  setOutputLanguage: (value: string) => void;
  disabled?: boolean;
}

export function OptionsPanel({
  summaryLength,
  setSummaryLength,
  summaryStyle,
  setSummaryStyle,

  outputLanguage,
  setOutputLanguage,
  disabled
}: OptionsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-5">
        <Settings2 className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Summarization Options</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="summary-length" className="text-sm font-medium text-gray-700">
            Summary Length
          </Label>
          <Select
            value={summaryLength}
            onValueChange={setSummaryLength}
            disabled={disabled}
          >
            <SelectTrigger id="summary-length" className="bg-gray-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (2-3 sentences)</SelectItem>
              <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
              <SelectItem value="detailed">Detailed (2-3 paragraphs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary-style" className="text-sm font-medium text-gray-700">
            Summary Style
          </Label>
          <Select
            value={summaryStyle}
            onValueChange={setSummaryStyle}
            disabled={disabled}
          >
            <SelectTrigger id="summary-style" className="bg-gray-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="bullets">Bullet Points</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output-language" className="text-sm font-medium text-gray-700">
            Output Language
          </Label>
          <Select
            value={outputLanguage}
            onValueChange={setOutputLanguage}
            disabled={disabled}
          >
            <SelectTrigger id="output-language" className="bg-gray-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>


      </div>
    </motion.div>
  );
}
