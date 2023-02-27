const route = require("express").Router();
const { Case_Study } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Case_Study.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Case_Study.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Case Study not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.ref_id)
    return setResponse(res, "Project is required", null, 405);
  if (!ObjectId.isValid(req.body.ref_id))
    return setResponse(res, "Invalid ID", null, 405);
  // if (!req.body.overview)
  //   return setResponse(res, "Overview is required", null, 405);
  // if (!req.body.challenge_short)
  //   return setResponse(
  //     res,
  //     "Challenge short description is required",
  //     null,
  //     405
  //   );
  // if (!req.body.challenge_long)
  //   return setResponse(
  //     res,
  //     "Challenge long description is required",
  //     null,
  //     405
  //   );
  // if (!req.body.how_it_work || req.body.how_it_work.length === 0)
  //   return setResponse(res, "Please describe how it works?", null, 405);
  // if (!req.body.core_features || req.body.core_features.length === 0)
  //   return setResponse(res, "Please describe core features?", null, 405);
  // if (!req.body.technologies || req.body.technologies.length === 0)
  //   return setResponse(res, "Please describe technologies used?", null, 405);
  // if (!req.body.team_members || req.body.team_members.length === 0)
  //   return setResponse(
  //     res,
  //     "Please define team members in development phase?",
  //     null,
  //     405
  //   );
  // for (let i of req.body.technologies) {
  //   if (!ObjectId.isValid(i)) return setResponse(res, "Invalid ID", null, 405);
  // }
  // for (let i of req.body.team_members) {
  //   if (!ObjectId.isValid(i)) return setResponse(res, "Invalid ID", null, 405);
  // }
  try {
    const ref_id = req.body.ref_id || "";
    const overview = req.body.overview || "";
    const technologies = req.body.technologies || [];
    const challenge_short = req.body.challenge_short || "";
    const challenge_long = req.body.challenge_long || "";
    const how_it_work = req.body.how_it_work || [];
    const core_features = req.body.core_features || [];
    const team_members = req.body.team_members || [];
    const newCase_Study = new Case_Study({
      ref_id,
      overview,
      technologies,
      challenge_short,
      challenge_long,
      how_it_work,
      core_features,
      team_members,
    });
    const response = await newCase_Study.save();
    return setResponse(res, "Case Study Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.ref_id)
    return setResponse(res, "Project is required", null, 405);
  // if (!ObjectId.isValid(req.body.ref_id))
  //   return setResponse(res, "Invalid ID", null, 405);
  // if (!req.body.overview)
  //   return setResponse(res, "Overview is required", null, 405);
  // if (!req.body.challenge_short)
  //   return setResponse(
  //     res,
  //     "Challenge short description is required",
  //     null,
  //     405
  //   );
  // if (!req.body.challenge_long)
  //   return setResponse(
  //     res,
  //     "Challenge long description is required",
  //     null,
  //     405
  //   );
  // if (!req.body.how_it_work || req.body.how_it_work.length === 0)
  //   return setResponse(res, "Please describe how it works?", null, 405);
  // if (!req.body.core_features || req.body.core_features.length === 0)
  //   return setResponse(res, "Please describe core features?", null, 405);
  // if (!req.body.technologies || req.body.technologies.length === 0)
  //   return setResponse(res, "Please describe technologies used?", null, 405);
  // if (!req.body.team_members || req.body.team_members.length === 0)
  //   return setResponse(
  //     res,
  //     "Please define team members in development phase?",
  //     null,
  //     405
  //   );
  for (let i of req.body.technologies) {
    if (!ObjectId.isValid(i)) return setResponse(res, "Invalid ID", null, 405);
  }
  for (let i of req.body.team_members) {
    if (!ObjectId.isValid(i)) return setResponse(res, "Invalid ID", null, 405);
  }
  try {
    const ref_id = req.body.ref_id || "";
    const overview = req.body.overview || "";
    const technologies = req.body.technologies || [];
    const challenge_short = req.body.challenge_short || "";
    const challenge_long = req.body.challenge_long || "";
    const how_it_work = req.body.how_it_work || [];
    const core_features = req.body.core_features || [];
    const team_members = req.body.team_members || [];
    const myBody = {
      ref_id,
      overview,
      technologies,
      challenge_short,
      challenge_long,
      how_it_work,
      core_features,
      team_members,
    };
    const response = await Case_Study.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Case Study Updated", response, 200);
    return setResponse(res, "Case Study not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Case_Study.deleteOne({
      ref_id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Case Study Deleted", response, 200);
    return setResponse(res, "Case Study not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
