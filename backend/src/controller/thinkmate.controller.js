import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('Warning: GEMINI_API_KEY is not set in environment variables');
}

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithThinkMate = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Get the chat model with more reliable fallback options
    let model;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (modelError) {
      console.log("Failed to load gemini-1.5-flash, falling back to gemini-1.0-pro");
      model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    }
    
  // Starting fresh chat without history (addressing the role order issue)
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
    
    // If we have history, let's handle past messages manually
    // Skip the very first assistant message when sending history
    if (history && history.length > 1) {
      for (let i = 1; i < history.length - 1; i += 2) {
        const userMsg = history[i];
        const assistantMsg = history[i + 1];
        
        if (userMsg && userMsg.role === 'user' && assistantMsg && assistantMsg.role === 'assistant') {
          try {
            await chat.sendMessage(userMsg.content);
          } catch (error) {
            console.log(`Error adding history message ${i}:`, error);
            // Continue with the chat even if some history messages fail
          }
        }
      }
    }    // Send the user's message to the model
    const promptText = `${message}

Remember you are ThinkMate, the helpful assistant for the ThinkBoard note-taking application. 
You help users with note organization, provide writing tips, suggest productivity strategies, 
or answer questions about how to use ThinkBoard effectively. Be friendly, helpful, and concise.also dont format the text using *** and other things you can still provide formated text but without using any symbols`;

    const result = await chat.sendMessage(promptText);
    
    // Get the response
    const response = result.response.text();
    
    // Send the response to the client
    res.json({ response });
      } catch (error) {
    console.error('ThinkMate chat error:', error);
    
    // Try a completely different approach if chat fails
    try {
      console.log("Chat approach failed, trying direct content generation approach");
      
      // Get recent chat for context (up to 3 messages)
      const recentMessages = history && history.length > 0 
        ? history.slice(-3).map(m => `${m.role === 'user' ? 'User' : 'ThinkMate'}: ${m.content}`).join('\n\n')
        : '';
      
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const fallbackPrompt = `
${recentMessages ? `Recent conversation:\n${recentMessages}\n\n` : ''}
User: ${req.body.message}

You are ThinkMate, the helpful assistant for the ThinkBoard note-taking application.
You help users with note organization, provide writing tips, suggest productivity strategies,
or answer questions about how to use ThinkBoard effectively.
Respond to the user's message above. Be friendly, helpful, and concise.
also dont format the text using *** and other things you can still provide formated text but without using any symbols`;

      const fallbackResult = await fallbackModel.generateContent(fallbackPrompt);
      const response = fallbackResult.response.text();
      return res.json({ response });
    } catch (fallbackError) {
      console.error('Complete fallback error:', fallbackError);
      return res.status(500).json({ 
        message: 'Error communicating with ThinkMate',
        error: fallbackError.message 
      });
    }
  }
};
