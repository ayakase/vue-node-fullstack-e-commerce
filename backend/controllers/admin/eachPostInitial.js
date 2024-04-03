const express = require('express');
const router = express.Router();
const Post = require('../../models/PostModel');
router.get('/:slug', (req, res) => {
    Post.findOne({
        where: {
            slug: req.params.slug,
        },
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.error(err);
    });
})
module.exports = router;
