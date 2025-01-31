const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const gadgetRoutes = require('./routes/gadgetRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('ca.pem').toString(),
    },
});

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize instance for use in models
module.exports = { sequelize };

// Routes
app.use('/gadgets', gadgetRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
