import "../styles/JobBarElement.css";
import Papa from "papaparse";
import { Fade } from "react-reveal";
import { renderSeniority } from "../functions/renderSeniority";
import { renderTime } from "../functions/renderTime";
import { DisplayOffer } from "../types/DisplayOffer";
import { JobsContextType } from "../types/JobsContextType";
import { useContext } from "react";
import { Contexts } from "../contexts/Contexts";
export default function JobBarElement({
  job,
  setapplymodalshow,
  setjobofferforapply,
  setremoveoffermodalshow,
  loggeduser,
}: any) {
  const { jobs, overwriteJobs }: JobsContextType = useContext(Contexts);
  return (
    <div
      key={job.id_}
      className="jobBarElement"
      onClick={() => {
        const newJobs = jobs;
        const newJob = newJobs.find(
          (el: DisplayOffer) => el.frontendId === job.frontendId
        );
        if (newJob) {
          newJob.isDescriptionVisible = true;
          overwriteJobs([...newJobs]);
        }
      }}
    >
      <Fade duration={1200}>
        <div className="jobHeaderInfo">
          <div className="iconDiv">
            <img className="icon" src={job.logo} alt="companyImage" />
          </div>
          <div className="description">
            <h2 className="companyName">{job.company_name}</h2>
            <p className="jobTitle">{job.ad_content}</p>
          </div>
        </div>
        <Fade bottom distance={"20px"}>
          <div className="jobSideInfoContainer">
            <hr></hr>
            <p className="seniority">
              {job.seniority}
              <span> {renderSeniority(job.seniority)}</span>
            </p>
            <div className="techStackInfo">
              <h4>Tech Stack ➼</h4>
              <p className="jobSideInfo">
                {job.technology_1} • {job.technology_2} • {job.technology_3}
              </p>
            </div>
            <div>
              <p className="salary">💰💰 {job.salary}</p>
            </div>
            <p className="jobSideInfo">
              {renderTime(job.days_ago)} ago - {job.contract_types} -{" "}
              {job.job_type}
            </p>
            <div className="jobCountry techStackInfo">
              <h4>Localization: </h4>
              <span className="jobSideInfo">{job.country}</span>
            </div>
            <div className="jobOfferDescription">
              {job.isDescriptionVisible ? (
                <Fade bottom distance={"20px"} duration={1000}>
                  <hr></hr>
                  <br></br>
                  {Papa.parse(job.description).data.map(
                    (line: any, index: number) => {
                      return <p key={index}>{line}</p>;
                    }
                  )}
                  {loggeduser === "" ? (
                    <div className="applyButtonDiv">
                      <button
                        onClick={() => {
                          setapplymodalshow(true);
                          setjobofferforapply(job);
                        }}
                        className="applyButton"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="applyButtonDiv">
                      <button
                        className="applyButton"
                        onClick={() => {
                          setremoveoffermodalshow(true);
                          setjobofferforapply(job);
                        }}
                      >
                        Remove Offer
                      </button>
                      <button
                        onClick={() => {
                          setapplymodalshow(true);
                          setjobofferforapply(job);
                        }}
                        className="applyButton"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </Fade>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </Fade>
      </Fade>
    </div>
  );
}
