const { OffshoreTypeModel, OffshoringServicesModel } = require("../model");
const Response = require("./Response");

class OffshoringServices extends Response {
  getOffshoringServices = async (req, res) => {
    try {
      const offshoringService = await OffshoringServicesModel.findById(
        req.params.id
      ).populate("offshoreType");

      if (!offshoringService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Offshoring Service not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Offshoring Service retrieved successfully",
        data: offshoringService,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  createOffshoringServices = async (req, res) => {
    try {
      const description = req.body.description;

      const newOffshoreType = new OffshoreTypeModel({
        type: req.body.offshoreType,
        description: req.body.offshoreDescription,
        advantages: req.body.offshoreAdvantages,
        comparison: req.body.offshoreComparison,
      });
      await newOffshoreType.save();
      const newOffshoreService = new OffshoringServicesModel({
        description: description,
        offshoreType: newOffshoreType._id,
      });
      await newOffshoreService.save();
      return this.sendResponse(req, res, {
        message: "Offshore Service page created successfully",
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
  updateOffshoringServices = async (req, res) => {
    try {
      const offshoringServiceId = req.params.id;
  
      const existingOffshoringService = await OffshoringServicesModel.findById(offshoringServiceId);
      if (!existingOffshoringService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Offshoring Service not found",
        });
      }
  
      const description = req.body.description;
      existingOffshoringService.description = description;
  
      const offshoreTypeData = {
        type: req.body.offshoreType,
        description: req.body.offshoreDescription,
        advantages: req.body.offshoreAdvantages,
        comparison: req.body.offshoreComparison,
      };
      let offshoreType = await OffshoreTypeModel.findOne({ type: offshoreTypeData.type });
      if (!offshoreType) {
        offshoreType = new OffshoreTypeModel(offshoreTypeData);
        await offshoreType.save();
      }
      existingOffshoringService.offshoreType = offshoreType._id;
  
      await existingOffshoringService.save();
  
      return this.sendResponse(req, res, {
        status: 200,
        message: "Offshoring Service updated successfully",
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

module.exports = { OffshoringServices };
