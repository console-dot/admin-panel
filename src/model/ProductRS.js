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
    WhyChoose: {type:mongoose.Types.ObjectId, ref: 'WhyChoose' },
  }],
  whyChoose:{
    type:mongoose.Types.ObjectId,
    ref:"WhyChoose"
  }
  
});

const ProductRSModel = mongoose.model("ProductRS", productRS);
module.exports = { ProductRSModel };
