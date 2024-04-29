const { WhyChooseModel, CustomServiceModel } = require("../model");
const Response = require("./Response");

class CustomService extends Response {
  getCustomService = async (req, res) => {
    try {
      const customService = await CustomServiceModel.findById(
        req.params.id
      ).populate("whyChoose");

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
      const whyChooseDesc = req.body.whyChooseDesc;
      const whychoose = req.body.whyChoose;
      const delivers = req.body.delivers;
      const whyChoose = new WhyChooseModel({
        description:whychoose
      });
      await whyChoose.save();
       
      const newCustomService = new CustomServiceModel({
        description: description,
        proposition: proposition,
        whyChooseDesc:whyChooseDesc,
        whyChoose:whyChoose._id,
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
}

module.exports = { CustomService };
