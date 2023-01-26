import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "./styles/style.css";
import { Offer } from "./types/Offer";
function AddOfferModal(props: any) {
  const loggedAsAdmin = props.loggedasadmin;
  const loggedCompany = props.loggedcompany;
  const loggedCompanyLogo = props.loggedcompanylogo;
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
  const [validated, setValidated] = useState(true);
  const [shake, setShake] = useState(false);
  const [hideModalBody, setHideModalBody] = useState(false);
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
  }, [props]);

  const [message, setMessage] = useState("Successfully added new job offer!");
  const [headerMessage] = useState("Successfully added job offer!");
  const [alertModalShow, setAlertModalShow] = useState(false);

  const createOffer = (e: HTMLFormElement | FormEvent) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      startShake();
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      e.preventDefault();
      axios
        .post("http://localhost:8888/create", offer)
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
        size="lg"
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
          <Form noValidate validated={validated} onSubmit={createOffer}>
            {loggedAsAdmin ? (
              <Form.Group controlId="text">
                <Form.Label>Company Name</Form.Label>
                <InputGroup className="inputGroupWidth" hasValidation>
                  <Form.Control
                    className="inputWidth"
                    name="company_name"
                    type="text"
                    placeholder="Enter company name"
                    value={offer.company_name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your company name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            ) : (
              <Form.Group controlId="text">
                <Form.Label>Company Name</Form.Label>
                <InputGroup className="inputGroupWidth" hasValidation>
                  <Form.Control
                    className="inputWidth"
                    name="company_name"
                    type="text"
                    placeholder="Enter company name"
                    value={offer.company_name}
                    onChange={handleChange}
                    disabled
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your company name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            )}
            <Form.Group controlId="text">
              <Form.Label>Job Title</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="ad_content"
                  type="text"
                  placeholder="e.g. Junior Frontend Developer"
                  value={offer.ad_content}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your job offer title.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Seniority</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Select
                  className="inputWidth"
                  name="seniorty"
                  value={offer.seniority}
                  onChange={handleChange}
                  required
                >
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select seniority.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Technologies</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="technology_1"
                  type="text"
                  placeholder="Enter first technology"
                  value={offer.technology_1}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your technology.
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="technology_2"
                  type="text"
                  placeholder="Enter second technology"
                  value={offer.technology_2}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="technology_3"
                  type="text"
                  placeholder="Enter third technology"
                  value={offer.technology_3}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Salary</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="salary"
                  type="text"
                  placeholder="e.g. 5500$"
                  value={offer.salary}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter salary.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Contract Type</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="contract_types"
                  type="text"
                  placeholder="e.g. B2B"
                  value={offer.contract_types}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter contract type.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>
                Job type/Main technology/Main specialization
              </Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="job_type"
                  type="text"
                  placeholder="e.g. Frontend"
                  value={offer.job_type}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter contract type.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Localization</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="country"
                  type="text"
                  placeholder="e.g. worldwide/remote"
                  value={offer.country}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter localization.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Company image logo link</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  disabled
                  className="inputWidth"
                  name="logo"
                  type="text"
                  placeholder="e.g. https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  value={offer.logo}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter image logo link.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Description</Form.Label>
              <InputGroup className="inputGroupWidth" hasValidation>
                <Form.Control
                  required
                  className="inputWidth"
                  name="description"
                  type="text"
                  placeholder="Write more information about job offer.."
                  value={offer.description}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter description.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="text">
              <InputGroup className="inputGroupWidth displayNone" hasValidation>
                <Form.Control
                  className="inputWidth"
                  name="days_ago"
                  type="text"
                  value={new Date().toDateString()}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter description.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Button type="submit" className={shake ? "shake" : ""}>
              Add new Offer
            </Button>
          </Form>
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
        headerMessage={headerMessage}
      ></AlertModal>
    </>
  );
}
export default AddOfferModal;
