const mongoose = require("mongoose");

const caseStudy = mongoose.Schema({
  title: {
    type: String,
  },
  projectImage: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  clientName: {
    type: String,
  },
  services: {
    type: String,
  },
  projectDuration: {
    type: String,
  },
  images: [{ type: mongoose.Types.ObjectId, ref: "File" }],
  description: {
    type: String,
    required: true,
  },
  tech: [],
});

const CaseStudyModel = mongoose.model("case_study", caseStudy);
module.exports = { CaseStudyModel };
