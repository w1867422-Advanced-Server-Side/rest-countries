require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');
const countryRoutes = require('./routes/countryRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/apiKey', apiKeyRoutes);
app.use('/countries', countryRoutes);

app.get('/', (req, res) => {
    res.send( 'Server running on port: !' + PORT);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
