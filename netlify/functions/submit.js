const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact-form", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
