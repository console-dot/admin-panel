const mongoose = require("mongoose");

const blockChainDS = mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  techStack: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TechStack",
    },
  ],
  whyChooseUs: [],
});

const BlockChainDSModel = mongoose.model("BlockChainDS", blockChainDS);
module.exports = { BlockChainDSModel };
