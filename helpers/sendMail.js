const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports.sendMail = async(email,subject,html) => {
    console.log(process.env.EMAIL_USER)
    console.log( process.env.EMAIL_PASS)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: "nhathv.21it@gmail.com",
        to: email,
        subject: subject,
        html: html,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}
