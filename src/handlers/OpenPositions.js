const { OpenPositionModel } = require("../model");
const Response = require("./Response");

class OpenPosition extends Response {
  createPosition = async (req, res) => {
    try {
      const {
        jobCategory,
        experience,
        noOfPositions,
        qualifications,
        employmentType,
        designation,
        capacity,
      } = req.body;

      if (
        !jobCategory ||
        !experience ||
        !noOfPositions ||
        !qualifications ||
        !employmentType ||
        !designation ||
        !capacity
      ) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "All Data Required",
        });
      }

      const newJob = new OpenPositionModel({
        jobCategory,
        experience,
        noOfPositions,
        qualifications,
        employmentType,
        designation,
        noOfRequest: 0,
        capacity,
      });

      await newJob.save();
      return this.sendResponse(req, res, {
        status: 201,
        message: "New Position Created",
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  updatePosition = async (req, res) => {
    try {
      const positionId = req.params.id;
      const {
        jobCategory,
        experience,
        noOfPositions,
        qualifications,
        employmentType,
        designation,
        capacity,
        noOfRequest,
      } = req.body;

      const updatedPosition = await OpenPositionModel.findByIdAndUpdate(
        positionId,
        {
          jobCategory,
          experience,
          noOfPositions,
          qualifications,
          employmentType,
          designation,
          capacity,
          noOfRequest,
        },
        { new: true }
      );

      if (!updatedPosition) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Position not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        data: updatedPosition,
        message: "Position updated successfully",
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  deletePosition = async (req, res) => {
    try {
      const positionId = req.params.id;

      const deletedPosition = await OpenPositionModel.findByIdAndDelete(
        positionId
      );

      if (!deletedPosition) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Position not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Position deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
  getAllPositions = async (req, res) => {
    try {
      const allPositions = await OpenPositionModel.find();
      return this.sendResponse(req, res, {
        status: 200,
        data: allPositions,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getPositionById = async (req, res) => {
    try {
      const positionId = req.params.id;
      const position = await OpenPositionModel.findById(positionId);

      if (!position) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Position not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        data: position,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

module.exports = { OpenPosition };
