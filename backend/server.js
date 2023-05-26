const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const url =
  "mongodb+srv://readwrite:<password>@cluster0.viapohm.mongodb.net/job-search?retryWrites=true&w=majority";
const port = process.env.PORT || 8888;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const csvtojson = require("csvtojson");
mongoose.connect(url);
//const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "wedddrftwefe3425gtwvr31f254gvtweqr23d41f2g4v";

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

const dbModel = mongoose.model("dbModel", dbSchema, "offers");
const userModel = mongoose.model("userModel", userSchema, "users");
const Offer = mongoose.model("Offer", offerSchema, "offers");
const registrationRequestModel = mongoose.model(
  "registrationRequestModel",
  registrationRequestSchema,
  "registrationRequests"
);
const Application = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);

const clearDatabase = () => {
  dbModel.deleteMany({}).then(() => {
    console.log("deleted all offers");
  });
  const csvFilePath = "csv/offersv3Format.csv";
  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.forEach((el) => {
        const offerToAdd = new dbModel({
          id_: el.id,
          company_name: el.company_name,
          days_ago: el.days_ago,
          contract_types: el.contract_types,
          country: el.country,
          ad_content: el.ad_content,
          job_type: el.job_type,
          seniority: el.seniority,
          technology_1: el.technology_1,
          technology_2: el.technology_2,
          technology_3: el.technology_3,
          salary: el.salary,
          description: el.description,
          about_us: el.about_us,
          logo: el.logo,
        });
        offerToAdd
          .save()
          .catch((err) => console.log(err));
      });
    });
};

app.listen(port, () => {
  console.log(`server started at ${port}!`);
  clearDatabase();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/read", (req, res) => {
  dbModel.find({}, (err, data) => {
    res.render("read", {
      dataList: data,
    });
  });
});

app.get("/sendToFront", (req, res) => {
  dbModel
    .find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/getApplications", (req, res) => {
  Application.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const user = await userModel.findOne({ email: email }).exec();
  console.log(email);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if ((await password) === user.password) {
    if ((await email) === Object.values(user)[2].email) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({
          status: "ok",
          data: token,
          company_name: user.company_name,
          logo: user.logo,
        });
      } else {
        return res.json({ error: "error" });
      }
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password, companyName, logo } = req.body;
  console.log(email);
  console.log(password);
  console.log(companyName);
  console.log(logo);
  const newRegistrationRequest = new registrationRequestModel({
    email: req.body.email,
    password: req.body.password,
    company_name: req.body.companyName,
    logo: req.body.logo,
  });
  newRegistrationRequest
    .save()
    .then((doc) => {
      console.log(doc);
      if (res.status(201)) {
        return res.json({
          status: "ok",
        });
      } else {
        return res.json({ error: "error" });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  const newOffer = new Offer({
    company_name: req.body.company_name,
    days_ago: Date.now().toString(),
    contract_types: req.body.contract_types,
    country: req.body.country,
    ad_content: req.body.ad_content,
    job_type: req.body.job_type,
    seniority: req.body.seniority,
    technology_1: req.body.technology_1,
    technology_2: req.body.technology_2,
    technology_3: req.body.technology_3,
    salary: req.body.salary,
    description: req.body.description,
    about_us: req.body.about_us,
    logo: req.body.logo,
  });
  newOffer
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.post("/sendApplication", (req, res) => {
  const newApplication = new Application({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cv: req.body.cv,
    company_name: req.body.company_name,
    ad_content: req.body.ad_content,
    logo: req.body.logo,
    seniority: req.body.seniority,
    technologies: req.body.technologies,
  });
  newApplication
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.delete("/removeOffer/:id", (req, res) => {
  console.log(req.params);
  dbModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.get("/removeOffer/:id", (req, res) => {
  console.log(req.params);
  dbModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
