const route = require("express").Router();
const { Product } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Product.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Product.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Product not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.category)
    return setResponse(res, "Category field is required", null, 405);
  if (!ObjectId.isValid(req.body.category))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.hero)
    return setResponse(res, "Hero field is required", null, 405);
  if (!ObjectId.isValid(req.body.hero))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const title = req.body.title;
    const category = req.body.category;
    const hero = req.body.hero;
    const newProduct = new Product({
      title,
      category,
      hero,
    });
    const response = await newProduct.save();
    return setResponse(res, "Product Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.category)
    return setResponse(res, "Category field is required", null, 405);
  if (!ObjectId.isValid(req.body.category))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.hero)
    return setResponse(res, "Hero field is required", null, 405);
  if (!ObjectId.isValid(req.body.hero))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const title = req.body.title;
    const category = req.body.category;
    const hero = req.body.hero;
    const myBody = {
      title,
      category,
      hero,
    };
    const response = await Product.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Product Updated", response, 200);
    return setResponse(res, "Product not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Product.deleteOne({
      _id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Product Deleted", response, 200);
    return setResponse(res, "Product not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
