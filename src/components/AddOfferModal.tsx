import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import "../styles/AddOfferModal.css";
import { Offer } from "../types/Offer";
import { checkFormValidity } from "../functions/checkFormValidity";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";

function AddOfferModal(props: any) {
  const { addJob, loggedAsAdmin, loggedUser }: ContextsType =
    useContext(Contexts);
  const loggedCompany = loggedUser.company_name;
  const loggedCompanyLogo = loggedUser.logo;
  const [offer, setOffer] = useState<Offer>({
    company_name: "",
    days_ago: "",
    contract_types: "",
    country: "",
    ad_content: "",
    job_type: "",
    seniority: "",
    technology_1: "",
    technology_2: "",
    technology_3: "",
    salary: "",
    description: "",
    about_us: "",
    logo: "",
  });
  const [shake, setShake] = useState(false);
  const [hideModalBody, setHideModalBody] = useState(false);
  const [placeHoldersVisibility, setPlaceHoldersVisibility] = useState<
    boolean[]
  >([]);
  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  useEffect(() => {
    setOffer((prev: any) => {
      return {
        ...prev,
        company_name: loggedCompany,
        logo: loggedCompanyLogo,
      };
    });
  }, [props, loggedCompany, loggedCompanyLogo]);

  const [message, setMessage] = useState("Successfully added new job offer!");
  const [headerMessage] = useState("Successfully added job offer!");
  const [alertModalShow, setAlertModalShow] = useState(false);

  const createOffer = (e: HTMLFormElement | FormEvent) => {
    e.preventDefault();
    if (
      checkFormValidity({
        company_name: offer.company_name,
        days_ago: offer.days_ago,
        contract_types: offer.contract_types,
        country: offer.country,
        ad_content: offer.ad_content,
        job_type: offer.job_type,
        seniority: offer.seniority,
        technology_1: offer.technology_1,
        technology_2: offer.technology_2,
        technology_3: offer.technology_3,
        salary: offer.salary,
        description: offer.description,
        about_us: offer.about_us,
        logo: offer.logo,
      })
    ) {
      axios
        .post(axiosUrls.createOfferUrl, offer)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      if (offer) {
        setMessage(`Successfully added ${offer.ad_content} offer!`);
        setHideModalBody(true);
        setAlertModalShow(true);
        setOffer({
          company_name: "",
          days_ago: "",
          contract_types: "",
          country: "",
          ad_content: "",
          job_type: "",
          seniority: "",
          technology_1: "",
          technology_2: "",
          technology_3: "",
          salary: "",
          description: "",
          about_us: "",
          logo: "",
        });
        addJob(offer);
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOffer((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Modal
        {...props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={hideModalBody ? "displayNone" : ""}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p>Add new job offer</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="add-offer-form" onSubmit={createOffer}>
            {loggedAsAdmin ? (
              <div className="form-section">
                <input
                  required
                  type="text"
                  className={
                    offer.company_name === ""
                      ? "form-input"
                      : "form-input form-input-filled"
                  }
                  name="company_name"
                  onChange={handleChange}
                  value={offer.company_name}
                  placeholder={
                    placeHoldersVisibility[0] ? "Enter company name" : ""
                  }
                  onFocus={() => {
                    const newArr = [...placeHoldersVisibility];
                    newArr[0] = true;
                    setPlaceHoldersVisibility(newArr);
                  }}
                  onBlur={() => {
                    setPlaceHoldersVisibility([]);
                  }}
                />
                <label htmlFor="company_name" className="input-label">
                  <span className="label-name">Company name</span>
                </label>
              </div>
            ) : (
              <div className="form-section">
                <input
                  disabled
                  required
                  type="text"
                  className={
                    offer.company_name === ""
                      ? "form-input"
                      : "form-input form-input-filled"
                  }
                  name="company_name"
                  onChange={handleChange}
                  value={offer.company_name}
                  placeholder={
                    placeHoldersVisibility[0] ? "Enter company name" : ""
                  }
                  onFocus={() => {
                    const newArr = [...placeHoldersVisibility];
                    newArr[0] = true;
                    setPlaceHoldersVisibility(newArr);
                  }}
                  onBlur={() => {
                    setPlaceHoldersVisibility([]);
                  }}
                />
                <label htmlFor="company_name" className="input-label">
                  <span className="label-name">Company name</span>
                </label>
              </div>
            )}
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="ad_content"
                title="ad_content"
                onChange={handleChange}
                value={offer.ad_content}
                placeholder={
                  placeHoldersVisibility[1]
                    ? "e.g. Junior Frontend Developer"
                    : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[1] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="ad_content" className="input-label">
                <span className="label-name">Job title</span>
              </label>
            </div>
            <div className="form-section-select">
              <label className="form-select-label">Seniority</label>
              <select
                className="form-select"
                name="seniority"
                title="seniority"
                value={offer.seniority}
                onChange={handleChange}
                required
              >
                <option value={"Junior"}>Junior</option>
                <option value={"Mid"}>Mid</option>
                <option value={"Senior"}>Senior</option>
              </select>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="technology_1"
                title="technology_1"
                onChange={handleChange}
                value={offer.technology_1}
                placeholder={
                  placeHoldersVisibility[2] ? "Enter first technology" : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[2] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="technology_1" className="input-label">
                <span className="label-name">Technology</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="technology_2"
                title="technology_2"
                onChange={handleChange}
                value={offer.technology_2}
                placeholder={
                  placeHoldersVisibility[3] ? "Enter second technology" : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[3] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="technology_2" className="input-label">
                <span className="label-name">Technology</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="technology_3"
                title="technology_3"
                onChange={handleChange}
                value={offer.technology_3}
                placeholder={
                  placeHoldersVisibility[4] ? "Enter third technology" : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[4] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="technology_3" className="input-label">
                <span className="label-name">Technology</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="salary"
                title="salary"
                onChange={handleChange}
                value={offer.salary}
                placeholder={placeHoldersVisibility[5] ? "e.g. 5500$" : ""}
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[5] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="salary" className="input-label">
                <span className="label-name">Salary</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="contract_types"
                title="contract_types"
                onChange={handleChange}
                value={offer.contract_types}
                placeholder={placeHoldersVisibility[6] ? "e.g. B2B" : ""}
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[6] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="contract_types" className="input-label">
                <span className="label-name">Contract Type</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="job_type"
                title="job_type"
                onChange={handleChange}
                value={offer.job_type}
                placeholder={placeHoldersVisibility[7] ? "e.g. Frontend" : ""}
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[7] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="job_type" className="input-label">
                <span className="label-name">
                  Job type/Main technology/specialization
                </span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="text"
                className="form-input"
                name="country"
                title="country"
                onChange={handleChange}
                value={offer.country}
                placeholder={placeHoldersVisibility[8] ? "e.g. remote" : ""}
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[8] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="country" className="input-label">
                <span className="label-name">Localization</span>
              </label>
            </div>
            {loggedAsAdmin ? (
              <div className="form-section">
                <input
                  required
                  type="url"
                  className={
                    offer.logo === ""
                      ? "form-input"
                      : "form-input form-input-filled"
                  }
                  name="logo"
                  onChange={handleChange}
                  value={offer.logo}
                  placeholder={
                    placeHoldersVisibility[9]
                      ? "e.g. https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      : ""
                  }
                  onFocus={() => {
                    const newArr = [...placeHoldersVisibility];
                    newArr[9] = true;
                    setPlaceHoldersVisibility(newArr);
                  }}
                  onBlur={() => {
                    setPlaceHoldersVisibility([]);
                  }}
                />
                <label htmlFor="logo" className="input-label">
                  <span className="label-name">Company image logo link</span>
                </label>
              </div>
            ) : (
              <div className="form-section">
                <input
                  required
                  disabled
                  type="text"
                  className={
                    offer.logo === ""
                      ? "form-input"
                      : "form-input form-input-filled"
                  }
                  name="logo"
                  onChange={handleChange}
                  value={offer.logo}
                  placeholder={
                    placeHoldersVisibility[9]
                      ? "e.g. https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      : ""
                  }
                  onFocus={() => {
                    const newArr = [...placeHoldersVisibility];
                    newArr[9] = true;
                    setPlaceHoldersVisibility(newArr);
                  }}
                  onBlur={() => {
                    setPlaceHoldersVisibility([]);
                  }}
                />
                <label htmlFor="logo" className="input-label">
                  <span className="label-name">Company image logo link</span>
                </label>
              </div>
            )}
            <div className="form-section" id="form-section-textarea">
              <label className="form-select-label">Description</label>
              <textarea
                required
                className="form-input"
                id="form-input-textarea"
                rows={20}
                name="description"
                title="description"
                onChange={handleChange}
                value={offer.description}
                placeholder={
                  placeHoldersVisibility[10]
                    ? "Write more information about job offer.."
                    : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[10] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
            </div>
            <div className="form-group form-check"></div>
            <button
              type="submit"
              title="addOfferButton"
              className={
                shake
                  ? "shake"
                  : "gradient-button submit-button btn btn-primary"
              }
              onClick={() => {
                if (
                  !checkFormValidity({
                    company_name: offer.company_name,
                    days_ago: offer.days_ago,
                    contract_types: offer.contract_types,
                    country: offer.country,
                    ad_content: offer.ad_content,
                    job_type: offer.job_type,
                    seniority: offer.seniority,
                    technology_1: offer.technology_1,
                    technology_2: offer.technology_2,
                    technology_3: offer.technology_3,
                    salary: offer.salary,
                    description: offer.description,
                    about_us: offer.about_us,
                    logo: offer.logo,
                  })
                ) {
                  startShake();
                }
              }}
            >
              Add Offer
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <AlertModal
        show={alertModalShow}
        onHide={() => {
          setAlertModalShow(false);
          props.onHide();
          setHideModalBody(false);
        }}
        message={message}
        headermessage={headerMessage}
      ></AlertModal>
    </>
  );
}

export default AddOfferModal;
