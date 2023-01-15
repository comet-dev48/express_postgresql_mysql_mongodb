const express = require('express');
const cors = require('cors');

const db = require('./config/connectdb');
const routes = require('./routes');
const config = require('./config/config');

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


app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
})

app.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});