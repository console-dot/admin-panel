const { FAQModel } = require("../model");
const Response = require("./Response");

class Faq extends Response {
  getAllFaqs = async (req, res) => {
    try {
      const allFaqs = await FAQModel.find();

      return this.sendResponse(req, res, { status: 200, data: allFaqs[0] });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  createFaq = async (req, res) => {
    try {
      const faqData = req.body.data;

      const newFAQ = new FAQModel({ data: faqData });

      await newFAQ.save();

      return this.sendResponse(req, res, {
        status: 201,
        message: "Faq added successfully",
      });
    } catch (error) {
      console.error(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateFaq = async (req, res) => {
    try {
      const newData = req.body.data;
      const allFaqs = await FAQModel.find();
      console.log(allFaqs[0])
      const updatedFAQ = await FAQModel.findByIdAndUpdate(
        allFaqs[0]._id,
        { data: newData },
        { new: true }
      );

      if (!updatedFAQ) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "FAQ not found",
        });
      }

      return this.sendResponse(req, res, {
        status: 200,
        data: updatedFAQ,
        message: "FAQ updated successfully",
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
module.exports = { Faq };
