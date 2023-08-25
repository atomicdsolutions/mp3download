const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');


router.post('/download/:times', downloadController.downloadMP3);
router.post('/metadata', downloadController.getMetadata);

router.get('/', (req, res) => {
    res.send('Download API is working!');
});

// Add more routes as needed

module.exports = router;
