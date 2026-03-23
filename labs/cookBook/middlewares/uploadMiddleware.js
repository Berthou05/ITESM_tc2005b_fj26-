const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

// Accept both names to avoid "Unexpected field"
const uploadRecipeImage = (req, res, next) => {
  upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'image_file', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) return next(err);
    req.file = req.files?.imagen?.[0] || req.files?.image_file?.[0] || null;
    next();
  });
};

module.exports = { uploadRecipeImage };
