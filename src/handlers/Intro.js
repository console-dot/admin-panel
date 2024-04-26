const { IntroModel } = require("../model");
const Response = require("./Response");

class Intro extends Response {
    
  createIntro = async (req, res) => {
    try {
      const {
        heroDescription,
        footerDescription,
        email,
        phone,
        address,
        socialLinks,
        workExperience,
      } = req.body;

      if (
        !heroDescription ||
        !footerDescription ||
        !email ||
        !phone ||
        !address ||
        !socialLinks ||
        !workExperience
      ) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      let newData = new IntroModel({
        heroDescription,
        footerDescription,
        email,
        phone,
        address,
        socialLinks,
        workExperience,
      });
      await newData.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Intro created successfully",
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

  updateIntro = async (req, res) => {
    try {
      const {
        heroDescription,
        footerDescription,
        email,
        phone,
        address,
        socialLinks,
        workExperience,
      } = req.body;

      if (
        !heroDescription ||
        !footerDescription ||
        !email ||
        !phone ||
        !address ||
        !socialLinks ||
        !workExperience
      ) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Data Incomplete",
        });
      }

      const updatedIntro = await IntroModel.findOneAndUpdate(
        {},
        {
          $set: {
            heroDescription,
            footerDescription,
            email,
            phone,
            address,
            socialLinks,
            workExperience,
          },
        },
        { new: true }
      );

      if (!updatedIntro) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Intro not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Intro updated successfully",
        data: updatedIntro,
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

module.exports = { Intro };
