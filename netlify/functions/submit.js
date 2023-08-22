const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect(
      "mongodb+srv://sabin:G00xdAbxJfNIcLwj@cluster0.s1mwxqr.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection;

    // Rest of your submit route logic...
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while submitting the form.",
      }),
    };
  }
};
