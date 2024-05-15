const { TechStackModel, MobileDevelopmentModel } = require("../model");
const Response = require("./Response");

class MobDev extends Response {
  getMobDev = async (req, res) => {
    try {
      const mobDevs = await MobileDevelopmentModel.findById(
        req.params.id
      ).populate("techStack");

      if (!mobDevs) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Mobile Development not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Mobile Development retrieved successfully",
        data: mobDevs,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addMobDev = async (req, res) => {
    try {
      const { description, proposition, whyChooseUs, techStack } = req.body;

      // Create a new MobDevelopment instance
      const newMobDevelopment = new MobileDevelopmentModel({
        description,
        proposition,
        whyChooseUs,
        techStack,
      });
      // Save the new MobDevelopment instance to the database
      const savedMobDevelopment = await newMobDevelopment.save();

      return this.sendResponse(req, res, {
        message: "Mobile Development page created successfully",
        status: 201,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
  updateMobDev = async (req, res) => {
    try {
      const mobDevId = req.params.id;

      const existingMobDev = await MobileDevelopmentModel.findById(mobDevId);
      if (!existingMobDev) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Mobile Development not found",
        });
      }

      // Extract the fields to update from the request body
      const { description, proposition, whyChooseUs, techStack } = req.body;

      existingMobDev.description = description || existingMobDev?.description;
      existingMobDev.proposition = proposition || existingMobDev?.proposition;
      existingMobDev.whyChooseUs = whyChooseUs || existingMobDev?.whyChooseUs;
      existingMobDev.techStack = techStack || existingMobDev?.techStack;

      const updatedData = await existingMobDev.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Mobile Development updated successfully",
        data: updatedData,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
}
module.exports = { MobDev };
