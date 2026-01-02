const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/ai/generate-questions", async (req, res) => {
    const { skills } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a professional HR manager. Generate 5 technical interview questions based on: ${skills}. Give short and clear questions.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ questions: response.text() });
    } catch (error) {
        res.status(500).json({ error: "AI link failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
