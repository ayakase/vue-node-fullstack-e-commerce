const express = require('express');
const router = express.Router();
const Post = require('../../models/PostModel')
router.get('/:slug', (req, res) => {
    Post.findAll({
        where: { slug: req.params.slug },
    }).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.error(error);
    })
})

module.exports = router;
