const mongoose = require("mongoose");

const mobileDevelopment = mongoose.Schema({
  heroDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  proposition: {
    type: String,
    required: true,
  },
  techStack: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TechStack",
    },
  ],
  whyChooseUs: [],
});

const MobileDevelopmentModel = mongoose.model(
  "MobileDevelopment",
  mobileDevelopment
);
module.exports = { MobileDevelopmentModel };
