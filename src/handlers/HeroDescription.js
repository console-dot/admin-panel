const { HeroDescriptionModel } = require("../model");
const Response = require("./Response");

class HeroDescription extends Response {
  getHeroDescription = async (req, res) => {
    try {
      const hero = await HeroDescriptionModel.findOne();

      if (!hero) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 201,
        message: "Retrieved successfully",
        data: hero,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  updateHeroDescription = async (req, res) => {
    try {
      const { id } = req.params;

      const existing = await HeroDescriptionModel.findById(id);
      if (!existing) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Not found",
        });
      }

      // Extract the fields to update from the request body
      const { caseStudyHero, contactHero, openPositionHero } = req.body;

      existing.caseStudyHero = caseStudyHero || existing?.caseStudyHero;
      existing.contactHero = contactHero || existing?.contactHero;
      existing.openPositionHero =
        openPositionHero || existing?.openPositionHero;

      const updatedData = await existing.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Updated successfully",
        data: updatedData,
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
module.exports = { HeroDescription };
