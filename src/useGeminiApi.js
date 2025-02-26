// currently in use

import { GoogleGenerativeAI } from '@google/generative-ai';
async function fetchGeminiData(prompt) {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
         // Your API key
        const generativeAI = new GoogleGenerativeAI(apiKey);
        const model =  generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text();
     
        return text;
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred while generating message");
    }
}

export { fetchGeminiData };
