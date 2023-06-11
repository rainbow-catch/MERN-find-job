import "../styles/style.css";
import "../styles/Header.css";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import AddOfferModal from "./AddOfferModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ShowApplicationsModal from "./ShowApplicationsModal";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [showShowApplicationsModal, setShowShowApplicationsModal] =
    useState(false);
  const { loggedUser, handleLogout }: ContextsType = useContext(Contexts);
  return (
    <div>
      <div id="upperNavbar">
        <img
          className="jobSearchLogo"
          src="https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/job-search-logo-white.png"
          alt="logo"
        ></img>
        <div className="headerButtonsDiv">
          {loggedUser.email === "" ? (
            <span></span>
          ) : (
            <div className="headerButtonsAfterLoginDiv">
              <Button
                className="headerButton"
                onClick={() => setShowShowApplicationsModal(true)}
              >
                Show Applications
              </Button>
              <Button
                className="headerButton"
                onClick={() => setShowAddOfferModal(true)}
              >
                Add Offer
              </Button>
            </div>
          )}
          {loggedUser.email === "" ? (
            <Button
              className="headerButton"
              id="loginButton"
              onClick={() => setShowLoginModal(true)}
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
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      ></LoginModal>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      ></RegisterModal>
      <AddOfferModal
        show={showAddOfferModal}
        onHide={() => setShowAddOfferModal(false)}
      ></AddOfferModal>
      <ShowApplicationsModal
        show={showShowApplicationsModal}
        onHide={() => setShowShowApplicationsModal(false)}
      ></ShowApplicationsModal>
    </div>
  );
}

export default Header;
