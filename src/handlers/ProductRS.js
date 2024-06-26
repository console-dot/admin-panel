const { WhyChooseModel, ProductRSModel } = require("../model");
const Response = require("./Response");

class ProductRS extends Response {
  getProductRS = async (req, res) => {
    try {
      const productRS = await ProductRSModel.findOne();

      if (!productRS) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Product Rs page not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Product Rs page retrieved successfully",
        data: productRS,
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
      const { heroDescriptiondescription, keyComponents, whyChooseUs } =
        req.body;

      if (!description || !keyComponents || !whyChooseUs) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      // Create a new ProductRS instance
      const newProductRS = new ProductRSModel({
        heroDescription,
        description,
        keyComponents,
        whyChooseUs,
      });

      // Save the new ProductRS instance to the database
      const savedProductRS = await newProductRS.save();

      return this.sendResponse(req, res, {
        data: savedProductRS,
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

      const productRS = await ProductRSModel.findById(productRSId);
      if (!productRS) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Product RS page not found",
        });
      }
      // Extract the fields to update from the request body
      const { heroDescription, description, keyComponents, whyChooseUs } =
        req.body;

      // Update the productRS document with the new values
      productRS.heroDescription = heroDescription || productRS.heroDescription;
      productRS.description = description || productRS.description;
      productRS.keyComponents = keyComponents || productRS.keyComponents;
      productRS.whyChooseUs = whyChooseUs || productRS.whyChooseUs;

      // Save the updated productRS document
      const updatedProductRS = await productRS.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Product RS page updated successfully",
        data: updatedProductRS,
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
