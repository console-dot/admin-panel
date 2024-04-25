const mongoose = require("mongoose");

const productRS = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  keyComponents: [{
    marketAnalysis: { type: String },
    client: { type: String },
    feasibility: { type: String },
    roadMap: { type: String }
  }],
  whyChoose:{
    type:mongoose.Types.ObjectId,
    ref:"WhyChoose"
  }
  
});

const ProductRSModel = mongoose.model("ProductRS", productRS);
module.exports = { ProductRSModel };
