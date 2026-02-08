import { createClient } from '@deepgram/sdk';
import fs from 'fs';

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export async function transcribeAudio(filePath) {
  try {
    const audioBuffer = fs.readFileSync(filePath);
    
    const { result } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      { 
        model: 'nova-2',
        smart_format: true,
        detect_language: true
      }
    );
    
    return result.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}