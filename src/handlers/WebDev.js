
const { WhyChooseModel, TechStackModel, WebDevelopmentModel } = require("../model");
const Response = require("./Response");
  
  class WebDev extends Response {
    getWebDev = async (req, res) => {
        try {
          const webDevs = await WebDevelopmentModel.findById(
            req.params.id
          ).populate("techStack").populate("whyChoose");
    
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
        const whyChoose= req.body.whyChoose;
        const techName = req.body.techName;
        const techType = req.body.techType;
        const techImage = req.body.techImage;

        const newWhychoose = new WhyChooseModel({
            description : whyChoose
        })
        await newWhychoose.save();
        
        const newTechStack = new TechStackModel({
            name:techName,
            type:techType,
            image: techImage
        })
        await newTechStack.save();

        const newWebDev = new WebDevelopmentModel({
            description:description,
            proposition:proposition,
            whyChoose: newWhychoose._id,
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
  }
  module.exports = { WebDev };
  