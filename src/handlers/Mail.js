const Response = require("./Response");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "mail.consoledot.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

// HTML template for confirmation email to sender
const getConfirmationTemplate = (senderName, requestType = "contact") => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Request</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                color: #2c3e50;
                margin-bottom: 30px;
            }
            .content {
                margin-bottom: 30px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #7f8c8d;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
            .highlight {
                color: #3498db;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Your Request!</h1>
            </div>
            <div class="content">
                <p>Dear <span class="highlight">${senderName}</span>,</p>
                <p>Thank you for reaching out to us. We have successfully received your ${requestType} request.</p>
                <p>We will review your submission and get back to you as soon as possible. Our team typically responds within 24-48 hours.</p>
                <p>If you have any urgent questions or need immediate assistance, please don't hesitate to contact us.</p>
                <p>Best regards,<br>
                <strong>Our Team</strong></p>
            </div>
            <div class="footer">
                <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// HTML template for notification email to owner
const getNotificationTemplate = (data, requestType = "contact") => {
  const isJobApplication = requestType === "job";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New ${
          isJobApplication ? "Job Application" : "Contact"
        } Request</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                color: #e74c3c;
                margin-bottom: 30px;
            }
            .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .info-table th, .info-table td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            .info-table th {
                background-color: #f8f9fa;
                font-weight: bold;
                color: #2c3e50;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #7f8c8d;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 New ${
                  isJobApplication ? "Job Application" : "Contact"
                } Request</h1>
            </div>
            <div class="content">
                <p>You have received a new ${requestType} request with the following details:</p>
                <table class="info-table">
                    <tr>
                        <th>Name</th>
                        <td>${data.senderName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${data.from}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${data.phone || "Not provided"}</td>
                    </tr>
                    ${
                      isJobApplication
                        ? `
                    <tr>
                        <th>City</th>
                        <td>${data.city || "Not provided"}</td>
                    </tr>
                    <tr>
                        <th>Experience</th>
                        <td>${data.senderExperience || "Not provided"}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>${data.gender || "Not provided"}</td>
                    </tr>
                    <tr>
                        <th>GitHub</th>
                        <td>${data.github || "Not provided"}</td>
                    </tr>
                    <tr>
                        <th>Designation</th>
                        <td>${data.designation}</td>
                    </tr>
                    `
                        : `
                    <tr>
                        <th>Subject</th>
                        <td>${data.subject || "Contact"}</td>
                    </tr>
                    <tr>
                        <th>Contact Method</th>
                        <td>${data.contactMethod || "Not specified"}</td>
                    </tr>
                    <tr>
                        <th>Message/Model</th>
                        <td>${data.model}</td>
                    </tr>
                    `
                    }
                </table>
            </div>
            <div class="footer">
                <p>Please respond to this request promptly.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

class Mail extends Response {
  addMail = async (req, res) => {
    try {
      const { senderName, from, model, subject, phone, contactMethod } =
        req.body;
      console.log(senderName, from, model, subject, phone, contactMethod);

      if (!from || !senderName || !model) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      const requestData = {
        senderName,
        from,
        model,
        subject,
        phone,
        contactMethod,
      };

      // Send notification email to owner
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: process.env.OWNER_HARIS_MAIL,
        replyTo: from,
        subject: `New Contact Request from ${senderName}`,
        html: getNotificationTemplate(requestData, "contact"),
      });
      // Send notification email to owner
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: process.env.OWNER_ABUZAR_MAIL,
        replyTo: from,
        subject: `New Contact Request from ${senderName}`,
        html: getNotificationTemplate(requestData, "contact"),
      });

      // Send confirmation email to sender
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: from,
        subject: "Thank you for your contact request",
        html: getConfirmationTemplate(senderName, "contact"),
      });

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

  apply = async (req, res) => {
    try {
      const {
        senderName,
        from,
        city,
        senderExperience,
        gender,
        github,
        phone,
        designation,
      } = req.body;

      if (!from || !senderName || !phone || !designation) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      const requestData = {
        senderName,
        from,
        city,
        senderExperience,
        gender,
        github,
        phone,
        designation,
      };

      const mailOptions = {
        from: process.env.USER_MAIL,
        to: process.env.USER_MAIL,
        replyTo: from,
        subject: `New Job Application - ${designation} from ${senderName}`,
        html: getNotificationTemplate(requestData, "job"),
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

      // Send notification email to owner
      await transporter.sendMail(mailOptions);

      // Send confirmation email to applicant
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: from,
        subject: "Thank you for your job application",
        html: getConfirmationTemplate(senderName, "job application"),
      });

      this.sendResponse(req, res, {
        data: null,
        message: "Application sent successfully",
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
