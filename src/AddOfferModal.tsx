import axios from "axios";
import { FormEvent , useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "./style.css";
import { Offer } from "./types/Offer";
function AddOfferModal(props: any) {
  const loggedAsAdmin = props.loggedAsAdmin;
  const [offer, setOffer] = useState<Offer>();

  setTimeout(() => {
    setOffer((prev: any) => {
      return {
        ...prev,
        company_name: props.loggedCompany,
        logo: props.loggedCompanyLogo,
      };
    });
  }, 2000);

  const [message, setMessage] = useState("Successfully added new job offer!");
  const [headerMessage] = useState("Successfully added job offer!");
  const [alertModalShow, setAlertModalShow] = useState(false);

  const createOffer = (e:FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/create", offer)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    if (offer) {
      setMessage(`Successfully added ${offer.ad_content} offer!`);
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
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOffer((prev:any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
          <p>Add new job offer</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Company Name</Form.Label>
            {loggedAsAdmin ? (
              <Form.Control
                name="company_name"
                className="inputWidth"
                type="text"
                placeholder="Enter company name"
                value={offer? offer.company_name:""}
                onChange={handleChange}
              />
            ) : (
              <Form.Control
                disabled
                name="company_name"
                className="inputWidth"
                type="text"
                placeholder="Enter company name"
                value={offer? offer.company_name:""}
                onChange={handleChange}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Job Name</Form.Label>
            <Form.Control
              name="ad_content"
              className="inputWidth"
              type="text"
              placeholder="e.g. Junior Frontend Developer"
              value={offer? offer.ad_content:""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Seniority</Form.Label>
            <Form.Select
              className="inputWidth"
              name="seniority"
              onChange={handleChange}
              value={offer? offer.seniority:""}
            >
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Technologies</Form.Label>
            <Form.Control
              name="technology_1"
              value={offer? offer.technology_1:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Enter first technology"
            />
            <br></br>
            <Form.Control
              name="technology_2"
              value={offer? offer.technology_2:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Enter second technology"
            />
            <br></br>
            <Form.Control
              name="technology_3"
              value={offer? offer.technology_3:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Enter third technology"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              name="salary"
              value={offer? offer.salary:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="e.g. 5500$"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Contract type</Form.Label>
            <Form.Control
              name="contract_types"
              value={offer? offer.contract_types:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="e.g. Contract"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>
              Job type/Main technology/ Main specialization
            </Form.Label>
            <Form.Control
              name="job_type"
              value={offer? offer.job_type:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="e.g. FrontEnd"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Localization</Form.Label>
            <Form.Control
              name="country"
              value={offer? offer.country:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="e.g. Wordlwide"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Company image logo link</Form.Label>
            {loggedAsAdmin ? (
              <Form.Control
                name="logo"
                value={offer? offer.logo:""}
                onChange={handleChange}
                className="inputWidth"
                type="text"
                placeholder="e.g. https://cdn-icons-png.flaticon.com/512/25/25231.png"
              />
            ) : (
              <Form.Control
                disabled
                name="logo"
                value={offer? offer.logo:""}
                onChange={handleChange}
                className="inputWidth"
                type="text"
                placeholder="e.g. https://cdn-icons-png.flaticon.com/512/25/25231.png"
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={offer? offer.description:""}
              onChange={handleChange}
              className="inputWidth"
              type="text"
              placeholder="Write some information about job offer.."
              as="textarea"
              rows={15}
            />
          </Form.Group>
          <Form.Group className="mb-3 displayNone" controlId="text">
            <Form.Label>daysAgo</Form.Label>
            <Form.Control
              name="days_ago"
              value={new Date().toDateString()}
              className="inputWidth"
              type="text"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={createOffer}>Add new Offer</Button>
      </Modal.Footer>
      <AlertModal
        show={alertModalShow}
        onHide={() => {
          setAlertModalShow(false);
          //window.location.reload(false);
          props.onHide();
        }}
        message={message}
        headerMessage={headerMessage}
      ></AlertModal>
    </Modal>
  );
}
export default AddOfferModal;
