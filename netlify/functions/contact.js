const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact-form", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    return {
      statusCode: 200, // Correct status code
      body: JSON.stringify({ message: "Data fetched successfully" }),
    };
    // Rest of your contacts route logic...
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while fetching contacts.",
      }),
    };
  }
};
