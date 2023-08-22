const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact-form", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    // Define a contact schema
    const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      message: String,
    });

    const Contact = mongoose.model("Contact", contactSchema);

    const contacts = await Contact.find(); // Retrieve all contacts from the database
    return {
      statusCode: 200,
      body: JSON.stringify(contacts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while fetching contacts.",
      }),
    };
  }
};
