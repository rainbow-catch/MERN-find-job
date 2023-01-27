import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";

function RegisterModal(props:any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [passwordError] = useState("");
  const [emailError] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);

  const registerSubmit = (e:any) => {
    e.preventDefault();
    console.log(email, password, companyName, logo);
    fetch("http://localhost:8888/register", {
      method: "POST",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
        companyName,
        logo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          setHeaderMessage("Registration request sent!");
          setMessage(`Successfully sended registration request. \n Wait for reply`);
          
          setEmail("");
          setPassword("");
          setCompanyName("");
          setLogo("");
          console.log(email);
          setAlertModalShow(true);
          window.localStorage.setItem("token", data.data);
          //window.location.href = "./userDetails";
        } else {
          setMessage("Bad login or password!");
          setHeaderMessage("Can't Registered!");
          setAlertModalShow(true);
        }
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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="registerform" onSubmit={registerSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="EmailInput"
              name="EmailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
          </div>
          <div className="form-group">
            <label>Full Company Name</label>
            <input
              type="text"
              className="form-control"
              id="CompanyNameInput"
              name="CompanyNameInput"
              placeholder="Enter your full company name"
              onChange={(event) => setCompanyName(event.target.value)}
              value={companyName}
            />
          </div>
          <div className="form-group">
            <label>Company Logo Link</label>
            <input
              type="text"
              className="form-control"
              id="LogoInput"
              name="LogoInput"
              placeholder="Enter your company logo link"
              onChange={(event) => setLogo(event.target.value)}
              value={logo}
            />
          </div>
          <div className="form-group form-check"></div>
          <button type="submit" className="btn btn-primary">
            Send Registration Request
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
    </Modal>
  );
}
export default RegisterModal;
