const { AboutModel } = require("../model");
const Response = require("./Response");

class About extends Response {
  createAbout = async (req, res) => {
    try {
      const {
        description
      } = req.body;

      if (
        !description 
      ) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Required Description",
        });
      }

      let newData = new AboutModel({
        description
      });
      await newData.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "About created successfully",
        data: newData,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  updateAbout = async (req, res) => {
    try {
      const {
        description
      } = req.body;

      if (
        !description
      ) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Description Required",
        });
      }

      const updatedAbout = await AboutModel.findOneAndUpdate(
        {},
        {
          $set: {
            description
          },
        },
        { new: true }
      );

      if (!updatedAbout) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Description not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Intro updated successfully",
        data: updatedAbout,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

module.exports = { About };
