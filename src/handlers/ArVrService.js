const { ArVrServiceModel, TechStackModel } = require("../model");
const Response = require("./Response");

class ArVrService extends Response {
  getArVrService = async (req, res) => {
    try {
      const arvrService = await ArVrServiceModel.findById(
        req.params.id
      ).populate("techStack");

      if (!arvrService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Ar-Vr Service not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Ar-Vr Service retrieved successfully",
        data: arvrService,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addArVrService = async (req, res) => {
    try {
      const { description, whyChooseUs, techStack } = req.body;

      // Create a new newArService instance
      const newArService = new ArVrServiceModel({
        description,
        whyChooseUs,
        techStack,
      });
      // Save the new newArService instance to the database
      const savedArService = await newArService.save();

      return this.sendResponse(req, res, {
        message: "Ar-Vr Service page created successfully",
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
  updateArVr = async (req, res) => {
    try {
      const arvrId = req.params.id;

      const existingArVr = await ArVrServiceModel.findById(arvrId);
      if (!existingArVr) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "ArVr Service not found",
        });
      }
      // Extract the fields to update from the request body
      const { description, whyChooseUs, techStack } = req.body;

      existingArVr.description = description || existingArVr?.description;
      existingArVr.whyChooseUs = whyChooseUs || existingArVr?.whyChooseUs;
      existingArVr.techStack = techStack || existingArVr?.techStack;

      const updatedData = await existingArVr.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "ArVr updated successfully",
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
module.exports = { ArVrService };
