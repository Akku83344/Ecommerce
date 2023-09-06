
const nodemailer = require("nodemailer");
const router  = require("express").Router();

// API endpoint for sending emails
router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  try {
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secureConnection: false,
        auth: {
          
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            ciphers:'SSLv3'
        }
      });
      

    // Send the email
    await transporter.sendMail({
      from: "akku83344@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Thank you for contacting us",
      text: "We will update you soon if new products arrive.",
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
