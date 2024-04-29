
const { BlockChainDSModel, TechStackModel } = require("../model");
const Response = require("./Response");
  
  class BlockchainDS extends Response {
    getBlockchain = async (req, res) => {
        try {
          const blockchainDS = await BlockChainDSModel.findById(
            req.params.id
          ).populate("techStack");
    
          if (!blockchainDS) {
            return this.sendResponse(req, res, {
              status: 404,
              message: "Blockchain Development not found",
            });
          }
          return this.sendResponse(req, res, {
            status: 201,
            message: "Blockchain Development retrieved successfully",
            data: blockchainDS,
          });
        } catch (error) {
          console.error(error);
          return this.sendResponse(req, res, {
            status: 500,
            message: "Internal Server Error!",
          });
        }
      };
    addBlockchain = async (req, res) => {
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

        const newWebDev = new BlockChainDSModel({
            description:description,
            whyChoose: whyChooseDes,
            techStack: newTechStack._id
        })
        await newWebDev.save();

        return this.sendResponse(req, res, {
          message: "Blockchain Development page created successfully",
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
  module.exports = { BlockchainDS };
  