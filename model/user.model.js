const mongoose = require("mongoose")
const user = mongoose.Schema(
    {
        username: String,
        password: String
    })

const UserModel = mongoose.model("users", user)
module.exports = { UserModel }