
const { ArVrServiceModel, TechStackModel, UiUxServiceModel } = require("../model");
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

        const newUiUxService = new UiUxServiceModel({
            description:description,
            whyChoose: whyChooseDes,
            techStack: newTechStack._id
        })
        await newUiUxService.save();

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
  }
  module.exports = { UiUxService };
  