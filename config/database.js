require('dotenv').config()

module.exports = {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: "AVNS_jMMf3ufYCqjEu4UyUYC",
    database: process.env.DB_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
    }
};
