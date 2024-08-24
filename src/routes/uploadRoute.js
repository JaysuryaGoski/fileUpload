const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controller/uploadController');
const { upload, validateImageDimensions } = require('../middleware/multerConfig');

router.post('/upload', upload, validateImageDimensions, (req, res) => {
  // Directly call the uploadFile controller here
  uploadFile(req, res);
});

module.exports = router;
