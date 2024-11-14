const express = require('express');
const marked = require('marked');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Markdown to HTML conversion endpoint
app.post('/convert', (req, res) => {
    const { markdownText } = req.body;
    const htmlContent = marked(markdownText || '');
    res.json({ html: htmlContent });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
