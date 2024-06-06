const { CaseStudyModel } = require("../model");
const Response = require("./Response");

class CaseStudies extends Response {
  createCaseStudy = async (req, res) => {
    try {
      const {
        title,
        projectImage,
        clientName,
        services,
        projectDuration,
        images,
        description,
        projectLink,
        techStack,
        highlights,
        client,
        product,
        goals,
        challenges,
        solution,
        results,
      } = req.body;

      if (!description) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Description is required",
        });
      }

      const newCaseStudy = new CaseStudyModel({
        title,
        projectImage,
        clientName,
        services,
        projectDuration,
        images,
        description,
        projectLink,
        techStack,
        highlights,
        client,
        product,
        goals,
        challenges,
        solution,
        results,
      });

      await newCaseStudy.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Case study created successfully",
        data: newCaseStudy,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getAllCaseStudies = async (req, res) => {
    try {
      const caseStudies = await CaseStudyModel.find();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Case studies retrieved successfully",
        data: caseStudies,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  getCaseStudy = async (req, res) => {
    try {
      const { id } = req.params;
      const caseStudy = await CaseStudyModel.findById(id);

      if (!caseStudy) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Case study not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Case study found",
        data: caseStudy,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  updateCaseStudy = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        projectImage,
        clientName,
        services,
        projectDuration,
        images,
        description,
        projectLink,
        techStack,
        highlights,
        client,
        product,
        goals,
        challenges,
        solution,
        results,
      } = req.body;

      const updateData = {
        ...(title && { title }),
        ...(projectImage && { projectImage }),
        ...(clientName && { clientName }),
        ...(services && { services }),
        ...(projectDuration && { projectDuration }),
        ...(images && { images }),
        ...(description && { description }),
        ...(projectLink && { projectLink }),
        ...(techStack && { techStack }),
        ...(highlights && { highlights }),
        ...(client && { client }),
        ...(product && { product }),
        ...(goals && { goals }),
        ...(challenges && { challenges }),
        ...(solution && { solution }),
        ...(results && { results }),
      };

      const updatedCaseStudy = await CaseStudyModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedCaseStudy) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Case study not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Case study updated successfully",
        data: updatedCaseStudy,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  deleteCaseStudy = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedCaseStudy = await CaseStudyModel.findByIdAndDelete(id);

      if (!deletedCaseStudy) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Case study not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Case study deleted successfully",
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

module.exports = { CaseStudies };
