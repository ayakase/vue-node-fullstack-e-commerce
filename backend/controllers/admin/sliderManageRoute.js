const express = require("express");
const router = express.Router();
const cloudinary = require("../../cloudiraryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: async (req, file) => "slider-images",
        allowed_formats: async (req, file) => ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 800 }],
    },
});
const upload = multer({ storage: storage });
const Slider = require("../../models/SliderModel");
router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.sendStatus(404)
    } else {
        Slider.create({
            title: req.body.title,
            image_src: req.file.path,
            tour_url: req.body.url,
        })
            .then(() => {
                res.json("done");
            })
            .catch((err) => {
                console.error(err);
            });
    }
});

router.get("/", (req, res) => {
    Slider.findAndCountAll({
        order: [["createdAt", "DESC"]],
    })
        .then((result) => {
            const { count, rows } = result;
            res.send(result);
        })
        .catch((error) => {
            console.error(error);
        });
});
router.delete("/:id", (req, res) => {
    Slider.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.send("done");
        })
        .catch((error) => {
            console.error(error);
        });
});
module.exports = router;
