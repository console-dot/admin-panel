const {
  ArVrServiceModel,
  TechStackModel,
  UiUxServiceModel,
} = require("../model");
const Response = require("./Response");

class UiUxService extends Response {
  getUiUxService = async (req, res) => {
    try {
      const uiuxService = await UiUxServiceModel.findById(
        req.params.id
      ).populate("techStack");

      if (!uiuxService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Ui/Ux Service not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Ui/Ux Service retrieved successfully",
        data: uiuxService,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addUiUxService = async (req, res) => {
    try {
      const { description, whyChooseUs, techStack } = req.body;

      // Create a new newUiUxService instance
      const newUiUxService = new UiUxServiceModel({
        description,
        whyChooseUs,
        techStack,
      });
      // Save the new newUiUxService instance to the database
      const savedUIService = await newUiUxService.save();

      return this.sendResponse(req, res, {
        message: "Ui/Ux Service page created successfully",
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
  updateUiUx = async (req, res) => {
    try {
      const { id } = req.params;

      const existingUiUx = await UiUxServiceModel.findById(id);
      if (!existingUiUx) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Ui/Ux Service not found",
        });
      }

      // Extract the fields to update from the request body
      const { description, whyChooseUs } = req.body;

      existingUiUx.description = description || existingUiUx?.description;
      existingUiUx.whyChooseUs = whyChooseUs || existingUiUx?.whyChooseUs;

      await existingUiUx.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Ui/Ux updated successfully",
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
module.exports = { UiUxService };
