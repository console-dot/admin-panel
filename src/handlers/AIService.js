const {
  BlockChainDSModel,
  TechStackModel,
  ArtificialIntelligenceModel,
} = require("../model");
const Response = require("./Response");

class AIService extends Response {
  getAIService = async (req, res) => {
    try {
      const aiService = await ArtificialIntelligenceModel.findById(
        req.params.id
      ).populate("techStack");

      if (!aiService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Artificial Intelligence Service not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Artificial Intelligence Service retrieved successfully",
        data: aiService,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addAIService = async (req, res) => {
    try {
      const { description, whyChooseUs, techStack } = req.body;

      // Create a new AiService instance
      const AiService = new ArtificialIntelligenceModel({
        description,
        whyChooseUs,
        techStack,
      });
      // Save the new AiService instance to the database
      const savedAI = await AiService.save();

      return this.sendResponse(req, res, {
        message: "Artificial Intelligence Service page created successfully",
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
  updateAIService = async (req, res) => {
    try {
      const aiServiceId = req.params.id;

      const existingAiService = await ArtificialIntelligenceModel.findById(
        aiServiceId
      );
      if (!existingAiService) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Artificial Intelligence Service not found",
        });
      }

      // Extract the fields to update from the request body
      const { description, whyChooseUs } = req.body;

      // Update description and whyChooseDes
      existingAiService.description =
        description || existingAiService?.description;
      existingAiService.whyChooseUs =
        whyChooseUs || existingAiService?.whyChooseUs;

      // Save the updated document
      const updatedAI = await existingAiService.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Artificial Intelligence Service updated successfully",
        data: updatedAI,
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
module.exports = { AIService };
