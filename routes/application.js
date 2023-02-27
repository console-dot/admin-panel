const route = require("express").Router();
const { Application } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

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
    const newApplication = new Application({
      name,
      email,
      phone,
      job_ref,
      cv_ref,
    });
    const response = await newApplication.save();
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
