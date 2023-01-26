import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FormEvent, useState } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";

function ApplyModal(props: any) {
  const [message] = useState("Successfully applied new job offer!");
  const [headerMessage] = useState("Successfully applied to offer!");
  const [alertModalShow, setAlertModalShow] = useState(false);

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
  //TODO: implement necessity fields in applyForm

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
            company_name: props.applyingJobOffer.company_name,
            ad_content: props.applyingJobOffer.ad_content,
            logo: props.applyingJobOffer.logo,
            seniority: props.applyingJobOffer.seniority,
            technologies: `${props.applyingJobOffer.technology_1}\n ${props.applyingJobOffer.technology_2}\n ${props.applyingJobOffer.technology_3}`,
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
          Apply TODO: What offer etc
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
