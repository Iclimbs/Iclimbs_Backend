require('dotenv').config()
const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const userRouter = express.Router()

userRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const userExists = await UserModel.find()
        if (userExists.length == 0) {
            bcrypt.hash("admin@123", process.env.hash, async (err, hash) => {
                const user = new UserModel({ username: "admin", password: hash })
                await user.save()
            });
            return res.json({ status: "success", message: "New Admin Account Created Pls Login With Default Admin Credentiaks." })
        } else {
            bcrypt.compare(req.body.password, userExists[0].password).then((result) => {
                if (result) {
                    res.json({

                        "msg": "Login Successful!",
                        "token": jwt.sign(
                            {
                                foo: 'Auth'
                            },
                            'password'
                        ),
                        "user": userExists[0].username
                    })
                }
            });
        }
    } catch (error) {
        res.json({ status: "error", message: "Your Enquiry Registration is Unsuccessful." })
    }
})

module.exports = { userRouter }