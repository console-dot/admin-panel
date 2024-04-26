
const { ExpertiseModel } = require("../model/Experties");
const Response = require("./Response");

class Expertise extends Response {
  createExpertise = async (req, res) => {
    try {
      const {
        image,
        name,
        description
      } = req.body;

      if (
        !name ||
        !description 
      ) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      let newData = new ExpertiseModel({
        image,
        name,
        description
      });
      await newData.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Expertise created successfully",
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

  updateExpertise = async (req, res) => {
    try {
      const {
        image,
        name,
        description
      } = req.body;

      if (
        !name ||
        !description 
      ) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Data Incomplete",
        });
      }

      const updatedExpertise = await ExpertiseModel.findOneAndUpdate(
        {},
        {
          $set: {
            image,
            name,
            description
          },
        },
        { new: true }
      );

      if (!updatedExpertise) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Expertise not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Expertise updated successfully",
        data: updatedExpertise,
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

module.exports = { Expertise };
