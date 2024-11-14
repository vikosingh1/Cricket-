const express = require('express');
const app = express();
app.use(express.json());

// In-memory user data for demonstration purposes
const users = [{ email: 'user@example.com', password: 'password' }];
let otpCode = null;

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  user ? res.sendStatus(200) : res.sendStatus(401);
});

// Register Route
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.sendStatus(409); // Conflict
  }
  users.push({ email, password });
  res.sendStatus(201);
});

// Forgot Password Route
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.sendStatus(404);
  
  otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP
  console.log(`OTP for ${email}: ${otpCode}`); // For demo purposes
  res.sendStatus(200);
});

// OTP Verification Route
app.post('/api/otp-verification', (req, res) => {
  const { otp } = req.body;
  otp === otpCode ? res.sendStatus(200) : res.sendStatus(401);
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
