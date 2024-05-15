const mongoose = require("mongoose");

const productRS = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  keyComponents: [
    {
      marketAnalysis: [],
      client: [],
      feasibility: [],
      roadMap: [],
    },
  ],
  whyChooseUs: [],
});

const ProductRSModel = mongoose.model("ProductRS", productRS);
module.exports = { ProductRSModel };
