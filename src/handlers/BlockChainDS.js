
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
    updateBlockchain = async (req, res) => {
      try {
        const blockchainDSId = req.params.id;
    
        // Check if blockchain development exists
        const existingBlockchainDS = await BlockChainDSModel.findById(blockchainDSId);
        if (!existingBlockchainDS) {
          return this.sendResponse(req, res, {
            status: 404,
            message: "Blockchain Development not found",
          });
        }
    
        // Update description and whyChooseDes
        existingBlockchainDS.description = req.body.description;
        existingBlockchainDS.whyChooseDes = req.body.whyChooseDes;
    
        // Update tech stack if provided
        if (req.body.techName && req.body.techType && req.body.techImage) {
          // Check if tech stack exists, if not create a new one
          let techStack = await TechStackModel.findOne({ name: req.body.techName });
          if (!techStack) {
            techStack = new TechStackModel({
              name: req.body.techName,
              type: req.body.techType,
              image: req.body.techImage,
            });
            await techStack.save();
          }
          existingBlockchainDS.techStack = techStack._id;
        }
    
        // Save the updated blockchain development
        await existingBlockchainDS.save();
    
        // Respond with success message
        return this.sendResponse(req, res, {
          status: 200,
          message: "Blockchain Development updated successfully",
        });
      } catch (error) {
        console.error(error);
        return this.sendResponse(req, res, {
          status: 500,
          message: "Internal Server Error!",
        });
      }
    };
    updateBlockchain = async (req, res) => {
      try {
        const blockchainDSId = req.params.id;
    
        const existingBlockchainDS = await BlockChainDSModel.findById(blockchainDSId);
        if (!existingBlockchainDS) {
          return this.sendResponse(req, res, {
            status: 404,
            message: "Blockchain Development not found",
          });
        }
    
        existingBlockchainDS.description = req.body.description;
        existingBlockchainDS.whyChooseDes = req.body.whyChooseDes;
    
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
          existingBlockchainDS.techStack = techStack._id;
        }
    
      
        await existingBlockchainDS.save();
    
      
        return this.sendResponse(req, res, {
          status: 200,
          message: "Blockchain Development updated successfully",
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
  module.exports = { BlockchainDS };
  