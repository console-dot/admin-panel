const Schema = require("./Schema");
const Model = require("mongoose").model;

const Customer = Model("Customer", Schema.customerSchema);
const File = Model("File", Schema.fileSchema);
const Project = Model("Project", Schema.projectSchema);
const Case_Study = Model("Case_Study", Schema.caseStudySchema);
const Product_Category = Model(
  "Product_Category",
  Schema.productCategorySchema
);
const Technology_Category = Model(
  "Technology_Category",
  Schema.technologyCategorySchema
);
const Technology = Model("Technology", Schema.technologySchema);
const Product = Model("Product", Schema.productSchema);
const Career = Model("Career", Schema.careerSchema);
const City = Model("City", Schema.citySchema);
const Department = Model("Department", Schema.departmentSchema);
const Application = Model("Application", Schema.applicationSchema);
const User = Model("User", Schema.userSchema);

module.exports = {
  Customer,
  File,
  Project,
  Case_Study,
  Product_Category,
  Technology_Category,
  Technology,
  Product,
  Career,
  City,
  Department,
  Application,
  User,
};
