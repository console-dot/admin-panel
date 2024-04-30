const { WhyChooseModel, CustomServiceModel } = require("../model");
const Response = require("./Response");

class CustomService extends Response {
  getCustomService = async (req, res) => {
    try {
      const customService = await CustomServiceModel.findById(
        req.params.id
      );

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
      const description = req.body.description;
      const proposition = req.body.proposition;
      const whyChooseDes= req.body.whyChooseDes;
      const delivers = req.body.delivers;
       
      const newCustomService = new CustomServiceModel({
        description: description,
        proposition: proposition,
        whyChooseDes:whyChooseDes,
        delivers:delivers
      });
      await newCustomService.save();
      return this.sendResponse(req, res, {
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
      const customServiceId = req.params.id;
  
      const existingCustomService = await CustomServiceModel.findById(customServiceId);
      if (!existingCustomService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Custom Service not found",
        });
      }
  
      existingCustomService.description = req.body.description;
      existingCustomService.proposition = req.body.proposition;
      existingCustomService.whyChooseDes = req.body.whyChooseDes;
      existingCustomService.delivers = req.body.delivers;
  
      await existingCustomService.save();
  
      return this.sendResponse(req, res, {
        status: 200,
        message: "Custom Service updated successfully",
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
