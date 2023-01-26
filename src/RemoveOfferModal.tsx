import axios from "axios";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "./styles/style.css";

const RemoveOfferModal = (props:any) => {
  const [message, setMessage] = useState(
    "This offer doesn't belong to your company"
  );
  const [headerMessage, setHeaderMessage] = useState(
    "You can't remove this offer"
  );
  const [alertModalShow, setAlertModalShow] = useState(false);

  const removeOffer = (id:any) => {
    console.log(id);
    axios
      .get(`http://localhost:8888/removeOffer/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    axios
      .delete(`http://localhost:8888/removeOffer/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTimeout(() => {
      window.location.reload();
    }, 4500);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div>
          <Alert variant="danger" onClose={() => props.onHide()} dismissible>
            <Alert.Heading>
              You are going to remove {props.removingJobOffer.ad_content} offer
            </Alert.Heading>
            <p>When you click Remove button, the offer will be removed.</p>
            <p> This action is irreversible</p>
          </Alert>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (
              props.removingJobOffer.company_name === props.loggedUser ||
              props.loggedAsAdmin === true
            ) {
              setHeaderMessage("Successfully deleted job offer");
              setMessage("Wait for page refresh...");
              setAlertModalShow(true);
              setTimeout(() => {
                removeOffer(props.removingJobOffer._id);
              }, 4000);
            } else {
              setHeaderMessage("You can't remove this offer");
              setMessage("This offer doesn't belong to your company");
              setAlertModalShow(true);
            }
          }}
        >
          Remove
        </button>
        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            props.onHide();
          }}
          message={message}
          headermessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveOfferModal;
