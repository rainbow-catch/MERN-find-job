import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";

function LoginModal(props: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);

  const loginSubmit = (e: any) => {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:8888/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          setHeaderMessage("Logged in!");
          setMessage(`Successfully logged as ${email}`);
          props.setloggeduser((prev: any) => {
            return {
              ...prev,
              email: email,
              company_name: data.company_name,
              logo: data.logo,
            };
          });
          if (email === "admin@admin.com") {
            props.setloggedasadmin(true);
          }
          setEmail("");
          setPassword("");
          console.log(email);
          setAlertModalShow(true);
          window.localStorage.setItem("token", data.data);
        } else {
          setMessage("Bad login or password!");
          setHeaderMessage("Can't Login!");
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
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="loginform" onSubmit={loginSubmit}>
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
          </div>
          <div className="form-group form-check"></div>
          <button type="submit" className="btn btn-primary">
            Login
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
export default LoginModal;
