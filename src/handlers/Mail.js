const Response = require("./Response");
const {
  createMailTransporter,
  getMailTo,
  getMailFrom,
} = require("../utils/mailTransporter");

class Mail extends Response {
  addMail = async (req, res) => {
    try {
      const { senderName, from, model, subject, phone, contactMethod } =
        req.body;
      if (!from || !senderName || !model) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      const fullMessage = `
Sender Name: ${senderName}
Sender Email: ${from}
Phone: ${phone || "N/A"}
Preferred Contact Method: ${contactMethod || "N/A"}

Message:
${model}
      `.trim();

      const transporter = createMailTransporter();

      await transporter.sendMail({
        from: getMailFrom("ConsoleDot Contact Form"),
        to: getMailTo(),
        replyTo: from,
        subject: subject ? `[Contact] ${subject}` : "New website contact",
        text: fullMessage,
      });

      this.sendResponse(req, res, {
        data: null,
        message: "Mail send Successfully",
        status: 200,
      });
    } catch (error) {
      console.error("Contact mail error:", error);
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

      const fullMessage = `
Sender Name: ${senderName}
Sender Email: ${from}
Phone: ${phone}
City: ${city || "N/A"}
Experience: ${senderExperience || "N/A"}
Gender: ${gender || "N/A"}
Portfolio / GitHub: ${github || "N/A"}
Applied For: ${designation}
      `.trim();

      const transporter = createMailTransporter();

      const mailOptions = {
        from: getMailFrom("ConsoleDot Careers"),
        to: getMailTo(),
        replyTo: from,
        subject: `[Job Application] ${designation}`,
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

      await transporter.sendMail(mailOptions);

      this.sendResponse(req, res, {
        data: null,
        message: "Mail sent successfully",
        status: 200,
      });
    } catch (error) {
      console.error("Job application mail error:", error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}

module.exports = { Mail };
