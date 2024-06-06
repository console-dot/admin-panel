const mongoose = require("mongoose");

const caseStudy = mongoose.Schema({
  title: {
    type: String,
  },
  projectImage: {
    type: mongoose.Types.ObjectId,
    ref: "File",
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
  projectLink: {
    type: String,
  },
  tags: [],
  techStack: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TechStack",
    },
  ],
  highlights: [
    {
      heading: String,
      description: String,
    },
  ],
  client: [
    {
      name: String,
      description: String,
      country: String,
      industry: String,
      teamSize: String,
    },
  ],
  product: {
    type: String,
  },
  goals: [
    {
      heading: String,
      description: String,
    },
  ],
  challenges: [
    {
      heading: String,
      description: String,
    },
  ],
  solution: {
    type: String,
  },
  results: {
    description: String,
    subHeadings: [
      {
        heading: String,
        description: String,
      },
    ],
  },
});

const CaseStudyModel = mongoose.model("case_study", caseStudy);
module.exports = { CaseStudyModel };
