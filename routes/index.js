const express = require("express");
var router = express.Router();

const { sendMail } = require('../utils/mailer');

/* GET home page. */
router.get('/sayhi/:to', function (req, res, next) {
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
