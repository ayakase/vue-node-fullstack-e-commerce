const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('/request-change', (req, res) => {
    const token = req.cookies.token
    console.log(req.body)
    console.log(req.cookies.token)
    if (!token) {
        res.send({ allow: false, message: "Thiếu thông tin" })
    } else {
        if (!req.body.password) {
            res.send({ allow: false, message: "Hãy nhập mật khẩu xác nhận" })
        } else {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.send({ allow: false, message: "Thiếu thông tin" });
                } else {
                    User.findOne({ where: { id: decoded.id }, }).then(async (user) => {
                        if (user) {
                            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                            console.log(passwordMatch)
                            if (passwordMatch) {
                                res.send({ allow: true, message: "Xác nhận mật khẩu thành công" });
                            } else {
                                res.send({ allow: false, message: "Sai mật khẩu" });
                            }
                        }
                    }).catch((err) => {
                        console.log(err);
                        res.send({
                            allow: false, message: "Hãy điền thông tin"
                        });

                    });
                }
            });
        }
    }
});
router.post('/save-change', async (req, res) => {
    let newUserInfo = {
        username: req.body.username,
        email: req.body.email
    }
    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        newUserInfo.password = hashedPassword
    }
    const token = req.cookies.token
    if (!token) {
        res.send(false)
    } else {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                console.log(err)
                res.send({ state: false });
            } else {
                User.findOne({ where: { id: decoded.id } }).then((user) => {
                    if (user) {
                        User.update(newUserInfo, {
                            where: { id: decoded.id },
                        })
                    }
                    res.sendStatus(200)
                }).catch((err) => {
                    console.log(err);
                    
                });
            }
        });
    }
})


module.exports = router;
