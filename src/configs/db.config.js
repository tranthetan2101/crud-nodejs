const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = () => {
  const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  console.log(`Connecting to ${mongoDbUrl}`);
  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

module.exports = connectDatabase;