const mongoose = require('mongoose');

const connectdb = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });

   console.log(`mongodb connected ${conn.connection.host}`);
}

module.exports = connectdb;