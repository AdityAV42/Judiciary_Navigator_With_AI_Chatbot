import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 7000;

app.use(express.json());

const API_KEY = 'AIzaSyA5uDHRbewzZIlDvfiz34-9CLcH67u6uM4'; // Gemini API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Endpoint to handle chatbot requests
app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from API');
        }

        const data = await response.json();
        const botMessage = data.candidates[0].content.parts[0].text;

        res.json({ response: botMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Serve static files (your HTML, CSS, etc.)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
