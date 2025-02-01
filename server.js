import express from 'express';
import cors from 'cors';
import fs from 'fs';
import pkg from 'pg'; 
const { Client } = pkg; // Destructure Client from the imported package
import gadgetRoutes from './routes/gadgetRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Importing authentication routes

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use('/gadgets', gadgetRoutes);
app.use('/login', authRoutes); // Adding the login route

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
