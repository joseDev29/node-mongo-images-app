const { Router } = require("express");
const { unlink } = require("fs-extra");
const path = require("path");

const Image = require("../models/Image");

const router = Router();

router.get("/", async (req, res, next) => {
  const images = await Image.find();

  res.render("index", { images });
});

router.get("/upload", async (req, res, next) => {
  res.render("upload");
});

router.post("/upload", async (req, res, next) => {
  const image = new Image();
  image.title = req.body["img-title"];
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  await image.save();

  res.redirect("/");
});

router.get("/image/:id", async (req, res, next) => {
  const image = await Image.findById(req.params["id"]);

  res.render("profile", { image });
});

router.delete("/image/:id/delete", async (req, res, next) => {
  const imageId = req.params["id"];
  const deleteImage = await Image.findByIdAndDelete(imageId);

  if (deleteImage) {
    await unlink(path.resolve("./src/public" + deleteImage.path));
    res.status(200).json({
      message: "Image deleted",
    });
  } else {
    res.status(400).json({
      error: "Image not found",
    });
  }
});

module.exports = router;
