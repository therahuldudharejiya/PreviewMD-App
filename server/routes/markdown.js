const express = require('express');
const { convertMarkdown } = require('../controllers/markdownController');
const router = express.Router();

router.post('/convert', convertMarkdown);

module.exports = router;
