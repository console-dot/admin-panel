
  const { WhyChooseModel, ProductRSModel } = require("../model");
const Response = require("./Response");
  
  class ProductRS extends Response {
    getProductRS = async (req, res) => {
      try {
        const productRS = await ProductRSModel.findById(req.params.id)
          .populate("whyChoose")
  
        if (!productRS) {
          return this.sendResponse(req, res, {
            status: 404,
            message: "Product Rs page not found",
          });
        }
        return this.sendResponse(req, res, {
          status: 201,
          message: "Product Rs page retrieved successfully",
          data:productRS
        });
      } catch (error) {
        console.error(error);
        return this.sendResponse(req, res, {
          status: 500,
          message: "Internal Server Error!",
        });
      }
    };
    addProductRS = async (req, res) => {
      try {
        const description = req.body.description;
        const keyComponents= req.body.keyComponents;
        const whyChoose= req.body.whyChoose;
       
        const newWhychoose = new WhyChooseModel({
            description : whyChoose
        })
        await newWhychoose.save();
        
        const newProductRS = new ProductRSModel({
            description:description,
            keyComponents:keyComponents,
            whyChoose: newWhychoose._id
        })
        await newProductRS.save();
        return this.sendResponse(req, res, {
          
          message: "Product RS page created successfully",
          status: 201,
        });
      } catch (error) {
        console.log(error);
        return this.sendResponse(req, res, {
          data: null,
          message: "Internal Server Error!",
          status: 500,
        });
      }
    };
  }
  module.exports = { ProductRS };
  