import "../styles/style.css";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Fade } from "react-reveal";
import ApplyModal from "./ApplyModal";
import Papa from "papaparse";
import RemoveOfferModal from "./RemoveOfferModal";
import { renderSeniority } from "../functions/renderSeniority";
import { DisplayOffer } from "../types/DisplayOffer";
import axios from "axios";

export default function JobBar(props: any) {
  //dbSchema
  const [jobs, setJobs] = useState<DisplayOffer[]>([]);

  //applyModalState
  const [applyModalShow, setApplyModalShow] = useState(false);

  //removeOfferModalState
  const [removeOfferModalShow, setRemoveOfferModalShow] = useState(false);

  //job offer applied for
  const [jobOfferForApply, setJobOfferForApply] = useState<DisplayOffer>({
    id_: "string",
    company_name: "string",
    days_ago: "string",
    contract_types: "string",
    country: "string",
    ad_content: "string",
    job_type: "string",
    seniority: "string",
    technology_1: "string",
    technology_2: "string",
    technology_3: "string",
    salary: "string",
    description: "string",
    about_us: "string",
    logo: "",
    isDescriptionVisible: false,
    frontendId: 0,
  });

  //dynamic job searching
  //filtering by search text function
  const filterJobs = (searchValue: string, searchTags: string) => {
    const filteredByInput = jobs.filter(
      (job) =>
        job.ad_content.toLowerCase().match(searchValue.toLowerCase()) ||
        job.company_name.toLowerCase().match(searchValue.toLowerCase()) ||
        job.contract_types.toLowerCase().match(searchValue.toLowerCase()) ||
        job.country.toLowerCase().match(searchValue.toLowerCase()) ||
        job.job_type.toLowerCase().match(searchValue.toLowerCase()) ||
        job.seniority.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_1.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_2.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_3.toLowerCase().match(searchValue.toLowerCase())
    );

    //filtering by confirmed tags
    //TODO: Rewrite it better :)
    let filteredByTags: any[] = [];
    if (searchTags.length > 0) {
      filteredByTags = jobs.filter(
        (job) =>
          job.ad_content.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.company_name.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.contract_types.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.country.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.job_type.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.seniority.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.technology_1.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.technology_2.toLowerCase().match(searchTags[0].toLowerCase()) ||
          job.technology_3.toLowerCase().match(searchTags[0].toLowerCase())
      );

      if (searchTags.length > 1) {
        filteredByTags = jobs.filter(
          (job) =>
            (job.ad_content.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[1].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_3.toLowerCase().match(searchTags[0].toLowerCase()))
        );
      }
      if (searchTags.length > 2) {
        filteredByTags = jobs.filter(
          (job) =>
            (job.ad_content.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[2].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[1].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_3.toLowerCase().match(searchTags[0].toLowerCase()))
        );
      }
      if (searchTags.length > 3) {
        filteredByTags = jobs.filter(
          (job) =>
            (job.ad_content.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[3].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[2].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[1].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_3.toLowerCase().match(searchTags[0].toLowerCase()))
        );
      }
      if (searchTags.length > 4) {
        filteredByTags = jobs.filter(
          (job) =>
            (job.ad_content.toLowerCase().match(searchTags[4].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[4].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[4].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[4].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[4].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[4].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[4].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[4].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[4].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[3].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[3].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[3].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[2].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[2].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[2].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[1].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[1].toLowerCase()) ||
              job.technology_3
                .toLowerCase()
                .match(searchTags[1].toLowerCase())) &&
            (job.ad_content.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.company_name
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.contract_types
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.country.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.job_type.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.seniority.toLowerCase().match(searchTags[0].toLowerCase()) ||
              job.technology_1
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_2
                .toLowerCase()
                .match(searchTags[0].toLowerCase()) ||
              job.technology_3.toLowerCase().match(searchTags[0].toLowerCase()))
        );
      }
    }
    const result: DisplayOffer[] = [];
    filteredByInput.forEach(
      (val) => filteredByTags.includes(val) && result.push(val)
    );
    if (searchTags.length === 0) {
      return filteredByInput;
    }
    if (searchValue === "") {
      return filteredByTags;
    }
    return result;
  };
  const filteredJobs: DisplayOffer[] = filterJobs(
    props.searchText,
    props.searchTags
  );

  //loadingState for displaying loading gif
  const [loading, setLoading] = useState(false);

  //getting data from node.js server
  useEffect(() => {
    axios.get("http://localhost:8888/sendToFront")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      });
    setLoading(true);
  }, []);

  useEffect(() => {
    console.log(jobs);
    const newJobs = jobs;
    newJobs.forEach((job, index) => {
      job.isDescriptionVisible = false;
      job.frontendId = index;
    });
    setJobs(newJobs);
  }, [jobs]);

  //database output to frontend
  return (
    <div id="jobBarContainer">
      <div className="jobBar">
        {loading ? (
          <div id="loadingDiv">
            <Spinner animation="border" />
            <p id="loadingParagraph">Loading job offers...</p>
          </div>
        ) : (
          filteredJobs.map((job, index) => {
            function timeSince(date: any) {
              var seconds = Math.floor((Date.now() - date) / 1000);

              var interval = seconds / 31536000;

              if (interval > 1) {
                return Math.floor(interval) + " years";
              }
              interval = seconds / 2592000;
              if (interval > 1) {
                return Math.floor(interval) + " months";
              }
              interval = seconds / 86400;
              if (interval > 1) {
                return Math.floor(interval) + " days";
              }
              interval = seconds / 3600;
              if (interval > 1) {
                return Math.floor(interval) + " hours";
              }
              interval = seconds / 60;
              if (interval > 1) {
                return Math.floor(interval) + " minutes";
              }
              return Math.floor(seconds) + " seconds";
            }
            return (
              <Fade duration={700}>
                <div
                  key={job.id_}
                  className="jobBarElement"
                  onClick={() => {
                    const newJobs = jobs;
                    const newJob = newJobs.find(
                      (el) => el.frontendId === job.frontendId
                    );
                    if (newJob) {
                      newJob.isDescriptionVisible = true;
                      setJobs([...newJobs]);
                    }
                  }}
                >
                  <Fade duration={1200}>
                    <div className="jobHeaderInfo">
                      <div className="iconDiv">
                        <img
                          className="icon"
                          src={job.logo}
                          alt="companyImage"
                        />
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
                            {job.technology_1} • {job.technology_2} •{" "}
                            {job.technology_3}
                          </p>
                        </div>
                        <div>
                          <p className="salary">💰💰 {job.salary}</p>
                        </div>
                        <p className="jobSideInfo">
                          {timeSince(job.days_ago)} ago - {job.contract_types} -{" "}
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
                                (line: any) => {
                                  return <p>{line}</p>;
                                }
                              )}
                              {props.loggedUser === "" ? (
                                <div className="applyButtonDiv">
                                  <button
                                    onClick={() => {
                                      setApplyModalShow(true);
                                      setJobOfferForApply(job);
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
                                      setRemoveOfferModalShow(true);
                                      setJobOfferForApply(job);
                                    }}
                                  >
                                    Remove Offer
                                  </button>
                                  <button
                                    onClick={() => {
                                      setApplyModalShow(true);
                                      setJobOfferForApply(job);
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
              </Fade>
            );
          })
        )}
      </div>
      <ApplyModal
        jobofferforapply={jobOfferForApply}
        show={applyModalShow}
        onHide={() => setApplyModalShow(false)}
      ></ApplyModal>
      <RemoveOfferModal
        loggedAsAdmin={props.loggedAsAdmin}
        loggedUser={props.loggedUser}
        show={removeOfferModalShow}
        onHide={() => setRemoveOfferModalShow(false)}
        removingJobOffer={jobOfferForApply}
      ></RemoveOfferModal>
    </div>
  );
}
