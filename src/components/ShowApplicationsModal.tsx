import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/style.css";
import { Application } from "../types/Application";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";
import { useNavigate } from "react-router-dom";

const ShowApplicationsModal = (props: any) => {
  const { applications, overwriteApplications }: ContextsType =
    useContext(Contexts);
  const [show, setShow] = useState(false);
  const { loggedAsAdmin, loggedUser }: ContextsType = useContext(Contexts);
  const loggedCompany = loggedUser.company_name;
  const navigate = useNavigate();
  //getting applications from db
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 20);
    axios.get(axiosUrls.getApplicationsUrl).then((res) => {
      overwriteApplications(res.data);
    }); // eslint-disable-next-line
  }, []);

  const filterApplications = () => {
    const newArr: Application[] = [];
    applications.forEach((application) => {
      if (application.company_name === loggedCompany || loggedAsAdmin) {
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
      show={show}
    >
      <Modal.Header
        closeButton
        onHide={() => {
          setShow(false);
          setTimeout(() => {
            navigate("/");
          }, 100);
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Applications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="applicationsOutputDiv" title="applicationsOutputDiv">
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
