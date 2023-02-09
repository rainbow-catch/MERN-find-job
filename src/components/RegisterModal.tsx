import { FormEvent, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function RegisterModal(props: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [validated, setValidated] = useState(true);
  const [shake, setShake] = useState(false);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  const registerSubmit = (e: HTMLFormElement | FormEvent) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      startShake();
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      axios
        .post("http://localhost:8888/register", {
          email,
          password,
          companyName,
          logo,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            setHeaderMessage("Registration request sent!");
            setMessage(
              `Successfully sended registration request. \n Wait for reply`
            );
            setEmail("");
            setPassword("");
            setCompanyName("");
            setLogo("");
            setAlertModalShow(true);
            window.localStorage.setItem("token", res.data.data);
          } else {
            setMessage("Bad login or password!");
            setHeaderMessage("Can't Registered!");
            setAlertModalShow(true);
          }
        });
    };
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create company account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          id="registerform"
          onSubmit={registerSubmit}
        >
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="EmailInput"
              value={email}
              id="EmailInput"
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email address
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="text">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={password}
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              type="password"
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Full Company Name</Form.Label>
            <Form.Control
              required
              value={companyName}
              id="CompanyNameInput"
              onChange={(event) => setCompanyName(event.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter your full company name"
              name="CompanyNameInput"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your company name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Full Company Name</Form.Label>
            <Form.Control
              required
              value={logo}
              id="LogoInput"
              onChange={(event) => setLogo(event.target.value)}
              className="form-control"
              type="url"
              placeholder="Enter your company logo link"
              name="LogoInput"
            />
            <Form.Control.Feedback type="invalid">
              Please paste your company logo image link
            </Form.Control.Feedback>
          </Form.Group>
          <div className="form-group form-check"></div>
          <Button className={shake ? "shake" : ""} type="submit">Send Registration request</Button>
        </Form>
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
    </Modal>
  );
}
export default RegisterModal;
