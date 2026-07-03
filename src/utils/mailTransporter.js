const nodemailer = require("nodemailer");

function createMailTransporter() {
  const user = process.env.SMTP_USER || process.env.USER_MAIL;
  const pass = process.env.NODE_MAILER_PASSWORD;

  if (!user || !pass) {
    throw new Error("Mail is not configured. Set USER_MAIL and NODE_MAILER_PASSWORD.");
  }

  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function getMailTo() {
  return process.env.MAIL_TO || process.env.USER_MAIL;
}

function getMailFrom(displayName = "ConsoleDot Website") {
  const fromName = process.env.MAIL_FROM_NAME || displayName;
  const fromEmail = process.env.SMTP_USER || process.env.USER_MAIL;
  return `"${fromName}" <${fromEmail}>`;
}

module.exports = { createMailTransporter, getMailTo, getMailFrom };
