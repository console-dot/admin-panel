const { ContactUsModel } = require("../model");
const Response = require("./Response");
const nodemailer = require('nodemailer');

class ContactUs extends Response {
  createContact = async (req, res) => {
    try {
      const {
        name,
        email,
        subject,
        phone,
        companyName,
        preferredContactMethod,
        message,
      } = req.body;

      const newContact = new ContactUsModel({
        name,
        email,
        subject,
        phone,
        companyName,
        preferredContactMethod,
        message
      });
      
      await newContact.save();
      
    //   // Send email
    //   const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: 'hassaan.mujtaba.6@gmail.com',
    //       pass: 'Office@0007'
    //     }
    //   });
      
    //   const mailOptions = {
    //     from: 'hassaan.mujtaba.6@gmail.com',
    //     to: 'hassaan.mujtaba.8@gmail.com',
    //     subject: subject,
    //     text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nPhone: ${phone}\nCompany Name: ${companyName}\nPreferred Contact Method: ${preferredContactMethod}\nMessage: ${message}`
    //   };

    //   await transporter.sendMail(mailOptions);
    //   console.log('Email sent');

      return this.sendResponse(req, res, {
        message: "Contact created successfully",
        status: 201,
      });
    } catch(error) {
      console.error('Error creating contact:', error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}

module.exports = {ContactUs};
