const router = require("express").Router();
const file = require("./file");
const customer = require("./customer");
const technology_category = require("./technology_category");
const product_category = require("./product_category");
const product = require("./product");
const technology = require("./technology");
const project = require("./project");
const case_study = require("./case_study");
const careers = require("./careers");
const city = require("./city");
const application = require("./application");
const department = require("./department");
const login = require("./login");
const { User } = require("../model/model");

router.use("/file", file);
router.use("/customer", customer);
router.use("/product_category", product_category);
router.use("/technology_category", technology_category);
router.use("/product", product);
router.use("/technology", technology);
router.use("/project", project);
router.use("/case_study", case_study);
router.use("/careers", careers);
router.use("/city", city);
router.use("/application", application);
router.use("/login", login);
router.use("/department", department);
router.use("/setup", async (req, res) => {
  const newUser = new User({
    username: "abuzar95",
    password: "12345678",
    email: "abuzar95@gmail.com",
  });
  const userExist = await User.findOne({ username: "abuzar95" });
  if (!userExist) {
    await newUser.save();
  }
  res.send("OK");
});

module.exports = router;
