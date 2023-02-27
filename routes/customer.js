const route = require("express").Router();
const { Customer } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Customer.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Customer.findOne({ _id: ObjectId(req.params.id) });
    if (!response) return setResponse(res, "Customer not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.name)
    return setResponse(res, "Name field is required", null, 405);
  if (!req.body.address)
    return setResponse(res, "Address Field is required.", null, 405);
  if (!req.body.logo) return setResponse(res, "Logo is required", null, 405);
  if (!ObjectId.isValid(req.body.logo))
    return setResponse(res, "Invalid Logo ID", null, 405);
  if (!req.body.contact_info)
    return setResponse(res, "Contact Information is required", null, 405);
  try {
    const name = req.body.name;
    const address = req.body.address;
    const logo = req.body.logo;
    const contact_info = req.body.contact_info;
    const newCustomer = new Customer({
      name,
      address,
      logo,
      contact_info,
    });
    const response = await newCustomer.save();
    return setResponse(res, "Customer Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.name)
    return setResponse(res, "Name field is required", null, 405);
  if (!req.body.address)
    return setResponse(res, "Address Field is required.", null, 405);
  if (!req.body.logo) return setResponse(res, "Logo is required", null, 405);
  if (!ObjectId.isValid(req.body.logo))
    return setResponse(res, "Invalid Logo ID", null, 405);
  if (!req.body.contact_info)
    return setResponse(res, "Contact Information is required", null, 405);
  try {
    const name = req.body.name;
    const address = req.body.address;
    const logo = req.body.logo;
    const contact_info = req.body.contact_info;
    const myBody = { name, address, logo, contact_info };
    const response = await Customer.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Customer Updated", response, 200);
    return setResponse(res, "Customer not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Customer.deleteOne({ _id: req.params.id });
    if (response.deletedCount === 1)
      return setResponse(res, "Customer Deleted", response, 200);
    return setResponse(res, "Customer not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
