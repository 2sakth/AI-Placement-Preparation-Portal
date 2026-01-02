const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

router.post("/generate-questions", async (req, res) => {
    try {
        const { skills } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Act as a technical interviewer. Generate 5 interview questions based on these skills: ${skills}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ questions: text });
    } catch (error) {
        res.status(500).json({ error: "AI Processing Failed" });
    }
});

module.exports = router;
