const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
dotenv.config();

const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const accountmemberRoutes = require('./routes/accountmemberRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
const limiter = rateLimit({
    max: 5,
    windowMs:1000,
    message: "Too many request from this IP"
});
app.use(limiter);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/accountmember', accountmemberRoutes);
app.use('/api/datahandler', dataHandlerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;