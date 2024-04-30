
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

        const newAiService = new ArVrServiceModel({
            description:description,
            whyChoose: whyChooseDes,
            techStack: newTechStack._id
        })
        await newAiService.save();

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
    
        existingArVr.description = req.body.description;
        existingArVr.whyChooseDes = req.body.whyChooseDes;
    
        if (req.body.techName && req.body.techType && req.body.techImage) {

          let techStack = await TechStackModel.findOne({ name: req.body.techName });
          if (!techStack) {
            techStack = new TechStackModel({
              name: req.body.techName,
              type: req.body.techType,
              image: req.body.techImage,
            });
            await techStack.save();
          }
          existingArVr.techStack = techStack._id;
        }
    
      
        await existingArVr.save();
    
      
        return this.sendResponse(req, res, {
          status: 200,
          message: "ArVr updated successfully",
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
  