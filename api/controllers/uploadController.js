import multer from "multer";

// Configuration for image upload
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// Multer instance with file size limit
const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
}).single("file");

export const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File size should be less than 3MB" });
    }
    if (err) {
      return res.status(500).json({ message: "File upload error" });
    }
    if (!req.file) {
      return res.status(404).json({ error: "No files uploaded" });
    }

    // Return the filename in the response
    res.status(200).json({ filename: req.file.filename });
  });
};
