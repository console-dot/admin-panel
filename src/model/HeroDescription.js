const mongoose = require("mongoose");

const heroDescription = mongoose.Schema({
  caseStudyHero: {
    type: String,
    required: true,
  },
  contactHero: {
    type: String,
    required: true,
  },
  openPositionHero: {
    type: String,
    required: true,
  },
});

const HeroDescriptionModel = mongoose.model("HeroDescription", heroDescription);
module.exports = { HeroDescriptionModel };
