const {
  WhyChooseModel,
  TechStackModel,
  WebDevelopmentModel,
} = require("../model");
const Response = require("./Response");

class WebDev extends Response {
  getWebDev = async (req, res) => {
    try {
      const webDevs = await WebDevelopmentModel.findById(
        req.params.id
      ).populate("techStack");

      if (!webDevs) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Web Development not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Web Development retrieved successfully",
        data: webDevs,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addWebDev = async (req, res) => {
    try {
      const {
        heroDescription,
        description,
        proposition,
        whyChooseUs,
        techStack,
      } = req.body;

      // Create a new WebDevelopment instance
      const newWebDevelopment = new WebDevelopmentModel({
        heroDescription,
        description,
        proposition,
        whyChooseUs,
        techStack,
      });
      // Save the new WebDevelopment instance to the database
      const savedWebDevelopment = await newWebDevelopment.save();

      return this.sendResponse(req, res, {
        message: "Web Development page created successfully",
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
  updateWebDev = async (req, res) => {
    try {
      const webDevId = req.params.id;

      const existingWebDev = await WebDevelopmentModel.findById(webDevId);
      if (!existingWebDev) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Web Development not found",
        });
      }
      // Extract the fields to update from the request body
      const {
        heroDescription,
        description,
        proposition,
        whyChooseUs,
        techStack,
      } = req.body;

      existingWebDev.heroDescription =
        heroDescription || existingWebDev?.heroDescription;
      existingWebDev.description = description || existingWebDev?.description;
      existingWebDev.proposition = proposition || existingWebDev?.proposition;
      existingWebDev.whyChooseUs = whyChooseUs || existingWebDev?.whyChooseUs;
      existingWebDev.techStack = techStack || existingWebDev?.techStack;

      // if (req.body.techName && req.body.techType && req.body.techImage) {
      //   let techStack = await TechStackModel.findOne({
      //     name: req.body.techName,
      //   });
      //   if (!techStack) {
      //     techStack = new TechStackModel({
      //       name: req.body.techName,
      //       type: req.body.techType,
      //       image: req.body.techImage,
      //     });
      //     await techStack.save();
      //   }
      //   existingWebDev.techStack = techStack._id;
      // }

      const updatedData = await existingWebDev.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Web Development updated successfully",
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
module.exports = { WebDev };
