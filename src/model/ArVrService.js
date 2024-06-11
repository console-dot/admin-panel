const mongoose = require("mongoose");

const arVrService = mongoose.Schema({
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

const ArVrServiceModel = mongoose.model("ArVrService", arVrService);
module.exports = { ArVrServiceModel };
