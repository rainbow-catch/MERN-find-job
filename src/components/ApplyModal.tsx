import "../styles/ApplyModal.css";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";
import { DisplayOffer } from "../types/DisplayOffer";
import { renderSeniority } from "../functions/renderSeniority";
import { Application } from "../types/Application";
import { ApplyForm } from "../types/ApplyForm";
import { checkFormValidity } from "../functions/checkFormValidity";

function ApplyModal(props: any) {
  const [message, setMessage] = useState("Successfully applied new job offer!");
  const [headerMessage] = useState("You've applied for a job offer!");
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [jobOfferForApply, setJobOfferForApply] = useState<DisplayOffer>({
    id_: "string",
    company_name: "string",
    days_ago: "string",
    contract_types: "string",
    country: "string",
    ad_content: "string",
    job_type: "string",
    seniority: "string",
    technology_1: "string",
    technology_2: "string",
    technology_3: "string",
    salary: "string",
    description: "string",
    about_us: "string",
    logo: "",
    isDescriptionVisible: false,
    frontendId: 0,
  });

  const [application, setApplication] = useState<ApplyForm>({
    firstName: "",
    lastName: "",
    email: "",
    cv: "",
  });
  const [cv, setCv] = useState("");

  const [shake, setShake] = useState(false);
  const [placeHoldersVisibility, setPlaceHoldersVisibility] = useState<
    boolean[]
  >([]);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  useEffect(() => {
    setJobOfferForApply(props.jobofferforapply);
  }, [props]);

  const sendApplication = (e: HTMLFormElement | FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", cv);
    data.append("upload_preset", "job-search");
    data.append("cloud_name", "dyqgdjrr1");
    axios
      .post("https://api.cloudinary.com/v1_1/dyqgdjrr1/raw/upload", data)
      .then((res) => {
        const applicationToSend: Application = {
          _id: "",
          firstName: application.firstName,
          lastName: application.lastName,
          email: application.email,
          cv: res.data.url,
          company_name: jobOfferForApply.company_name,
          ad_content: jobOfferForApply.ad_content,
          logo: jobOfferForApply.logo,
          seniority: jobOfferForApply.seniority,
          technologies: `${jobOfferForApply.technology_1}\n ${jobOfferForApply.technology_2}\n ${jobOfferForApply.technology_3}`,
        };
        axios
          .post("http://localhost:8888/sendApplication", applicationToSend)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setMessage(
          `Successfully applied to ${jobOfferForApply.company_name} as ${jobOfferForApply.ad_content}`
        );
        setAlertModalShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setApplication((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Apply for {jobOfferForApply.ad_content}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="apply-header">
          <div>
            <img
              className="apply-header-logo"
              src={jobOfferForApply.logo}
              alt="companyImage"
            ></img>
          </div>
          <div>
            <h4 className="apply-header-company-name">
              {jobOfferForApply.company_name}
            </h4>
            <h5 className="apply-header-description">
              <p>You are going to apply for a job offer: </p>
              <p>{jobOfferForApply.ad_content}</p>
            </h5>
            <div className="apply-header-side-description">
              <p>{renderSeniority(jobOfferForApply.seniority)}</p>
              <p>💰 {jobOfferForApply.salary}</p>
              <p>{jobOfferForApply.country}</p>
            </div>
          </div>
        </section>
        <form id="applyform" onSubmit={sendApplication}>
          <div className="form-section">
            <input
              required
              type="text"
              className="form-input"
              name="firstName"
              onChange={handleChange}
              value={application.firstName}
              placeholder={placeHoldersVisibility[0] ? "Enter your Name" : ""}
              onFocus={() => {
                const newArr = [...placeHoldersVisibility];
                newArr[0] = true;
                setPlaceHoldersVisibility(newArr);
              }}
              onBlur={() => {
                setPlaceHoldersVisibility([]);
              }}
            />
            <label htmlFor="EmailInput" className="input-label">
              <span className="label-name">Name</span>
            </label>
          </div>
          <div className="form-section">
            <input
              required
              type="text"
              className="form-input"
              name="lastName"
              onChange={handleChange}
              value={application.lastName}
              placeholder={
                placeHoldersVisibility[1] ? "Enter your Lastname" : ""
              }
              onFocus={() => {
                const newArr = [...placeHoldersVisibility];
                newArr[1] = true;
                setPlaceHoldersVisibility(newArr);
              }}
              onBlur={() => {
                setPlaceHoldersVisibility([]);
              }}
            />
            <label htmlFor="EmailInput" className="input-label">
              <span className="label-name">Lastname</span>
            </label>
          </div>
          <div className="form-section">
            <input
              required
              type="email"
              className={
                application.email === ""
                  ? "form-input"
                  : "form-input form-input-filled"
              }
              name="email"
              onChange={handleChange}
              value={application.email}
              placeholder={
                placeHoldersVisibility[2] ? "Enter your email address" : ""
              }
              onFocus={() => {
                const newArr = [...placeHoldersVisibility];
                newArr[2] = true;
                setPlaceHoldersVisibility(newArr);
              }}
              onBlur={() => {
                setPlaceHoldersVisibility([]);
              }}
            />
            <label htmlFor="EmailInput" className="input-label">
              <span className="label-name">Email Address</span>
            </label>
          </div>
          <Form.Group controlId="file">
            <Form.Label className="cv-description">CV</Form.Label>
            <Form.Control
              required
              name="cv"
              onChange={(e: any) => {
                setCv(e.target.files[0]);
              }}
              className="cv-file-input"
              type="file"
            />
          </Form.Group>
          <div className="form-group form-check"></div>
          <button
            type="submit"
            className={
              shake ? "shake" : "gradient-button submit-button btn btn-primary"
            }
            onClick={() => {
              const { firstName, lastName, email } = application;
              if (
                !checkFormValidity({firstName, lastName, email, cv})
              ) {
                startShake();
              }
            }}
          >
            Apply
          </button>
        </form>
        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            props.onHide();
          }}
          message={message}
          headermessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
export default ApplyModal;
