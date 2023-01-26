import { useState } from "react";
import { Button } from "react-bootstrap";
import AddOfferModal from "./AddOfferModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "./styles/style.css";
import ShowApplicationsModal from "./ShowApplicationsModal";

function Header({
  setLoggedUser,
  loggedUser,
  loggedAsAdmin,
  setLoggedAsAdmin,
}: any) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [showShowApplicationsModal, setShowShowApplicationsModal] =
    useState(false);
  const loggedCompany = loggedUser.company_name;
  const loggedCompanyLogo = loggedUser.logo;
  return (
    <div id="upperNavbar">
      <img
        className="jobSearchLogo"
        src="https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/job-search-low-resolution-logo-color-on-transparent-background.png"
        alt="logo"
      ></img>
      {loggedUser.email === "" ? (
        <span></span>
      ) : (
        <div id="loggedUserInfo">
          <p className="purpleColor">Logged as {loggedUser.email}</p>
        </div>
      )}

      <div></div>
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
              window.location.reload();
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

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        setloggeduser={setLoggedUser}
        setloggedasadmin={setLoggedAsAdmin}
      ></LoginModal>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        setloggeduser={setLoggedUser}
        setloggedasadmin={setLoggedAsAdmin}
      ></RegisterModal>
      <AddOfferModal
        loggedcompany={loggedCompany}
        loggedcompanylogo={loggedCompanyLogo}
        loggedasadmin={loggedAsAdmin}
        show={showAddOfferModal}
        onHide={() => setShowAddOfferModal(false)}
      ></AddOfferModal>
      <ShowApplicationsModal
        loggedcompany={loggedCompany}
        loggedasadmin={loggedAsAdmin}
        show={showShowApplicationsModal}
        onHide={() => setShowShowApplicationsModal(false)}
      ></ShowApplicationsModal>
    </div>
  );
}

export default Header;
