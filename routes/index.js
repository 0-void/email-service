const express = require("express");
var router = express.Router();

const rateLimit = require("express-rate-limit");
 
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.REQUEST_RATE_LIMIT 
});

const { sendMail } = require('../utils/mailer');

/* GET home page. */
router.get('/sayhi/:to', apiLimiter, function (req, res, next) {
  const { to } = req.params;

  try {
    sendMail(to, "Greeting", `Hello, ${to}`);;
    res.send({message: 'Email send successfully'})
  }catch(err){
    console.log("Something went wrong", err);
    res.send({message: `Something went wrong, when sending mail to ${to}`})
  }
});

module.exports = router;
