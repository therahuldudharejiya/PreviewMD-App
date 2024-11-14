const marked = require('marked');

exports.convertMarkdown = (req, res) => {
    const { markdownText } = req.body;
    const htmlContent = marked(markdownText || '');
    res.json({ html: htmlContent });
};
