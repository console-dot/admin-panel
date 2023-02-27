const Schema = require("mongoose").Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const customerSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  logo: {
    type: ObjectId,
    required: false,
  },
  contact_info: {
    type: String,
    required: true,
  },
});

const fileSchema = Schema({
  file_code: {
    type: Buffer,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
});

const projectSchema = Schema({
  customer_id: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  hero: {
    type: ObjectId,
    required: true,
  },
});

const caseStudySchema = Schema({
  ref_id: {
    type: ObjectId,
    required: true,
  },
  overview: {
    type: String,
    required: false,
  },
  technologies: {
    type: Array,
    required: false,
  },
  challenge_short: {
    type: String,
    required: false,
  },
  challenge_long: {
    type: String,
    required: false,
  },
  how_it_work: {
    type: Array,
    required: false,
  },
  core_features: {
    type: Array,
    required: false,
  },
  team_members: {
    type: Array,
    required: false,
  },
});

const productCategorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
});

const technologyCategorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
});

const technologySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    required: true,
  },
  hero: {
    type: String,
    required: true,
  },
});

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    required: true,
  },
  hero: {
    type: String,
    required: true,
  },
});

const departmentSchema = Schema({
  title: {
    type: String,
    required: true,
  },
});

const citySchema = Schema({
  title: {
    type: String,
    required: true,
  },
});

const careerSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  positions: {
    type: String,
    required: true,
  },
  department: {
    type: ObjectId,
    required: true,
  },
  city: {
    type: ObjectId,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const applicationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  job_ref: {
    type: String,
    required: true,
  },
  cv_ref: {
    type: ObjectId,
    required: true,
  },
});

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = {
  customerSchema,
  fileSchema,
  projectSchema,
  caseStudySchema,
  productCategorySchema,
  technologyCategorySchema,
  technologySchema,
  productSchema,
  careerSchema,
  applicationSchema,
  citySchema,
  departmentSchema,
  userSchema,
  default: {
    customerSchema,
    fileSchema,
    projectSchema,
    caseStudySchema,
    productCategorySchema,
    technologyCategorySchema,
    technologySchema,
    productSchema,
    careerSchema,
    applicationSchema,
    citySchema,
    departmentSchema,
    userSchema,
  },
};
