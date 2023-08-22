const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://sabin:G00xdAbxJfNIcLwj@cluster0.s1mwxqr.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Define a contact schema
    const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      message: String,
    });

    // Create a model using the schema
    const Contact = mongoose.model("Contact", contactSchema);

    // Retrieve all contacts from the database
    const contacts = await Contact.find();

    // Close the database connection
    mongoose.connection.close();

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
