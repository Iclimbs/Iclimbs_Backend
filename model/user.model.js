const mongoose = require("mongoose")
const user = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        CreatedAt: { type: Date, default: Date.now }
    })

const UserModel = mongoose.model("users", user)
module.exports = { UserModel }