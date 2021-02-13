const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
    //con path.extname() extraemos la extension del nombre original del archivo
  },
});

module.exports = multer({
  storage,
}).single("image-file");
