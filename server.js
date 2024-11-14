// server.js (Express.js server)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files (HTML, CSS, JS)

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  // Here, you would add logic to save the user to a database
  console.log('User registered:', email);
  res.status(200).send('User registered');
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  // Send OTP logic goes here (e.g., email the user an OTP)
  console.log('OTP sent to:', email);
  res.status(200).send('OTP sent');
});

app.post('/api/verify-otp', (req, res) => {
  const { otp } = req.body;
  // OTP verification logic goes here
  if (otp === '123456') {  // Simulating OTP verification
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
