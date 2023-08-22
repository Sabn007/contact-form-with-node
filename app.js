const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to allow all origins

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contact-form", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

// Define a contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// API endpoint for submitting a contact form
app.post("/submit", async (req, res) => {
  try {
    debugger;
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while submitting the form." });
  }
});

// Define a GET API endpoint to fetch all contact form data
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Retrieve all contacts from the database
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching contacts." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
