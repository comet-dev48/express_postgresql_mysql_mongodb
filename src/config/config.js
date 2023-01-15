require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongodb: {
        url: process.env.MONGODB_URL
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        db: process.env.MYSQL_DBNAME
    },
    postgresql: {
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        username: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        db: process.env.POSTGRESQL_DBNAME
    },
}