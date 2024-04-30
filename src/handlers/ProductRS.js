
  const { WhyChooseModel, ProductRSModel } = require("../model");
const Response = require("./Response");
  
  class ProductRS extends Response {
    getProductRS = async (req, res) => {
      try {
        const productRS = await ProductRSModel.findById(req.params.id);
  
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
        const whyChooseDes= req.body.whyChooseDes;
       
      
        
        const newProductRS = new ProductRSModel({
            description:description,
            keyComponents:keyComponents,
            whyChooseDes: whyChooseDes
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
    updateProductRS = async (req, res) => {
      try {
        const productRSId = req.params.id;
    
        const existingProductRS = await ProductRSModel.findById(productRSId);
        if (!existingProductRS) {
          return this.sendResponse(req, res, {
            status: 404,
            message: "Product RS page not found",
          });
        }
    
        existingProductRS.description = req.body.description;
        existingProductRS.keyComponents = req.body.keyComponents;
        existingProductRS.whyChooseDes = req.body.whyChooseDes;
    
        await existingProductRS.save();
    
        return this.sendResponse(req, res, {
          status: 200,
          message: "Product RS page updated successfully",
        });
      } catch (error) {
        console.error(error);
        return this.sendResponse(req, res, {
          status: 500,
          message: "Internal Server Error!",
        });
      }
    };
    
  }
  module.exports = { ProductRS };
  