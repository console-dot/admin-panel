const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();
const router = require("./routes/route");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send({ status: 200, message: "Hello", data: null });
});

app.listen(81, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://webbyzar:z8KMGDsRJ5lcCduA@cluster0.qiybgku.mongodb.net/website?retryWrites=true&w=majority"
    );
    console.log("Database Connected");
  } catch (err) {
    handleError(err);
  }
});
