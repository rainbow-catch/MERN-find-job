import { FormEvent, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import "../styles/LoginModal.css";
import axios from "axios";
import { checkFormValidity } from "../functions/checkFormValidity";

function LoginModal(props: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [placeHoldersVisibility, setPlaceHoldersVisibility] = useState<
    boolean[]
  >([]);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  const loginSubmit = (e: HTMLFormElement | FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/login", { email, password })
      .then((res) => {
        if (res.data.status === "ok") {
          setHeaderMessage("Logged in!");
          setMessage(`Successfully logged as ${email}`);
          props.setloggeduser((prev: object) => {
            return {
              ...prev,
              email: email,
              company_name: res.data.company_name,
              logo: res.data.logo,
            };
          });
          if (email === "admin@admin.com") {
            props.setloggedasadmin(true);
          }
          setEmail("");
          setPassword("");
          setAlertModalShow(true);
          window.localStorage.setItem("token", res.data.data);
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
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="login-form" onSubmit={loginSubmit}>
          <div className="form-section">
            <input
              required
              type="email"
              className={
                email === "" ? "form-input" : "form-input form-input-filled"
              }
              name="EmailInput"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder={
                placeHoldersVisibility[0]
                  ? "Enter your company email address"
                  : ""
              }
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
              <span className="label-name">Email Address</span>
            </label>
          </div>
          <div className="form-section">
            <input
              required
              type="password"
              name="PasswordInput"
              className="form-input"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder={
                placeHoldersVisibility[1] ? "Enter your password" : ""
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
            <label htmlFor="PasswordInput" className="input-label">
              <span className="label-name">Password</span>
            </label>
          </div>
          <div className="form-group form-check"></div>
          <button
            type="submit"
            className={
              shake ? "shake" : "gradient-button submit-button btn btn-primary"
            }
            onClick={() => {
              if (!checkFormValidity({email, password})) {
                startShake();
              }
            }}
          >
            Login
          </button>
        </form>
        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            if (headerMessage === "Logged in!") {
              props.onHide();
            }
          }}
          message={message}
          headermessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
    </Modal>
  );
}
export default LoginModal;
