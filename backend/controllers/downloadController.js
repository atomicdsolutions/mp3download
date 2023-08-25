const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Download = require('../models/download.model');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');

// Dynamic import for music-metadata
let musicMetadata;
import('music-metadata').then(module => {
    musicMetadata = module;
});

exports.uploadMP3 = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = req.file.path;
        const metadata = await extractMetadata(filePath);

        let commentString = '';
        if (metadata.comment && Array.isArray(metadata.comment)) {
            commentString = metadata.comment.join(', ');
        }

        const newDownload = new Download({
            metadata: {
                ...metadata.common,
                comment: commentString
            },
            path: filePath
        });

        await newDownload.save();
        res.json({ message: 'MP3 uploaded and metadata extracted successfully.', download: newDownload });

    } catch (error) {
        console.error('Error uploading the MP3:', error);
        res.status(500).send('Error uploading the MP3');
    }
};

exports.downloadMP3 = async (req, res) => {
    try {
        const url = req.body.url;
        const times = parseInt(req.params.times);  // Get the number of times from the route parameter

        let downloads = [];

        for (let i = 0; i < times; i++) {
            const userAgent = getRandomUserAgent();

            const response = await axios.get(url, {
                responseType: 'stream',
                headers: { 'User-Agent': userAgent }
            });

            const filePath = path.join(__dirname, '../downloads', `download_${uuidv4()}.mp3`);
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            writer.on('finish', async () => {
                const metadata = await extractMetadata(filePath);

                let commentString = '';
                if (metadata.comment && Array.isArray(metadata.comment)) {
                    commentString = metadata.comment.join(', ');
                }

                const newDownload = new Download({
                    userAgent: userAgent,
                    metadata: {
                        ...metadata.common,
                        comment: commentString
                    },
                    url: url,
                    path: filePath
                });

                await newDownload.save();
                downloads.push(newDownload);
            });

            writer.on('error', (error) => {
                console.error('Error writing the MP3 file:', error);
            });
        }

        // Send response after all downloads are completed
        res.json({ message: 'MP3 downloaded successfully.', downloads: downloads });

    } catch (error) {
        console.error('Error downloading the MP3:', error);
        res.status(500).send('Error downloading the MP3');
    }
};

exports.getMetadata = async (req, res) => {
    try {
        const url = req.body.url;
        const metadata = await fetchMetadataFromURL(url);
        res.json({ metadata: metadata });
    } catch (error) {
        console.error('Error fetching metadata:', error);
        res.status(500).send('Error fetching metadata');
    }
};

function getRandomUserAgent() {
    const userAgents = `UserAgent-${uuidv4()}`;
    return userAgents;
}

async function extractMetadata(filePath) {
    try {
        const metadata = await musicMetadata.parseFile(filePath);
        return metadata;
    } catch (error) {
        console.error('Error extracting metadata:', error);
        throw error;
    }
}

async function fetchMetadataFromURL(url) {
    try {
        const response = await axios.get(url, { responseType: 'stream', headers: { 'User-Agent': getRandomUserAgent() } });
        const metadata = await musicMetadata.parseStream(response.data);
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata from URL:', error);
        throw error;
    }
}
