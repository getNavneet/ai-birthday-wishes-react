// currently in use

import { GoogleGenerativeAI } from '@google/generative-ai';
import { API } from './apiKey';
async function fetchGeminiData(prompt) {
    try {
        const apiKey = API; // Your API key
        const generativeAI = new GoogleGenerativeAI(apiKey);
        // const prompt = `Generate a unique and engaging birthday greeting message in ${language} for someone named ${name} who is ${age} years old and enjoys ${hobbies}.`;
        const model =  generativeAI.getGenerativeModel({ model: 'gemini-pro' });
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
