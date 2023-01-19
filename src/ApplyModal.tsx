import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";

function ApplyModal(props:any) {
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

  const sendApplication = (e:any) => {
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
          technologies: `${props.applyingJobOffer.technology_1}\n ${props.applyingJobOffer.technology_2}\n ${props.applyingJobOffer.technology_3}`
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
  };

  const handleChange = (e:any) => {
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
        <Modal.Title id="contained-modal-title-vcenter">Apply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br></br>
        <FormGroup>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            value={application.firstName}
            onChange={handleChange}
            className="inputWidth"
            type="text"
            placeholder="Enter your first name"
          />
          <br></br>

          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            value={application.lastName}
            onChange={handleChange}
            className="inputWidth"
            type="text"
            placeholder="Enter your last name"
          />
          <br></br>

          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={application.email}
            onChange={handleChange}
            className="inputWidth"
            type="text"
            placeholder="Enter your email"
          />
          <br></br>

          <label htmlFor="exampleFormControlFile1">Add CV</label>
          <br></br>
          <input
            onChange={(e:any) => {
              setCv(e.target.files[0]);
            }}
            name="cv"
            type="file"
            className="form-control-file"
            id="cvInput"
          ></input>
          <Button onClick={sendApplication}> Apply</Button>
        </FormGroup>
        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            window.location.reload();
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
