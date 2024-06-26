const mongoose = require("mongoose");

const webDevelopment = mongoose.Schema({
  heroDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  proposition: {
    type: String,
    required: false,
  },
  whyChooseUs: [],
  techStack: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TechStack",
    },
  ],
});

const WebDevelopmentModel = mongoose.model("WebDevelopment", webDevelopment);
module.exports = { WebDevelopmentModel };
