const { ObjectId } = require("mongodb");
const dbSchema = {
  id_: ObjectId,
  company_name: String,
  days_ago: String,
  contract_types: String,
  country: String,
  ad_content: String,
  job_type: String,
  seniority: String,
  technology_1: String,
  technology_2: String,
  technology_3: String,
  salary: String,
  description: String,
  about_us: String,
  logo: String,
};

const offerSchema = {
  company_name: String,
  days_ago: String,
  contract_types: String,
  country: String,
  ad_content: String,
  job_type: String,
  seniority: String,
  technology_1: String,
  technology_2: String,
  technology_3: String,
  salary: String,
  description: String,
  about_us: String,
  logo: String,
};

const userSchema = {
  id_: ObjectId,
  email: String,
  password: String,
  company_name: String,
  logo: String,
};
const registrationRequestSchema = {
  id_: ObjectId,
  email: String,
  password: String,
  company_name: String,
  logo: String,
};

const applicationSchema = {
  id_: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  cv: String,
  company_name: String,
  ad_content: String,
  logo: String,
  seniority: String,
  technologies: String,
};

module.exports ={dbSchema, offerSchema, userSchema, registrationRequestSchema, applicationSchema}