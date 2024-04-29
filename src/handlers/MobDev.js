
const { TechStackModel, MobileDevelopmentModel } = require("../model");
const Response = require("./Response");
  
  class MobDev extends Response {
    getMobDev = async (req, res) => {
        try {
          const mobDevs = await MobileDevelopmentModel.findById(
            req.params.id
          ).populate("techStack");
    
          if (!mobDevs) {
            return this.sendResponse(req, res, {
              status: 404,
              message: "Mobile Development not found",
            });
          }
          return this.sendResponse(req, res, {
            status: 201,
            message: "Mobile Development retrieved successfully",
            data: mobDevs,
          });
        } catch (error) {
          console.error(error);
          return this.sendResponse(req, res, {
            status: 500,
            message: "Internal Server Error!",
          });
        }
      };
    addMobDev = async (req, res) => {
      try {
        const description = req.body.description;
        const proposition= req.body.proposition;
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

        const newWebDev = new MobileDevelopmentModel({
            description:description,
            proposition:proposition,
            whyChoose: whyChooseDes,
            techStack: newTechStack._id
        })
        await newWebDev.save();

        return this.sendResponse(req, res, {
          message: "Mobile Development page created successfully",
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
  module.exports = { MobDev };
  