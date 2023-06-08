import axios from "axios";
import { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { JobsContextType } from "../types/JobsContextType";
import { Contexts } from "../contexts/Contexts";

const RemoveOfferModal = (props: any) => {
  const { removeJob }: JobsContextType = useContext(Contexts);
  const [message, setMessage] = useState(
    "This offer doesn't belong to your company"
  );
  const [headerMessage, setHeaderMessage] = useState(
    "You can't remove this offer"
  );
  const [alertModalShow, setAlertModalShow] = useState(false);

  const removeOffer = (id: string) => {
    console.log(id);
    axios
      .get(axiosUrls.removeOfferUrl(id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    axios
      .delete(axiosUrls.removeOfferUrl(id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    removeJob(id);
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
              You are going to remove {props.removingjoboffer.ad_content} offer
            </Alert.Heading>
            <p>When you click Remove button, the offer will be removed.</p>
            <p> This action is irreversible</p>
          </Alert>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (
              props.removingjoboffer.company_name === props.loggedUser ||
              props.loggedAsAdmin === true
            ) {
              setHeaderMessage("Successfully deleted job offer");
              setMessage(
                `${props.removingjoboffer.ad_content} offer has been removed`
              );
              setAlertModalShow(true);
              removeOffer(props.removingjoboffer._id);
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
