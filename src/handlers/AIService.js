
const { BlockChainDSModel, TechStackModel, ArtificialIntelligenceModel } = require("../model");
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
        const description = req.body.description;
        const whyChooseDes= req.body.whyChooseDes;
        const techName = req.body.techName;
        const techType = req.body.techType;
        const techImage = req.body.techImage;
        
        const newTechStack = new TechStackModel({
            name:techName,
            type:techType,
            image: techImage
        })
        await newTechStack.save();

        const newAiService = new ArtificialIntelligenceModel({
            description:description,
            whyChoose: whyChooseDes,
            techStack: newTechStack._id
        })
        await newAiService.save();

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
          const { description, whyChooseDes, techName, techType, techImage } = req.body;
          const aiServiceId = req.params.id;
    
          const aiService = await ArtificialIntelligenceModel.findById(aiServiceId);
          if (!aiService) {
            return this.sendResponse(req, res, {
              status: 404,
              message: "Artificial Intelligence Service not found",
            });
          }
    
          aiService.description = description;
          aiService.whyChoose = whyChooseDes;
    
          const techStack = await TechStackModel.findById(aiService.techStack);
          if (!techStack) {
            return this.sendResponse(req, res, {
              status: 404,
              message: "Tech Stack not found",
            });
          }
          techStack.name = techName;
          techStack.type = techType;
          techStack.image = techImage;
    
          await aiService.save();
          await techStack.save();
    
          return this.sendResponse(req, res, {
            status: 200,
            message: "Artificial Intelligence Service updated successfully",
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
  }
  module.exports = { AIService };
  