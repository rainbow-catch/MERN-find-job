import "./styles/ApplyModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";
import { DisplayOffer } from "./types/DisplayOffer";

function ApplyModal(props: any) {
  const [message] = useState("Successfully applied new job offer!");
  const [headerMessage] = useState("Successfully applied to offer!");
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

  const [application, setApplication] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cv: "",
  });
  const [cv, setCv] = useState("");

  const [validated, setValidated] = useState(true);
  const [shake, setShake] = useState(false);
  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  useEffect(() => {
    setJobOfferForApply(props.jobofferforapply);
  }, [props]);

  const sendApplication = (e: HTMLFormElement | FormEvent) => {
    console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      startShake();
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const data = new FormData();
      data.append("file", cv);
      data.append("upload_preset", "job-search");
      data.append("cloud_name", "dyqgdjrr1");
      fetch("https://api.cloudinary.com/v1_1/dyqgdjrr1/raw/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const applicationToSend = {
            firstName: application.firstName,
            lastName: application.lastName,
            email: application.email,
            cv: data.url,
            company_name: props.jobofferforapply.company_name,
            ad_content: props.jobofferforapply.ad_content,
            logo: props.jobofferforapply.logo,
            seniority: props.jobofferforapply.seniority,
            technologies: `${props.jobofferforapply.technology_1}\n ${props.jobofferforapply.technology_2}\n ${props.jobofferforapply.technology_3}`,
          };
          console.log(applicationToSend);
          axios
            .post("http://localhost:8888/sendApplication", applicationToSend)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          setAlertModalShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e: any) => {
    console.log(e);
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
      size="lg"
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
          </div>
        </section>
        <Form noValidate validated={validated} onSubmit={sendApplication}>
          <Form.Group controlId="text">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              required
              name="firstName"
              value={application.firstName}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Enter your firstname"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your firstname
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              required
              name="lastName"
              value={application.lastName}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Enter your lastname"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your lastname
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              name="email"
              value={application.email}
              onChange={handleChange}
              className="inputWidth"
              type="email"
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>CV</Form.Label>
            <Form.Control
              required
              name="cv"
              onChange={(e: any) => {
                setCv(e.target.files[0]);
              }}
              className="inputWidth"
              type="file"
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              Please upload your CV
            </Form.Control.Feedback>
          </Form.Group>
          <br></br>
          <Button className={shake ? "shake" : ""} type="submit">
            Apply
          </Button>
        </Form>
        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            props.onHide();
          }}
          message={message}
          headerMessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
export default ApplyModal;
