const mongoose = require("mongoose");

const landing = mongoose.Schema({
  intro: {
    type: mongoose.Types.ObjectId,
    ref: "Intro",
  },
  about: {
    type: mongoose.Types.ObjectId,
    ref: "About",
  },
  offshoreType: {
    type: mongoose.Types.ObjectId,
    ref: "OffshoreType",
  },
  testimonial: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  expertise: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Expertise",
    },
  ],
});

const LandingModel = mongoose.model("Landing", landing);
module.exports = { LandingModel };
