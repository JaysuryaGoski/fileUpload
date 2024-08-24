const path = require('path');

// Upload Handler
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No file uploaded. Please select a file and try again.'
    });
  }

  // If the file is uploaded successfully, send a response with the download link
  const downloadLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({
    status: 'success',
    message: 'File uploaded successfully!',
    link: downloadLink
  });
};

module.exports = { uploadFile };
