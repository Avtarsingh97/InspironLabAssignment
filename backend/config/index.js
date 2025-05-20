require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL : process.env.DB_URL,
    PREFIX : process.env.PREFIX || '/v1',
}