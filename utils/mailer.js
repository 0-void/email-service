/**
 * @description -requring nodemailer
 */
const nodemailer = require("nodemailer");
const { logger } = require("./logger");

/**
 * Configuring .env file for env variables
 */
require("dotenv").config();


module.exports.sendMail = async (mailTo, subject, msgBody) => {

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      secureConnection: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    // constructing mailOptions Object
    let mailOptions = {
      from: process.env.SENDER_EMAIL, // sender addres
      to: mailTo,// list of  receivers
      subject: subject,// Subject line
      html: msgBody,
      priority: "high"
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    //closing the transporter object 
    transporter.close();

    return info;
  } catch (error) {
    logger.error("Error in Node Mailer", error.message);
  }
};
