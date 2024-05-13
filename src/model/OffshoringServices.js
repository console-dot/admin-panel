const mongoose = require("mongoose");

const offshoringServices = mongoose.Schema({
  topDescription: {
    type: String,
    required: true,
  },
  bottomDescription: {
    type: String,
    required: true,
  },
  // offshoreType:{
  //     type:mongoose.Types.ObjectId,
  //     ref:'OffshoreType'
  // }
  offshoreType: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OffshoreType",
    },
  ],
});

const OffshoringServicesModel = mongoose.model(
  "OffshoringService",
  offshoringServices
);
module.exports = { OffshoringServicesModel };
