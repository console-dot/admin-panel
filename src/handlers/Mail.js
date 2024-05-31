const Response = require("./Response");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

class Mail extends Response {
  addMail = async (req, res) => {
    try {
      const { senderName, from, message, subject, phone, contactMethod } =
        req.body;
      if (!from || !senderName || !message) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      const fullMessage = `
        Sender Name: ${senderName}
        Sender Email: ${from}
        Phone: ${phone}
        Preferred Contact Method: ${contactMethod}
        
        Message:
        ${message}
      `;

      await transporter.sendMail({
        from: `${senderName} <${from}>`,
        to: process.env.USER_MAIL,
        replyTo: from, // Set the reply-to address to the client's email address
        subject: subject || "Contact",
        text: fullMessage,
      });
      // Find the developer

      this.sendResponse(req, res, {
        data: null,
        message: "Mail send Successfully",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  apply = async (req, res) => {
    try {
      const { senderName, from, message, subject, phone, contactMethod } =
        req.body;
      if (!from || !senderName || !message || !phone || !contactMethod) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      const fullMessage = `
        Sender Name: ${senderName}
        Sender Email: ${from}
        Phone: ${phone}
        Preferred Contact Method: ${contactMethod}
        
        Message:
        ${message}
      `;

      const mailOptions = {
        from: `${senderName} <${process.env.USER_MAIL}>`,
        to: process.env.USER_MAIL,
        replyTo: from, // Set the reply-to address to the client's email address
        subject: subject || "Contact",
        text: fullMessage,
      };
      
      if (req.files && req.files.attachment) {
        const attachment = req.files.attachment;

        mailOptions.attachments = [
          {
            filename: attachment.name,
            content: attachment.data,
            contentType: attachment.mimetype,
          },
        ];
      }

      // Send the email
      await transporter.sendMail(mailOptions);

      this.sendResponse(req, res, {
        data: null,
        message: "Mail sent successfully",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}
module.exports = { Mail };
