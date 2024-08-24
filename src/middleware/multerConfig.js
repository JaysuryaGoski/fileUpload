const multer = require('multer');
const path = require('path');
const sharp = require('sharp'); // For resizing images

const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.png', '.docx', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
        return cb(new Error('Only .png, .docx, and .pdf files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  }).single('file');

const validateImageDimensions = async (req, res, next) => {
    if (req.file && req.file.mimetype === 'image/png') {
      try {
        const image = await sharp(req.file.path);
        const metadata = await image.metadata();
  
        if (metadata.width > 400 || metadata.height > 300) {
          return res.status(400).json({
            status: 'error',
            message: 'Image dimensions should be less than 400x300 pixels.'
          });
        }
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  };

module.exports = { upload, validateImageDimensions };
