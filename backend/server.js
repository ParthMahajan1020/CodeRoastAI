const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CodeRoast AI backend is working"
    });
});

app.post("/api/roast", async (req, res) => {
    try {
        const { language, code } = req.body;

        if (!language || !code?.trim()) {
            return res.status(400).json({
                error: "Language and code are required."
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: "Groq API key is missing."
            });
        }

        const prompt = `
You are CodeRoast AI, a funny but useful senior software engineer.

Analyze the following ${language} code.

Return ONLY valid JSON.
Do NOT use markdown code fences.
Do NOT add any text before or after the JSON.

Required JSON format:

{
  "roast": "A funny but useful roast of the code.",
  "score": 7,
  "issues": [
    "First issue",
    "Second issue",
    "Third issue"
  ],
  "suggestions": [
    "First suggestion",
    "Second suggestion",
    "Third suggestion"
  ]
}

Rules:
- score must be a number from 1 to 10.
- issues must be an array of strings.
- suggestions must be an array of strings.
- roast must be a string.
- Be sarcastic but constructive.
- Do not invent problems that do not exist.
- Keep the analysis understandable for a student developer.

Code:

${code}
`;

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.8
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Groq error:", data);

            return res.status(500).json({
                error:
                    data?.error?.message ||
                    "Groq API request failed."
            });
        }

        const result = data?.choices?.[0]?.message?.content;

        if (!result) {
            return res.status(500).json({
                error: "AI returned an empty response."
            });
        }

        let parsedResult;

        try {
            const cleanedResult = result
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/\s*```$/i, "")
                .trim();

            parsedResult = JSON.parse(cleanedResult);
        } catch (parseError) {
            console.error("AI JSON parsing error:", parseError);
            console.error("Raw AI response:", result);

            return res.status(500).json({
                error: "AI returned an invalid response format."
            });
        }

        return res.json({
            result: {
                roast: parsedResult.roast || "",
                score: Number(parsedResult.score) || 0,
                issues: Array.isArray(parsedResult.issues)
                    ? parsedResult.issues
                    : [],
                suggestions: Array.isArray(parsedResult.suggestions)
                    ? parsedResult.suggestions
                    : []
            }
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: error.message || "Something went wrong."
        });
    }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("======================================");
    console.log("   CodeRoast AI Backend");
    console.log("======================================");
    console.log(`Server: http://127.0.0.1:${PORT}`);
    console.log("Status: RUNNING");
    console.log("======================================");
    console.log("");
});

server.on("error", (error) => {
    console.error("SERVER ERROR:");
    console.error(error);
});

process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION:");
    console.error(error);
});

process.on("unhandledRejection", (error) => {
    console.error("UNHANDLED REJECTION:");
    console.error(error);
});