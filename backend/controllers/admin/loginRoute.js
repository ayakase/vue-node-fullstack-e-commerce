const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../../redisClient');

require('dotenv').config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/info', (req, res) => {
    if (!req.body.username || !req.body.password) {
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
                        client.hset('whitelist', token, 'valid', (err, reply) => {
                            if (err) {
                                console.error(err)
                            } else {
                                console.log(reply, 'done')
                            }

                        })
                        res.cookie('token', token, {
                            maxAge: 1728000000,
                            secure: true,
                            sameSite: 'None',
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
router.post('/state', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.send({ state: false });
    }
    client.hexists('whitelist', token, (err, exists) => {
        if (err || !exists) {
            return res.send({ state: false });
        }
        jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
                console.log(error);
                return res.send({ state: false });
            }
            User.findOne({ where: { id: decoded.id }, attributes: { exclude: ['password'] } })
                .then((user) => {
                    if (!user) {
                        return res.send({ state: false });
                    }
                    res.json({ state: true, userInfo: user });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({ state: false });
                });
        });
    });
});

router.get('/logout', function (req, res) {
    // res.clearCookie('token')
    const token = req.cookies.token
    client.hdel('whitelist', token, (err, response) => {
        if (err) {
            console.error(err)
        }
        console.log(response)
    })
    console.log('token', token)
    res.send({ state: false, message: 'Đã đăng xuất' })
    res.end()
})
module.exports = router;
