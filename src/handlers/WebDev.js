
const { WhyChooseModel, TechStackModel, WebDevelopmentModel } = require("../model");
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

        const newWebDev = new WebDevelopmentModel({
            description:description,
            proposition:proposition,
            whyChooseDes: whyChooseDes,
            techStack: newTechStack._id
        })
        await newWebDev.save();

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
    
        existingWebDev.description = req.body.description;
        existingWebDev.proposition = req.body.proposition;
        existingWebDev.whyChooseDes = req.body.whyChooseDes;
    
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
          existingWebDev.techStack = techStack._id;
        }
    

        await existingWebDev.save();
    
        return this.sendResponse(req, res, {
          status: 200,
          message: "Web Development updated successfully",
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
  