const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let uploadPath = './uploads';
        
        if (file.fieldname === 'thumbImage') {
            uploadPath = './uploads/thumbnails';
        } else if (file.fieldname === 'video') {
            uploadPath = './uploads/videos';
        } else if (file.fieldname === 'previewVideo') {
            uploadPath = './uploads/previewVideos';
        }
        
        ensureDirectoryExists(uploadPath);
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        // const ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
    }
});

const multerMiddleware = multer({storage});

module.exports = multerMiddleware;
