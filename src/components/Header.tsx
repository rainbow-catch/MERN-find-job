import "../styles/style.css";
import "../styles/Header.css";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import AddOfferModal from "./AddOfferModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { loggedUser, handleLogout }: ContextsType = useContext(Contexts);
  const navigate = useNavigate();
  return (
    <div>
      <div id="upperNavbar">
        <img
          className="jobSearchLogo"
          src="https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/job-search-logo-white.png"
          alt="logo"
        ></img>
        <div className="headerButtonsDiv" title="headerButtonsDiv">
          {loggedUser.email === "" ? (
            <span></span>
          ) : (
            <div className="headerButtonsAfterLoginDiv">
              <Button
                className="headerButton"
                title="showApplicationsButton"
                onClick={() => navigate("/applications")}
              >
                Show Applications
              </Button>
              <Button
                className="headerButton"
                title="showAddOfferModalButton"
                onClick={() => navigate("/addOffer")}
              >
                Add Offer
              </Button>
            </div>
          )}
          {loggedUser.email === "" ? (
            <Button
              className="headerButton"
              id="loginButton"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              className="headerButton"
              id="loginButton"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          )}
          {loggedUser.email === "" ? (
            <Button
              className="headerButton"
              id="registerButton"
              onClick={() => setShowRegisterModal(true)}
            >
              Register
            </Button>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div id="headerTextDiv">
        <h2>Find a job in IT</h2>
        {loggedUser.email === "" ? (
          <span></span>
        ) : (
          <div id="loggedUserInfo">
            <p className="loggedUserInfoText">
              Logged as{" "}
              <span className="loggedUserInfoTextCompanyName">
                {loggedUser.company_name}
              </span>
            </p>
          </div>
        )}
      </div>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      ></RegisterModal>
    </div>
  );
}

export default Header;
