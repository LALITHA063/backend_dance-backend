const Contact = require("../Models/ContactModel");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    await Contact.create({ name, email, phone, message });
    
    res.json({ message: "Contact message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};