const express = require("express")
const multer = require("multer");
const { CareerModel } = require("../model/career.model")
const CareerRouter = express.Router()
const path = require("path");
const { transporter } = require("../service/transporter");
const uploadPath = path.join(__dirname, '../resumes')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        let uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

CareerRouter.post("/new", upload.single("resume"), async (req, res) => {
    const { firstname, lastname, email, mobile } = req.body
    const emailExists = await CareerModel.findOne({ email: email })
    const fileName = req.file.filename;
    if (emailExists === null) {
        try {
            const career = new CareerModel({ firstname, lastname, email, mobile, resume: fileName })
            const data = await career.save()
            const mailOptions = {
                from: `${process.env.senderemail}`,
                to: `${data.email}`,
                subject: 'New User Has Applied For The Post.',
                text: 'This is a test email with attachment.',
                attachments: [
                    {
                        filename: `${data.resume}`,
                        path: `${uploadPath}/${fileName}`
                    }
                ]
            };
            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error occurred:', error);
                    // Send error response to frontend
                    return res.json({ success: false, error: 'Failed to send email' });
                } else {
                    console.log('Email sent:', info.response);
                    // Send success response to frontend
                    return res.json({ success: true, message: 'Email sent successfully' });
                }
            });
            // res.json({ status: true })
        } catch (error) {
            res.json({ status: "error", message: "You Request Has Been Rejected !" })
        }
    } else {
        res.json({ status: "error", message: "You Have Already Applied For This Job !" })

    }
})

module.exports = { CareerRouter }