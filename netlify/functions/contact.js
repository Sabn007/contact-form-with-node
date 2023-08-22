const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact-form", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    // Ensure the connection is open before querying
    await db.once("open", async () => {
      // Define a contact schema
      const contactSchema = new mongoose.Schema({
        name: String,
        email: String,
        message: String,
      });

      const Contact = mongoose.model("Contact", contactSchema);

      // Query all contacts
      const contacts = await Contact.find();

      // Close the MongoDB connection
      db.close();

      // Return the fetched contacts
      return {
        statusCode: 200,
        body: JSON.stringify(contacts),
      };
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while fetching contacts.",
      }),
    };
  }
};
