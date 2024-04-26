const { OffshoreTypeModel } = require("../model");
const Response = require("./Response");


class OffShoreType extends Response {
    createOffSHoreType = async (req, res) => {
        try {
          const {
            type, 
            description,
            advantages,
            comparison
          } = req.body;
    
          if (
            !type || 
            !description || 
            !advantages || 
            !comparison 
          ) {
            return this.sendResponse(req, res, {
              status: 401,
              message: "Data Incomplete",
            });
          }
    
          let newData = new OffshoreTypeModel({
            type, 
            description,
            advantages,
            comparison
          });
          await newData.save();
    
          return this.sendResponse(req, res, {
            status: 200,
            message: "OffSHoreType created successfully",
            data: newData,
          });
        } catch (err) {
          console.error(err);
          return this.sendResponse(req, res, {
            status: 500,
            message: "Internal server error",
          });
        }
      };
      updateOffShoreType = async (req, res) => {
        try {
          const {
            type, 
            description,
            advantages,
            comparison
          } = req.body;
    
          if (
            !type || 
            !description || 
            !advantages || 
            !comparison 
          ) {
            return this.sendResponse(req, res, {
              status: 400,
              message: "Data Incomplete",
            });
          }
    
          const updatedOffshore = await OffshoreTypeModel.findOneAndUpdate(
            {},
            {
              $set: {
                type, 
            description,
            advantages,
            comparison
              },
            },
            { new: true }
          );
    
          if (!updatedOffshore) {
            return this.sendResponse(req, res, {
              status: 404,
              message: "Data not found",
            });
          }
    
          return this.sendResponse(req, res, {
            status: 200,
            message: "Offshore Type updated successfully",
            data: updatedOffshore,
          });
        } catch (err) {
          console.error(err);
          return this.sendResponse(req, res, {
            status: 500,
            message: "Internal server error",
          });
        }
      };
}

module.exports = {OffShoreType}