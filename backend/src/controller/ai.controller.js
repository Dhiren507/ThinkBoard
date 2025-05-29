import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('Warning: GEMINI_API_KEY is not set in environment variables');
}

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
      // Get the text generation model (Use a specific model version)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      // Generate content based on the prompt - tailored for note-taking
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: `You're helping a user create a well-structured note for ThinkBoard, a note-taking application.
          
Topic: ${prompt}

Please generate a comprehensive, well-structured note about this topic with:
- A clear introduction that defines the key concepts
- 2-3 main sections with relevant information
- Bullet points for important details where appropriate
- A brief conclusion or summary

Make the content informative yet concise, formatted in a way that's easy to scan and reference later.`
        }]
      }]
    });
    
    const generatedText = result.response.text();
    
    res.json({ generatedText });  } catch (error) {
    console.error('AI generation error:', error);
    
    // Handle specific error cases
    if (error.status === 404) {
      // Try an alternative model if the specified model isn't found
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const fallbackResult = await fallbackModel.generateContent(
          `Write a detailed paragraph about: ${prompt}`
        );
        const generatedText = fallbackResult.response.text();
        return res.json({ generatedText });
      } catch (fallbackError) {
        console.error('Fallback model error:', fallbackError);
        return res.status(500).json({ 
          message: 'Error generating content with fallback model',
          error: fallbackError.message 
        });
      }
    }
    
    res.status(500).json({ 
      message: 'Error generating content', 
      error: error.message 
    });
  }
};
