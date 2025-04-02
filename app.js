require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/database');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send( 'Server running on port: !' + PORT);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
