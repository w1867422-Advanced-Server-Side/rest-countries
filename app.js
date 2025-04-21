require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const path= require('path');
const swaggerUi   = require('swagger-ui-express');
const YAML   = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

const authRoutes = require('./routes/authRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');
const countryRoutes = require('./routes/countryRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
    })
);

app.use('/auth', authRoutes);
app.use('/apiKey', apiKeyRoutes);
app.use('/countries', countryRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send( 'Server running on port: !' + PORT);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
