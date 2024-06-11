const mongoose = require("mongoose");

const artificialIntelligence = mongoose.Schema({
  heroDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  whyChooseUs: [],
  techStack: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TechStack",
    },
  ],
});

const ArtificialIntelligenceModel = mongoose.model(
  "ArtificialIntelligence",
  artificialIntelligence
);
module.exports = { ArtificialIntelligenceModel };
