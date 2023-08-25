const multer = require('multer');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

// Filter for file types
const fileFilter = (req, file, cb) => {
  // Accept only .jpg, .jpeg, .png, and .mp3 files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, and MP3 are allowed!'), false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  },
  fileFilter: fileFilter
}).single('file'); // This should match the name attribute in your frontend


module.exports = upload;
