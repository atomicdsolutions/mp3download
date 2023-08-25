const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const fileUploadMiddleware = require('../middleware/fileUpload.middleware');

router.post('/download/:times', downloadController.downloadMP3);
router.post('/metadata', downloadController.getMetadata);

// New route for file upload
router.post('/upload', fileUploadMiddleware, downloadController.uploadMP3);

router.get('/', (req, res) => {
    res.send('Download API is working!');
});

module.exports = router;
