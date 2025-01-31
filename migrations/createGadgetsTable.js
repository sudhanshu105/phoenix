const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const fs = require('fs');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
    ca: fs.readFileSync('ca.pem').toString(),
  },
});

const createGadgetsTable = async () => {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS "Gadgets" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      status VARCHAR(50) CHECK (status IN ('Available', 'Deployed', 'Destroyed', 'Decommissioned')) DEFAULT 'Available',
      decommissionedAt TIMESTAMP
    );
  `);
  console.log('Gadgets table created successfully.');
};

createGadgetsTable()
  .catch(err => {
    console.error('Error creating gadgets table:', err);
  })
  .finally(() => {
    sequelize.close();
  });
