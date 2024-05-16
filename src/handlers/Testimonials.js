const { TestimonialModel } = require("../model/Testimonial");
const Response = require("./Response");

class Testimonials extends Response {
  createTestimonials = async (req, res) => {
    try {
      const { image, fullName, description, designation } = req.body;

      if (!fullName || !description || !designation) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Data Incomplete",
        });
      }

      let newData = new TestimonialModel({
        image,
        fullName,
        description,
        designation,
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
      const { id } = req.params;
      const { image, fullName, description, designation } = req.body;

      const updatedTestimonials = await TestimonialModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            image,
            fullName,
            description,
            designation,
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

  deleteTestimonials = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTestimonial = await TestimonialModel.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "Testimonial not found",
        });
      }
      return this.sendResponse(req, res, {
        status: 200,
        message: "Testimonial deleted successfully",
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
