import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Models to try in order (fallback)
const MODELS = [
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  'gemini-2.5-flash',
  'gemini-2.5-pro'
];

/**
 * Retry with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastRetry = i === maxRetries - 1;
      const isOverloaded = error.status === 503;
      
      if (isOverloaded && !isLastRetry) {
        const waitTime = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        console.log(`Model overloaded. Retrying in ${waitTime/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
}

/**
 * Try multiple models as fallback
 */
async function generateWithFallback(prompt, retries = 3) {
  for (const modelName of MODELS) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await retryWithBackoff(
        async () => await model.generateContent(prompt),
        retries
      );
      
      console.log(`✅ Success with ${modelName}`);
      return result.response.text();
      
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message.substring(0, 80)}`);
      
      // If it's the last model, throw the error
      if (modelName === MODELS[MODELS.length - 1]) {
        throw error;
      }
      // Otherwise, try next model
    }
  }
}

/**
 * Summarize transcript using Gemini with retry & fallback
 */
export async function summarizeText(transcript, summaryLength, summaryStyle, outputLanguage) {
  try {
    const prompts = {
      short: `Provide a brief 3-5 sentence summary in ${summaryStyle} and in language ${outputLanguage}`,
      medium: `Provide a comprehensive 1 ${summaryStyle} summary covering the main topics in ${outputLanguage}`,
      detailed: `Provide a detailed 2-3 ${summaryStyle} summary with all main points and important details in ${outputLanguage}`
    };
    
    const prompt = `${prompts[summaryLength]} of this text:\n\n${transcript}`;
    
    const summary = await generateWithFallback(prompt);
    return summary;
    
  } catch (error) {
    console.error('Summarization error:', error);
    throw new Error(`Failed to summarize after trying all models: ${error.message}`);
  }
}

/**
 * Extract key points from transcript
 */
export async function extractKeyPoints(transcript, outputLanguage) {
  try {
    const prompt = `Extract 5-8 key points in language ${outputLanguage} from this transcript as a numbered list:\n\n${transcript} and make the key points to the point, small and coincise `;
    
    const keyPoints = await generateWithFallback(prompt);
    return keyPoints;
    
  } catch (error) {
    console.error('Key points extraction error:', error);
    throw new Error(`Failed to extract key points: ${error.message}`);
  }
}

/**
 * Generate both summary and key points
 */
