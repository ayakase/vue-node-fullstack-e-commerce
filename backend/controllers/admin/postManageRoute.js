const express = require("express");
const router = express.Router();
const cloudinary = require("../../cloudiraryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: async (req, file) => "thumbnails_folder",
    allowed_formats: async (req, file) => ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 800 }],
  },
});
const upload = multer({ storage: storage });
const Post = require("../../models/PostModel");
const Category = require("../../models/CategoryModel");
router.get("/", (req, res) => {
  res.send('in')
})
router.post("/", upload.single("postThumbnail"), (req, res) => {
  console.log(req.body.postContent);
  if (!req.file) {
    res.sendStatus(404)
  } else {
    Post.create({
      title: req.body.postTitle,
      thumbnail: req.file.path,
      content: req.body.postContent,
      publish: req.body.publishState,
      slug: req.body.postSlug,
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err)
        if (err.original && err.original.errno === 1062) {
          res.status(400).send("SlugConflict");
        } else {
          res.status(500).send("Server error");
        }
      });
  }

});
router.put("/edit/:id", upload.single("postThumbnail"), (req, res) => {
  const updateData = {
    title: req.body.postTitle,
    content: req.body.postContent,
    publish: req.body.publishState,
    slug: req.body.postSlug,
  }
  if (req.file) {
    updateData.thumbnail = req.file.path
  }
  Post.update(updateData, {
    where: {
      id: req.params.id,
    }
  }
  )
    .then(() => {
      res.json("done");
    })
    .catch((err) => {
      console.error(err);
    });

});

router.get("/:publish/:order/:page", (req, res) => {
  Post.findAndCountAll({
    where: {
      publish: req.params.publish,
    },
    order: [["createdAt", req.params.order]],
    limit: 10,
    offset: (req.params.page - 1) * 10,
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
  Post
    .destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.send("done");
    })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = router;
