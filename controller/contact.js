const express = require("express");
const { ContactModel } = require("../model/contact.model");
const { admin } = require("../middleware/admin.middleware");
const contactRouter = express.Router();
const { transporter } = require("../service/transporter");
const { PurposeModel } = require("../model/contact.pupose.model");
contactRouter.post("/new", async (req, res) => {
  try {
    const { name, email, phone, message,company, service, country, state, city } = req.body;
    const servicename = await PurposeModel.find({ _id: service });
    const contact = new ContactModel({
      name,
      email,
      phone,
      message: message || null,
      service: servicename[0].name,
      company:company || null,
      country: country,
      state: state,
      city: city
    });
    await contact.save();
    const mailOptions = {
      from: `${process.env.senderemail}`,
      to: "leads@iclimbs.com",
      subject: "New Registration in Leads Page",
      html: `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>IClimbs Registration Page Leads</title>
    <meta name="description" content="Appointment Reminder Email Template" />
  </head>
  <style>
    a:hover {
      text-decoration: underline !important;
    }
  </style>

  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="
        @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
        font-family: 'Open Sans', sans-serif;
      "
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <!-- Logo -->
            <tr>
              <td style="text-align: center">
                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                  <img
                    width="60"
                    src="https://registration.iclimbs.com/assets/images/logo/logoDark.png"
                    title="logo"
                    alt="logo"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <!-- Email Content -->
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                    background: #fff;
                    border-radius: 3px;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    padding: 0 40px;
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <!-- Title -->
                  <tr>
                    <td style="padding: 0 15px; text-align: center">
                      <h1
                        style="
                          color: #1e1e2d;
                          font-weight: 400;
                          margin: 0;
                          font-size: 32px;
                          font-family: 'Rubik', sans-serif;
                        "
                      >
                        New Registration Details
                      </h1>
                      <span
                        style="
                          display: inline-block;
                          vertical-align: middle;
                          margin: 29px 0 26px;
                          border-bottom: 1px solid #cecece;
                          width: 100px;
                        "
                      ></span>
                    </td>
                  </tr>
                  <!-- Details Table -->
                  <tr>
                    <td>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        style="width: 100%; border: 1px solid #ededed"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Name :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.name}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Email :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.email}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Phone:
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.phone}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Service :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${servicename[0].name}
                            </td>
                          </tr>
                           <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Company :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.company}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Country :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.country}
                            </td>
                          </tr>
                           <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              State :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.state}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              City :
                            </td>
                            <td
                              style="
                                padding: 10px;
                                border-bottom: 1px solid #ededed;
                                color: #455056;
                              "
                            >
                              ${contact.city}
                            </td>
                          <tr>
                            <td
                              style="
                                padding: 10px;
                                border-right: 1px solid #ededed;
                                width: 35%;
                                font-weight: 500;
                                color: rgba(0, 0, 0, 0.64);
                              "
                            >
                              Message:
                            </td>
                            <td style="padding: 10px; color: #455056">
                                ${contact.message}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <p
                  style="
                    font-size: 14px;
                    color: #455056bd;
                    line-height: 18px;
                    margin: 0 0 0;
                  "
                >
                  &copy; <strong>www.iclimbs.com</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        // Send error response to frontend
        return res.json({ success: false, error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        // Send success response to frontend
        return res.json({ success: true, message: "Email sent successfully" });
      }
    });
    // res.json({ status: "success", message: "Your Query is Registered Successfully" })
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Your Query Registration is Unsuccessful.",
    });
  }
});

contactRouter.get("/list", admin, async (req, res) => {
  try {
    const contact = await ContactModel.find();
    res.json({ status: "success", list: contact });
  } catch (error) {
    res.json({
      status: "error",
      message: "Your Query Registration is Unsuccessful.",
    });
  }
});

module.exports = { contactRouter };
