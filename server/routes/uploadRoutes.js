const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Utility function to delete an uploaded file from disk
 */
const deleteFileFromUploads = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== 'string') return false;
  
  let relativePath = fileUrl;
  if (relativePath.includes('/uploads/')) {
    relativePath = '/uploads/' + relativePath.split('/uploads/')[1];
  } else {
    return false;
  }

  const fileName = path.basename(relativePath);
  const filePath = path.join(uploadsDir, fileName);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Successfully deleted unused upload file from disk: ${fileName}`);
      return true;
    } catch (err) {
      console.error(`Error deleting file ${fileName}:`, err.message);
    }
  }
  return false;
};

/**
 * @route   POST /api/v1/upload
 * @desc    Upload base64 or file binary images from system
 * @access  Private / Admin
 */
router.post('/', (req, res) => {
  try {
    const { image, name } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // Handle Data URL (base64)
    if (image.startsWith('data:image/')) {
      const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ success: false, message: 'Invalid image format' });
      }

      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const safeName = (name || 'project-photo').replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${safeName}-${uniqueSuffix}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/uploads/${fileName}`;
      return res.status(200).json({
        success: true,
        message: 'Photo uploaded successfully from system',
        url: fileUrl,
      });
    }

    // If already a valid URL, return it directly
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/uploads/')) {
      return res.status(200).json({
        success: true,
        url: image,
      });
    }

    return res.status(400).json({ success: false, message: 'Unsupported image format' });
  } catch (error) {
    console.error('Error in upload route:', error);
    return res.status(500).json({ success: false, message: 'File upload failed on server' });
  }
});

/**
 * @route   DELETE /api/v1/upload
 * @desc    Delete single or multiple uploaded photo files from disk
 * @access  Private / Admin
 */
router.delete('/', (req, res) => {
  try {
    const { url, urls } = req.body;
    let targetUrls = [];

    if (Array.isArray(urls)) {
      targetUrls = urls;
    } else if (url) {
      targetUrls = [url];
    }

    if (targetUrls.length === 0) {
      return res.status(400).json({ success: false, message: 'No file URL provided for deletion' });
    }

    let deletedCount = 0;
    targetUrls.forEach((fileUrl) => {
      if (deleteFileFromUploads(fileUrl)) {
        deletedCount++;
      }
    });

    return res.status(200).json({
      success: true,
      message: `Deleted ${deletedCount} file(s) from server storage`,
      deletedCount,
    });
  } catch (error) {
    console.error('Error in file delete route:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete file on server' });
  }
});

module.exports = router;
module.exports.deleteFileFromUploads = deleteFileFromUploads;
