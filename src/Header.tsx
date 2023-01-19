import { useState } from "react";
import { Button } from "react-bootstrap";
import AddOfferModal from "./AddOfferModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal"
import "./style.css";
import ShowApplicationsModal from "./ShowApplicationsModal";

function Header(props:any) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [showShowApplicationsModal, setShowShowApplicationsModal] =
    useState(false);
  const loggedCompany = props.loggedUser.company_name;
  const loggedCompanyLogo = props.loggedUser.logo;
  return (
    <div id="upperNavbar">
      <img
        className="jobSearchLogo"
        src="https://gitlab.com/krvkson/job_search/-/raw/main/src/img/job-search-low-resolution-logo-color-on-transparent-background.png"
        alt="logo"
      ></img>
      {props.loggedUser.email === "" ? (
        <span></span>
      ) : (
        <div id="loggedUserInfo">
          <p className="purpleColor">Logged as {props.loggedUser.email}</p>
        </div>
      )}

      <div></div>
      <div className="headerButtonsDiv">
        {props.loggedUser.email === "" ? (
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
        {props.loggedUser.email === "" ? (
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
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
        {props.loggedUser.email === "" ? (
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
      
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        setLoggedUser={props.setLoggedUser}
        setLoggedAsAdmin={props.setLoggedAsAdmin}
      ></LoginModal>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        setLoggedUser={props.setLoggedUser}
        setLoggedAsAdmin={props.setLoggedAsAdmin}
      ></RegisterModal>
      <AddOfferModal
        loggedCompany={loggedCompany}
        loggedCompanyLogo={loggedCompanyLogo}
        loggedAsAdmin={props.loggedAsAdmin}
        show={showAddOfferModal}
        onHide={() => setShowAddOfferModal(false)}
      ></AddOfferModal>
      <ShowApplicationsModal
        loggedCompany={loggedCompany}
        loggedAsAdmin={props.loggedAsAdmin}
        show={showShowApplicationsModal}
        onHide={() => setShowShowApplicationsModal(false)}
      ></ShowApplicationsModal>
    </div>
  );
}

export default Header;
