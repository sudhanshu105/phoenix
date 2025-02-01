import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import pkg from 'pg'; // Use default import
const { Client } = pkg; // Destructure Client from the imported package
import gadgetRoutes from './routes/gadgetRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Importing authentication routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const config = {
    user: "avnadmin",
    password: "AVNS_-qIOu_2GPRSMjpFiwCZ",
    host: "pg-34837887-aaweeye07-6d25.f.aivencloud.com",
    port: 25738,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('ca.pem').toString(),
    },
};

const client = new Client(config);
client.connect(err => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

app.use(cors());
app.use(express.json());

app.use('/gadgets', gadgetRoutes);
app.use('/login', authRoutes); // Adding the login route

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
