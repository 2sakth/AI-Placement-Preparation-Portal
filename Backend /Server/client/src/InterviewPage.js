import React, { useState } from 'react';
import axios from 'axios';

const InterviewPage = () => {
    const [skills, setSkills] = useState('');
    const [questions, setQuestions] = useState('');
    const [loading, setLoading] = useState(false);

    const getAIQuestions = async () => {
        setLoading(true);
        try {
            // Backend URL-ai inge podavum
            const res = await axios.post('http://localhost:5000/api/ai/generate-questions', { skills });
            setQuestions(res.data.questions);
        } catch (err) {
            console.error("AI Error:", err);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial' }}>
            <h1>🚀 AI Interview Prep</h1>
            <input 
                type="text" 
                placeholder="Enter Skills (e.g. React, Java, Python)" 
                onChange={(e) => setSkills(e.target.value)}
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button onClick={getAIQuestions} disabled={loading} style={{ padding: '10px 20px' }}>
                {loading ? 'Generating...' : 'Get Questions'}
            </button>

            {questions && (
                <div style={{ marginTop: '20px', background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
                    <h3>Practice Questions:</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{questions}</pre>
                </div>
            )}
        </div>
    );
};

export default InterviewPage;
