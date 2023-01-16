const mongoose = require('mongoose');
const pool = require('../db/postgresql');// client for postgresql
const db = require('../db/mysql'); // client for mysql

const config = require('./config');

const connectMongoDB = async () => {
    const dbUrl = config.mongodb.url;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
        });

        console.log('MongoDB is connected....');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const connectMySql = async () => {

    await db.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('MySql is connected....');
        }
    });

};

const connectPostgreSql = async () => {

    await pool.connect(function (error) {
        if (!!error) {
            console.log(error);
        } else {
            console.log('PostgreSql is connected....');
        }
    });

};

const initPostgreSql = async () => {
    await pool.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('PostgreSql is connected....');
        }
    });

    const blogCreateQuery = `
    DO $$ BEGIN
        CREATE TYPE blog_category_enums AS ENUM ('sport','policy','culture');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS blogs(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
        title VARCHAR(100) NOT NULL, 
        content text,
        category blog_category_enums NOT NULL);`;

    pool.query(blogCreateQuery)
    .then((res) => {
      console.log("migrated successfully.");
    })
    .catch((err) => {
      console.log(err);
    });

};

const initMySql = async () => {
    await db.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('MySql is connected....');
        }
    });

    const blogCreateQuery = `
    create table blogs(  
        id INT NOT NULL,  
        title VARCHAR(200) NOT NULL,  
        content text NOT NULL,  
        category ENUM('sport', 'policy', 'culture') NOT NULL,  
        PRIMARY KEY (id)  
     ); 
    `;

    db.query(blogCreateQuery)
    .then((res) => {
      console.log("migrated successfully.");
    })
    .catch((err) => {
      console.log(err);
    });

};

module.exports = {
    connectMongoDB,
    connectMySql,
    connectPostgreSql,
    initPostgreSql,
    initMySql
};