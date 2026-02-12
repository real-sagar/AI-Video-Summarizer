import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { OptionsPanel } from './components/OptionsPanel';
import { ProcessingState } from './components/ProcessingState';
import { ResultSection } from './components/ResultSection';
import { ErrorState } from './components/ErrorState';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { Sparkles, RotateCcw } from 'lucide-react';
import { uploadVideo } from "../services/api";


type AppState = 'idle' | 'uploading' | 'transcribing' | 'generating' | 'completed' | 'error';

export default function App() {
  const [state, setState] = useState<AppState>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);


  const BACKEND_STAGE_PROGRESS = {
    uploading: 10,
    transcribing: 45,
    generating: 80,
    completed: 100,
  };


  // Options
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryStyle, setSummaryStyle] = useState('paragraph');
  
  const [outputLanguage, setOutputLanguage] = useState('english');


  const [summary, setSummary] = useState("");
  



  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };




  const handleStartProcessing = async () => {
    if (!selectedFile) return;

    try {
      // 1️⃣ Uploading stage
      setState("uploading");
      setProgress(BACKEND_STAGE_PROGRESS.uploading);

      const formData = new FormData();
      formData.append("userVideo", selectedFile);
      formData.append("summaryLength", summaryLength);
      formData.append("summaryStyle", summaryStyle);
      formData.append("outputLanguage", outputLanguage);
      

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // 2️⃣ While backend is working, move UI stages
      const transcribeTimer = setTimeout(() => {
        setState("transcribing");
        setProgress(35);
      }, 1200);

      const generateTimer = setTimeout(() => {
        setState("generating");
        setProgress(70);
      }, 3500);

      // 3️⃣ REAL backend call
      const res = await uploadVideo(formData);
      const data = res.data;




      clearTimeout(transcribeTimer);
      clearTimeout(generateTimer);

      // 4️⃣ Final result
      setSummary(data.data.summary);
      
      const rawKeyPoints = data.data.keyPoints;

      let normalizedKeyPoints: string[] = [];

      if (Array.isArray(rawKeyPoints)) {
        normalizedKeyPoints = rawKeyPoints;
      } else if (typeof rawKeyPoints === "string") {
        normalizedKeyPoints = rawKeyPoints
          .split("\n")
          .map((p: string) => p.replace(/^[-•]\s*/, "").trim())
          .filter(Boolean);
      }

      setKeyPoints(normalizedKeyPoints);




      setProgress(BACKEND_STAGE_PROGRESS.completed);
      setState("completed");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  };






  const handleReset = () => {
    setState('idle');
    setSelectedFile(null);
    setProgress(0);
  };

  const handleRetry = () => {
    if (selectedFile) {
      handleStartProcessing();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Toaster position="top-right" />
      <Header />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Summarize Your Video in Seconds
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your video and let our AI-powered system transcribe, analyze, and generate
                intelligent summaries automatically. Save hours of manual work.
              </p>
            </motion.div>
          )}

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
            {state === 'idle' && (
              <>
                <UploadArea onFileSelect={handleFileSelect} disabled={false} />

                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Selected:</span> {selectedFile.name}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <OptionsPanel
                      summaryLength={summaryLength}
                      setSummaryLength={setSummaryLength}
                      summaryStyle={summaryStyle}
                      setSummaryStyle={setSummaryStyle}
                     
                      outputLanguage={outputLanguage}
                      setOutputLanguage={setOutputLanguage}
                      disabled={false}
                    />

                    <Button
                      onClick={handleStartProcessing}
                      className="cursor-pointer w-full mt-6 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      <Sparkles className=" w-5 h-5 mr-2" />
                      Upload & Summarize
                    </Button>
                  </motion.div>
                )}
              </>
            )}

            {(state === 'uploading' || state === 'transcribing' || state === 'generating') && selectedFile && (
              <ProcessingState
                stage={state}
                progress={progress}
                filename={selectedFile.name}
              />
            )}

            {state === 'completed' && selectedFile && (
              <>
                <ResultSection
                  filename={selectedFile.name}
                  summary={summary}
                  summaryStyle={summaryStyle as "paragraph" | "bullets"}
                  
                  
                  keyPoints={keyPoints}
                />



                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="cursor-pointer w-full mt-6 h-12 text-base font-semibold gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Process Another Video
                </Button>
              </>
            )}

            {state === 'error' && (
              <ErrorState
                message="We encountered an error while processing your video. Please check your file and try again."
                onRetry={handleRetry}
              />
            )}
          </div>

          {/* Features Grid - Only show in idle state */}
          {state === 'idle' && !selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">
                  Advanced machine learning models analyze your video content with high accuracy
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-sm text-gray-600">
                  Get your video summary in minutes, not hours. Perfect for busy professionals
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-sm text-gray-600">
                  Export summaries as text, bullet points, or PDF. Choose what works for you
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}