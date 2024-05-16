import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de Multer para almacenar imágenes con su extensión original
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, and .xlsx format allowed!'));
  },
}).single('imageUploaded');

const addimageUploadedUrl = (req: any, _res: any, next: any) => {
  if (req.file) {
    req.body.imageUploaded = `/public/images/${req.file.filename}`;
    req.body.fileSend = true;
  }
  next();
};

const removeimageUploadedOnError = (err: any, req: any, _res: any, next: any) => {
  if (req.file && err) {
    const filePath = path.join(process.cwd(), 'public/images/', req.file.filename);
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Failed to delete file: ${filePath}`, unlinkErr);
      }
      next(err);
    });
  } else {
    next(err);
  }
};

export { upload, addimageUploadedUrl, removeimageUploadedOnError };