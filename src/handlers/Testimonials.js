
const { TestimonialModel } = require("../model/Testimonial");
const Response = require("./Response");

class Testimonials extends Response {
  createTestimonials = async (req, res) => {
    try {
      const {
        image,
        fullName,
        description,
        designation
      } = req.body;

      if (
        !fullName ||
        !description ||
        !designation 
      ) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      let newData = new TestimonialModel({
        image,
        fullName,
        description,
        designation
      });
      await newData.save();

      return this.sendResponse(req, res, {
        status: 200,
        message: "Testimonials created successfully",
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

  updateTestimonials = async (req, res) => {
    try {
      const {
        image,
        fullName,
        description,
        designation
      } = req.body;

      if (
        !fullName ||
        !description ||
        !designation 
      ) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Data Incomplete",
        });
      }

      const updatedTestimonials = await TestimonialModel.findOneAndUpdate(
        {},
        {
          $set: {
            image,
            fullName,
            description,
            designation
          },
        },
        { new: true }
      );

      if (!updatedTestimonials) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Testimonial not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        message: "Testimonial updated successfully",
        data: updatedTestimonials,
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

module.exports = { Testimonials };
