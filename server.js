const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static HTML files

// Simulating an in-memory database for users and OTPs
let users = [];
let otpStorage = {};

// Register endpoint
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).send('Email already registered');
  }

  users.push({ email, password });
  res.status(200).send('Account created successfully');
});

// Forgot password endpoint (send OTP)
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).send('User not found');
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
  otpStorage[email] = otp;

  // Send OTP via email (dummy transporter)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'OTP for password reset',
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    }
    res.status(200).send('OTP sent to your email');
  });
});

// OTP verification endpoint
app.post('/api/verify-otp', (req, res) => {
  const { otp } = req.body;
  const email = Object.keys(otpStorage)[0]; // Get email from OTP storage (simplified)

  if (otpStorage[email] === parseInt(otp)) {
    delete otpStorage[email]; // Clear OTP after verification
    return res.status(200).send('OTP verified successfully');
  }

  res.status(400).send('Invalid OTP');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
