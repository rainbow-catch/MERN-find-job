import "../../styles/style.css";
import "../../styles/Header.css";

function ErrorHeader() {
  return (
    <div>
      <div id="upperNavbar">
        <img
          className="jobSearchLogo"
          src="https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/job-search-logo-white.png"
          alt="logo"
        ></img>
      </div>
      <div id="headerTextDiv">
        <h2>Find a job in IT</h2>
      </div>
    </div>
  );
}

export default ErrorHeader;
