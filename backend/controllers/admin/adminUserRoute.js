const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/change-password', (req, res) => {
    if (!req.body.password) {
        res.send({
            state: false, message: "Hãy điền thông tin"
        })
    } else {
        try {
            User.findOne({ where: { username: req.body.username, } }).then(async (result) => {
                if (!result) {
                    res.send({ state: false, message: "Username không tồn tại" })
                } else {
                    const passwordMatch = await bcrypt.compare(req.body.password, result.password);
                    if (passwordMatch) {
                        const token = jwt.sign({ id: result.id }, 'secret', { expiresIn: '20d' })
                        res.cookie('token', token, {
                            // httpOnly: true,
                            maxAge: 1728000000,
                            secure: true,
                            sameSite: 'None',
                            // domain: process.env.FE_URL
                        });
                        res.json({ state: true, message: "Login thành công" })

                    } else {
                        res.send({ state: false, message: "Sai mật khẩu" })
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        catch (e) {
            console.log("Error")
        }
    }
});


module.exports = router;
