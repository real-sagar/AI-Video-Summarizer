import { motion } from 'motion/react';
import { Copy, Download, CheckCircle, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import jsPDF from "jspdf";


interface ResultSectionProps {
  filename: string;
  summary: string;
  summaryStyle: "paragraph" | "bullets";
  showTranscript: boolean;
  transcript: string;
  keyPoints: string[];
}


export function ResultSection({
  filename,
  summary,
  summaryStyle,
  showTranscript,
  transcript,
  keyPoints
}: ResultSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success('Summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!summary) {
      toast.error("No summary available to download");
      return;
    }

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename.replace(/\.[^/.]+$/, "")}_summary.txt`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Summary downloaded as TXT");
  };


  const handleDownloadPdf = () => {
    if (!summary) {
      toast.error("No summary available to download");
      return;
    }

    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Video Summary", 14, yPosition);
    yPosition += 10;

    // Summary text
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(summary, 180);
    doc.text(summaryLines, 14, yPosition);
    yPosition += summaryLines.length * 7 + 10;

    // 👉 ADD KEY TAKEAWAYS HERE 👇
    if (Array.isArray(keyPoints) && keyPoints.length > 0) {
      doc.setFont("Times", "Bold");
      doc.text("Key Takeaways", 14, yPosition);
      yPosition += 8;

      doc.setFont("Times", "Normal");

      keyPoints.forEach((point, index) => {
        const pointLines = doc.splitTextToSize(`• ${point}`, 170);
        doc.text(pointLines, 18, yPosition);
        yPosition += pointLines.length * 7;
      });
    }

    doc.save(`${filename.replace(/\.[^/.]+$/, "")}_summary.pdf`);
    toast.success("Summary downloaded as PDF");
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
      >
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-green-900">
          Summary generated successfully!
        </p>
      </motion.div>

      {/* Video Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 truncate">{filename}</h3>
            <p className="text-sm text-gray-500">AI-generated summary</p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Summary</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTxt}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                TXT
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPdf}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            {summaryStyle === 'bullets' ? (
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {summary.split('\n').filter(s => s.trim()).map((point, idx) => (
                  <li key={idx} className="leading-relaxed">{point.replace(/^[•\-]\s*/, '')}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
            )}
          </div>
        </div>
        {Array.isArray(keyPoints) && keyPoints.length > 0 && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🔑 Key Takeaways
            </h3>

            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}


        {/* Transcript */}
        {showTranscript && transcript && (
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-gray-900">Full Transcript</h4>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 max-h-64 overflow-y-auto">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {transcript}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}