const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db connected".cyan.underline);
  } catch (err) {
    console.log(`error ${err}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;

// comment add
