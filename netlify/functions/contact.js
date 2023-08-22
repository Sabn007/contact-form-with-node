const mongoose = require("mongoose");

exports.handler = async (event) => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact-form", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "An error occurred while connecting to the database.",
        }),
      };
    });

    db.once("open", async () => {
      const contactSchema = new mongoose.Schema({
        name: String,
        email: String,
        message: String,
      });

      const Contact = mongoose.model("Contact", contactSchema);

      try {
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
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while connecting to the database.",
      }),
    };
  }
};
