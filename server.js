const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger')
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
//load env vars

const connectdb = require('./config/db');

dotenv.config({path: './config/config.env' });

//connect to database
connectdb();

const bootcamps = require('./routes/bootcamps');

const app = express();


//body parser
app.use(express.json());

//dev login middlware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen((PORT), () => {
    console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
})