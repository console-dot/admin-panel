const route = require("express").Router();
const { Application } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;
const mailer = require("./mailer");

const auth = require("../middleware/authorization");

route.get("/", auth, async (req, res) => {
  try {
    const response = await Application.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Application.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Application not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", async (req, res) => {
  if (!req.body.name)
    return setResponse(res, "Name field is required", null, 405);
  if (!req.body.email)
    return setResponse(res, "Email field is required", null, 405);
  if (!req.body.phone)
    return setResponse(res, "Phone field is required", null, 405);
  if (!req.body.cv_ref) return setResponse(res, "CV is required", null, 405);
  if (!req.body.job_ref) return setResponse(res, "Job is required", null, 405);
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const job_ref = req.body.job_ref;
    const cv_ref = req.body.cv_ref;
    const job_title = req.body.job_title;
    const newApplication = new Application({
      name,
      email,
      phone,
      job_ref,
      cv_ref,
    });
    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const response = await newApplication.save();
    await mailer(
      email,
      "Application Submitted",
      `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Job Application Submitted</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; border-collapse: collapse; margin-top: 50px;">
          <tr>
            <td style="padding: 20px; background-color: #f5f5f5; border: 1px solid #dddddd;">
              <h1 style="margin-top: 0; color: #333333; font-size: 24px; font-weight: bold;">Job Application Submitted</h1>
              <p>Dear ${name},</p>
              <p>Your job application has been submitted. Thank you for your interest in ConsoleDot. Our hiring team will review your application and get back to you if there is a fit.</p>
              <p>Thank you,</p>
              <p>Haris Siddiqui<br>Human Resource Executive<br>ConsoleDot</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `
    );
    await mailer(
      "hr@consoledot.com",
      "New Application",
      `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>New Job Application Received</title>
        <style>
          /* Insert your custom CSS styles here */
        </style>
      </head>
      <body>
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
              <h1>New Job Application Received</h1>
            </td>
          </tr>
          <tr>
            <td align="left" valign="top" style="padding: 20px 0;">
              <p>Hello HR Team,</p>
              <p>We have received a new job application for the following position:</p>
              <ul>
                <li><strong>Position:</strong> ${job_title}</li>
                <li><strong>Name of Applicant:</strong> ${name}</li>
                <li><strong>Email of Applicant:</strong> ${email}</li>
                <li><strong>Phone Number of Applicant:</strong> ${phone}</li>
                <li><strong>Link to cv/resume:</strong> <a href="https://api.consoledot.com/file/${cv_ref}">Click Here</a></li>
                <li><strong>Date Received:</strong> ${today}</li>
              </ul>
              <p>Please take the necessary steps to review this application and notify the applicant of the next steps.</p>
              <p>Thank you,</p>
              <p>ConsoleDot</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `
    );
    return setResponse(res, "Application Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Application.deleteOne({
      _id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Application Deleted", response, 200);
    return setResponse(res, "Application not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
