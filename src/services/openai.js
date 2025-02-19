import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Simple rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // 3 seconds between requests

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const rickifyCharacter = async (character) => {
    try {
        // Check if we need to wait due to rate limiting
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
        }

        // Log the API key (first few characters only for security)
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        console.log('API Key prefix:', apiKey?.substring(0, 10) + '...');
        
        if (!apiKey) {
            throw new Error('OpenAI API key is missing. Please check your .env file.');
        }

        const prompt = `Transform this character into a Rick and Morty style character. Keep the same basic structure but make it more fitting for the Rick and Morty universe. Be creative but maintain similar fields:
        
        Original character:
        ${JSON.stringify(character, null, 2)}
        
        Return ONLY a JSON object with the same structure but with modified values.`;

        lastRequestTime = Date.now();
        
        console.log('Making request to OpenAI...');
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a creative assistant that transforms characters into Rick and Morty style characters. Always respond with valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Received response from OpenAI');
        // Log the full response for debugging
        console.log('Full OpenAI response:', response.data);
        
        // The response comes in this structure:
        // response.data.choices[0].message.content contains the actual response text
        console.log('AI response content:', response.data.choices[0].message.content);
        
        // Extract the JSON response from the message content
        const rickifiedCharacter = JSON.parse(response.data.choices[0].message.content);
        console.log('Parsed rickified character:', rickifiedCharacter);
        return rickifiedCharacter;
    } catch (error) {
        console.log('Detailed error information:', {
            error: error,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.data?.error?.code === 'insufficient_quota') {
                throw new Error('OpenAI API quota exceeded. Please check your billing details at platform.openai.com/account/billing');
            }
            
            switch (error.response.status) {
                case 429:
                    throw new Error('Too many requests. Please wait a moment before trying again.');
                case 401:
                    throw new Error('Invalid API key. Please check your OpenAI API key configuration.');
                case 500:
                    throw new Error('OpenAI service error. Please try again later.');
                default:
                    throw new Error(`OpenAI API error: ${error.response.data.error?.message || 'Unknown error'}`);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.log('Request made but no response received:', error.request);
            throw new Error('No response from OpenAI. Please check your internet connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error setting up request:', error.message);
            throw new Error(`Error setting up the request: ${error.message}`);
        }
    }
}; 