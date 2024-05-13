const { TechStackModel } = require("../model");
const Response = require("./Response");

class TechStack extends Response {
  createTechStack = async (req, res) => {
    try {
      const { name, type, image } = req.body;

      if (!name || !type) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      let newData = new TechStackModel({
        name,
        type,
        image,
      });
      await newData.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "TechStack created successfully",
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

  updateTechStack = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image } = req.body;

      if (!name) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Provide name to update",
        });
      }

      const updatedTechStack = await TechStackModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            image,
          },
        },
        { new: true }
      );

      if (!updatedTechStack) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "TechStack not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "TechStack updated successfully",
        data: updatedTechStack,
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

module.exports = { TechStack };
