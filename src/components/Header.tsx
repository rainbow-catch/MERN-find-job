import "../styles/style.css";
import "../styles/Header.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddOfferModal from "./AddOfferModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
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
  const loggedCompany: string = loggedUser.company_name;
  const loggedCompanyLogo: string = loggedUser.logo;
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
