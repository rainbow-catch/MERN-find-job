import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import { Application } from "./types/Application";

const ShowApplicationsModal = (props: any) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const loggedCompany = props.loggedCompany;
  const loggedAsAdmin = props.loggedAsAdmin;

  //getting data from db
  useEffect(() => {
    fetch("http://localhost:8888/getApplications")
      .then((res) => res.json())
      .then((jsonRes) => {
        setApplications(jsonRes);
      });
  }, []);

  const filterApplications = () => {
    const newArr: Application[] = [];
    applications.forEach((application) => {
      if (
        application.company_name === loggedCompany ||
        loggedAsAdmin === true
      ) {
        newArr.push(application);
      }
    });
    return newArr;
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Applications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="applicationsOutputDiv">
          {filterApplications().map((application) => {
            return (
              <div key={application._id}>
                <p>
                  Application for company:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {application.company_name}
                  </span>
                </p>
                <div className="applicationOutputLogoDiv">
                  <img alt="job_company_image" src={application.logo}></img>
                  <div>
                    <h5 style={{ fontWeight: "bold" }}>Job info:</h5>
                    <p>{application.ad_content}</p>
                    <p>Seniority: {application.seniority}</p>
                    <p>Technologies: {application.technologies}</p>
                  </div>
                </div>
                <p>Name: {application.firstName}</p>
                <p>Lastname: {application.lastName}</p>
                <p>e-mail: {application.email}</p>
                <p>
                  CV: <a href={application.cv}>Download CV</a>
                </p>
                <br></br>
                <hr></hr>
                <br></br>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowApplicationsModal;
