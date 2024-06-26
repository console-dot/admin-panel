const {
  LandingModel,
  IntroModel,
  AboutModel,
  OffshoreTypeModel,
  TestimonialModel,
  ExpertiseModel,
  OffshoringServicesModel,
} = require("../model");
const Response = require("./Response");

class LandingPages extends Response {
  getLandingPage = async (req, res) => {
    try {
      const landingPage = await LandingModel.find()
        .populate("intro")
        .populate("about")
        .populate("offshoreType")
        .populate("testimonial")
        .populate("expertise");

      if (!landingPage) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Landing page not found",
        });
      }

      const offshoringService = await OffshoringServicesModel.find().populate(
        "offshoreType"
      );

      let modified = landingPage[0].toObject();
      // let modified = landingPage;

      if (offshoringService) {
        modified.offshoreComparison = offshoringService;
      } else {
        modified.offshoreComparison = [];
      }

      return this.sendResponse(req, res, {
        status: 201,
        message: "Landing page retrieved successfully",
        data: modified,
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  addLandingPage = async (req, res) => {
    try {
      console.log("add", req.body);
      const { testimonials, expertises } = req.body;
      const introData = {
        heroDescription: req.body.heroDescription,
        footerDescription: req.body.footerDescription,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        socialLinks: req.body.socialLinks,
        workExperience: req.body.workExperience,
      };

      const aboutData = {
        description: req.body.aboutDescription,
      };
      // console.log("test", req.body?.testimonials[0]);

      const testimonialData = {
        image: req.body?.testimonials[0].img,
        fullName: req.body?.testimonials[0].name,
        description: req.body?.testimonials[0].description,
        designation: req.body?.testimonials[0].designation,
      };
      // console.log("exp", req.body?.expertises[0]);

      const expertiseData = {
        image: req.body?.expertises[0].expertisesImg,
        name: req.body?.expertises[0].expertiseName,
        description: req.body?.expertises[0]?.expertisesDescription,
      };

      // Create each document in the database
      const intro = new IntroModel(introData);
      const about = new AboutModel(aboutData);
      // const testimonial = new TestimonialModel(testimonialData);
      // const expertise = new ExpertiseModel(expertiseData);

      // Save all documents to the database
      await Promise.all([
        intro.save(),
        about.save(),
        // testimonial.save(),
        // expertise.save(),
      ]);

      // Now that we have all IDs, create the Landing Page
      const landingPage = new LandingModel({
        intro: intro._id,
        about: about._id,
        testimonial: testimonials,
        expertise: expertises,
        // testimonial: testimonial._id,
        // expertise: expertise._id,
      });
      await landingPage.save();

      // Populate the references to return complete data
      const populatedLandingPage = await LandingModel.findById(
        landingPage._id
      ).populate("intro about offshoreType testimonial expertise");

      return this.sendResponse(req, res, {
        message: "Landing page created successfully",
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
  updateLandingPage = async (req, res) => {
    try {
      const landingPageId = req.params.id;

      // Check if landing page exists
      const existingLandingPage = await LandingModel.findById(landingPageId);
      if (!existingLandingPage) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Landing page not found",
        });
      }

      // Update intro if data is provided
      if (
        req.body.heroDescription ||
        req.body.footerDescription ||
        req.body.email ||
        req.body.phone ||
        req.body.address ||
        req.body.socialLinks ||
        req.body.workExperience
      ) {
        const introUpdateData = {};
        if (req.body.heroDescription)
          introUpdateData.heroDescription = req.body.heroDescription;
        if (req.body.footerDescription)
          introUpdateData.footerDescription = req.body.footerDescription;
        if (req.body.email) introUpdateData.email = req.body.email;
        if (req.body.phone) introUpdateData.phone = req.body.phone;
        if (req.body.address) introUpdateData.address = req.body.address;
        if (req.body.socialLinks)
          introUpdateData.socialLinks = req.body.socialLinks;
        if (req.body.workExperience)
          introUpdateData.workExperience = req.body.workExperience;

        await IntroModel.findByIdAndUpdate(
          existingLandingPage.intro._id,
          introUpdateData,
          { new: true }
        );
      }

      // Update about if data is provided
      if (req.body.aboutDescription) {
        await AboutModel.findByIdAndUpdate(
          existingLandingPage.about._id,
          {
            description: req.body.aboutDescription,
          },
          { new: true }
        );
      }

      // Extract the fields to update from the request body
      const { testimonials, expertises } = req.body;

      existingLandingPage.testimonial =
        testimonials || existingLandingPage?.testimonial;
      existingLandingPage.expertise =
        expertises || existingLandingPage.expertise;

      const updatedData = await existingLandingPage.save();

      // Respond with success message
      return this.sendResponse(req, res, {
        status: 200,
        message: "Landing page updated successfully",
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
module.exports = { LandingPages };
