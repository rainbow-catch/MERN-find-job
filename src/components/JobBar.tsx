import "../styles/style.css";
import {useContext, useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";
import {Fade} from "react-reveal";
import ApplyModal from "./ApplyModal";
import RemoveOfferModal from "./RemoveOfferModal";
import {DisplayOffer} from "../types/DisplayOffer";
import axios from "axios";
import JobBarElement from "./JobBarElement";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { JobsContext } from "../contexts/JobsContext";
import { JobsContextType } from "../types/JobsContextType";

export default function JobBar({searchText, searchTags, loggedUser, loggedAsAdmin}: any) {
  //dbSchema
  //const [jobs, setJobs] = useState<DisplayOffer[]>([]);
  const { jobs, overwriteJobs }: JobsContextType = useContext(JobsContext);

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
    searchText,
    searchTags
  );

  //loadingState for displaying loading gif
  const [loading, setLoading] = useState(false);

  //getting data from node.js server
  useEffect(() => {
    axios.get(axiosUrls.getOffersUrl).then((res) => {
      overwriteJobs(res.data);
      setLoading(false);
    });
    setLoading(true);// eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(jobs);
    const newJobs = jobs;
    newJobs.forEach((job, index) => {
      job.isDescriptionVisible = false;
      job.frontendId = index;
    });
    overwriteJobs(newJobs);// eslint-disable-next-line
  }, [jobs]);

  //database output to frontend
  return (
    <div id="jobBarContainer">
      <div className="jobBar">
        {loading ? (
          <div id="loadingDiv">
            <Spinner animation="border" variant="light"/>
            <p id="loadingParagraph">Loading job offers...</p>
          </div>
        ) : (
          filteredJobs.map((job, index) => {
            return (
              <Fade key={index} duration={700}>
                <JobBarElement
                  job={job}
                  setapplymodalshow={setApplyModalShow}
                  setjobofferforapply={setJobOfferForApply}
                  setremoveoffermodalshow={setRemoveOfferModalShow}
                  loggeduser={loggedUser}
                ></JobBarElement>
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
        loggedAsAdmin={loggedAsAdmin}
        loggedUser={loggedUser}
        show={removeOfferModalShow}
        onHide={() => setRemoveOfferModalShow(false)}
        removingJobOffer={jobOfferForApply}
      ></RemoveOfferModal>
    </div>
  );
}
