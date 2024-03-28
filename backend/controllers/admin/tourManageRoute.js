const express = require('express');
const router = express.Router();
const cloudinary = require('../../cloudiraryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const slugify = require('slugify')
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: async (req, file) => 'thumbnails_folder',
        allowed_formats: async (req, file) => ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{ width: 500 }],
    },
});
const upload = multer({ storage: storage });
const Tour = require('../../models/TourModel')
const Category = require('../../models/CategoryModel');
const Region = require('../../models/RegionModel');
const Location = require('../../models/LocationModel');
const { Op } = require('sequelize');


router.post('/', upload.single('tourThumbnail'), (req, res) => {

    let slug = slugify(req.body.slug, {
        locale: 'vi',
        lower: true,
    })

    Tour.create({
        title: req.body.tourTitle,
        thumbnail: req.file.path,
        images: req.body.images,
        slug: slug,
        tik_tok_id: req.body.tiktokId,
        schedule: req.body.tourSchedule,
        location_id: req.body.tourLocation,
        tourtype: req.body.tourType,
        departure: req.body.tourFrom,
        days: req.body.tourLength,
        ishottour: req.body.isHot,
        isdiscount: req.body.tourDiscount,
        recommend: req.body.recommend,
        transportation: req.body.tourTransport,
        original_price: req.body.originalPrice,
        adult_price: req.body.adultPrice,
        teenager_price: req.body.teenagerPrice,
        child_price: req.body.childPrice,
        infant_price: req.body.infantPrice,
        special: req.body.tourSpecial,
        bonus: req.body.tourBonus,
        visa: req.body.tourVisa,
        detail: req.body.tourDetail,
        priceservice: req.body.tourPriceService,
        guide: req.body.tourGuide,
    })
        .then(() => {
            res.send("1");
        })
        .catch((err) => {
            if (err.original && err.original.errno === 1062) {
                res.send("2")
            }
        })

});
// const storage1 = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'thumbnails/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

router.get('/choose-category', (req, res) => {
    Category.findAll({
        include: {
            model: Region,
            include: {
                model: Location
            }
        }
    }).then((result) => {
        res.send(result)
    })
})
router.get('/fetch/:order/:page/', (req, res) => {

    Tour.findAndCountAll({
        where: {
            title: {
                [Op.like]: `%${req.query.keyword}%`,
            },
        },
        include: {
            model: Location,
        },
        order: [["createdAt", req.params.order]],
        limit: 10,
        offset: (req.params.page - 1) * 10
    }).then((result) => {
        const { count, rows } = result;
        res.send(result)
    }).catch((error) => {
        console.error(error);
    })
})
router.get('/load/:id', (req, res) => {
    // console.log(req.params.id)
    console.log("requested")
    Tour.findOne({
        where: { id: req.params.id }
    }).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
    })
})
router.get('/locations', (req, res) => {
    console.log("hehe")
    Location.findAll().then((locations) => {
        res.send(locations)
    }).catch((error) => {
        console.log(error);
    })
})
router.put('/edit/:id', upload.none(), (req, res) => {
    let slug = slugify(req.body.slug, {
        locale: 'vi',
        lower: true,
    })
    Tour.update({
        title: req.body.tourTitle,
        images: req.body.images,
        slug: slug,
        tik_tok_id: req.body.tiktokId,
        schedule: req.body.tourSchedule,
        location_id: req.body.tourLocation,
        tourtype: req.body.tourType,
        departure: req.body.tourFrom,
        days: req.body.tourLength,
        ishottour: req.body.isHot,
        isdiscount: req.body.tourDiscount,
        recommend: req.body.recommend,
        transportation: req.body.tourTransport,
        original_price: req.body.originalPrice,
        adult_price: req.body.adultPrice,
        teenager_price: req.body.teenagerPrice,
        child_price: req.body.childPrice,
        infant_price: req.body.infantPrice,
        special: req.body.tourSpecial,
        bonus: req.body.tourBonus,
        visa: req.body.tourVisa,
        detail: req.body.tourDetail,
        priceservice: req.body.tourPriceService,
        guide: req.body.tourGuide,
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send("1");
    })
})
router.delete('/delete/:id', (req, res) => {
    Tour.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.send("done")
        }).catch((error) => {
            console.error(error);
        })
})
module.exports = router;
