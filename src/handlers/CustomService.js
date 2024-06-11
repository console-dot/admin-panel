const { WhyChooseModel, CustomServiceModel } = require("../model");
const Response = require("./Response");

class CustomService extends Response {
  getCustomService = async (req, res) => {
    try {
      const customService = await CustomServiceModel.findOne();

      if (!customService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Custom Service not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Custom Service retrieved successfully",
        data: customService,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  createCustomService = async (req, res) => {
    try {
      const {
        heroDescription,
        description,
        proposition,
        whyChooseDes,
        whyChooseUs,
        delivers,
      } = req.body;

      // Create a new CustomService instance
      const newCustomService = new CustomServiceModel({
        heroDescription,
        description,
        proposition,
        whyChooseDes,
        whyChooseUs,
        delivers,
      });
      // Save the new CustomService instance to the database
      const savedCustomService = await newCustomService.save();

      return this.sendResponse(req, res, {
        data: savedCustomService,
        message: "Custom Service page created successfully",
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
  updateCustomService = async (req, res) => {
    try {
      const { id } = req.params;

      let customService = await CustomServiceModel.findById(id);
      if (!customService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Custom Service not found",
        });
      }

      // Extract the fields to update from the request body
      const {
        heroDescription,
        description,
        proposition,
        whyChooseDes,
        whyChooseUs,
        delivers,
      } = req.body;

      // Update the custom service document with the new values
      customService.heroDescription =
        heroDescription || customService.heroDescription;
      customService.description = description || customService.description;
      customService.proposition = proposition || customService.proposition;
      customService.whyChooseDes = whyChooseDes || customService.whyChooseDes;
      customService.whyChooseUs = whyChooseUs || customService.whyChooseUs;
      customService.delivers = delivers || customService.delivers;

      // Save the updated custom service document
      const updatedCustomService = await customService.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Custom Service updated successfully",
        data: updatedCustomService,
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

module.exports = { CustomService };
