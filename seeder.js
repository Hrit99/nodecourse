const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load env vars
dotenv.config({
    path: './config/config.env'
});

const Bootcamp = require('./models/Bootcamp');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

//import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log("data imported...");
        process.exit(1);
    } catch (error) {
        console.error(error);
    }
}

//delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log("data destroyed...");
        process.exit(1);
    } catch (error) {
        console.error(error);
    }
}

if(process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
}