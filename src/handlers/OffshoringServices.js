const { OffshoreTypeModel, OffshoringServicesModel } = require("../model");
const Response = require("./Response");

class OffshoringServices extends Response {
  getOffshoringServices = async (req, res) => {
    try {
      const offshoringService =
        await OffshoringServicesModel.findOne().populate("offshoreType");

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
      // Create an array to hold the IDs of the newly created offshore types
      const offshoreTypeIds = [];

      // Assuming req.body.offShoreType is an array of offshore types
      for (const type of req.body.offShoreType) {
        const newOffshoreType = new OffshoreTypeModel({
          type: type.name,
          description: type.description,
          advantages: type.advantages,
          comparison: type.comparison,
        });
        const savedOffshoreType = await newOffshoreType.save();
        offshoreTypeIds.push(savedOffshoreType._id); // Store the id of the newly created document
      }

      // Create the offshore service with references to the offshore types
      const newOffshoreService = new OffshoringServicesModel({
        heroDescription: req.body.heroDescription,
        topDescription: req.body.topDescription,
        bottomDescription: req.body.bottomDescription,
        offshoreType: offshoreTypeIds, // Array of offshore type IDs
      });
      await newOffshoreService.save();

      return this.sendResponse(req, res, {
        message: "Offshore Service page created successfully",
        status: 201,
      });
    } catch (error) {
      console.error(error); // Improved logging with error
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  updateOffshoringServices = async (req, res) => {
    try {
      const { id } = req.params; // Assuming the id is passed in the request params

      // Update the top and bottom descriptions if provided in the request body
      const {
        heroDescription,
        topDescription,
        bottomDescription,
        offshoreType,
      } = req.body;

      // Construct an object with the fields to update
      const updateFields = {};
      if (heroDescription) updateFields.heroDescription = heroDescription;
      if (topDescription) updateFields.topDescription = topDescription;
      if (bottomDescription) updateFields.bottomDescription = bottomDescription;

      // Update the offshore service
      const updated = await OffshoringServicesModel.findByIdAndUpdate(
        id,
        updateFields
      );

      // If offshoreType is provided, update associated offshore types
      if (offshoreType) {
        // Update or create each offshore type
        for (const typeData of offshoreType) {
          const { type, description, advantages, comparison } = typeData;

          // Update existing offshore type or create a new one if not found
          await OffshoreTypeModel.findOneAndUpdate(
            { type }, // Find by type name
            { description, advantages, comparison },
            { upsert: true, new: true }
          );
        }
      }

      return this.sendResponse(req, res, {
        message: "Offshore Service updated successfully",
        status: 200,
        data: updated,
      });
    } catch (error) {
      console.error(error); // Improved logging with error
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}

module.exports = { OffshoringServices };
