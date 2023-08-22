const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      message: String,
    });

    const Contact = mongoose.model("Contact", contactSchema);

    const contacts = await Contact.find();
    db.close();

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
