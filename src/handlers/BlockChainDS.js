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
      const { description, whyChooseUs, techStack } = req.body;

      // Create a new BlockChain instance
      const newBlockChain = new BlockChainDSModel({
        description,
        whyChooseUs,
        techStack,
      });
      // Save the new BlockChain instance to the database
      const savedBlockChain = await newBlockChain.save();

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
      const existingBlockchainDS = await BlockChainDSModel.findById(
        blockchainDSId
      );
      if (!existingBlockchainDS) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Blockchain Development not found",
        });
      }
      // Extract the fields to update from the request body
      const { description, whyChooseUs } = req.body;

      // Update description and whyChooseDes
      existingBlockchainDS.description =
        description || existingBlockchainDS?.description;
      existingBlockchainDS.whyChooseUs =
        whyChooseUs || existingBlockchainDS?.whyChooseUs;

      // Update tech stack if provided
      // if (req.body.techName && req.body.techType && req.body.techImage) {
      //   // Check if tech stack exists, if not create a new one
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
      //   existingBlockchainDS.techStack = techStack._id;
      // }

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
}
module.exports = { BlockchainDS };
