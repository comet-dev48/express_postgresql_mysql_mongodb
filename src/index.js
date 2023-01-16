const express = require('express');
const cors = require('cors');
const path = require('path')

const db = require('./config/connectdb');
const routes = require('./routes');
const config = require('./config/config');
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/ErrorHandler');

const app = express();
const port = config.port || 3002;

app.use(cors());

//load database
// db.connectMongoDB(); // connect to MongoDB
// db.connectMySql(); // connect to MySQL
// db.initMySql(); // connect and migrate table into MySql
// db.connectPostgreSql();// connect to PostgreSQL
db.initPostgreSql(); // connect and migrate table into PostgreSQL

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', routes);

// 404 Error
app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})