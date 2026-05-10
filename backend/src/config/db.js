const { Sequelize } = require('sequelize');

require('dotenv').config();

const dbHost = process.env.DB_HOST === 'localhost' ? 'db' : (process.env.DB_HOST || 'db');

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST resolving to:", dbHost);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    host: dbHost,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
