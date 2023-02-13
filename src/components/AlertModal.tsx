import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AlertModal(props:any) {
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p>{props.headermessage}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="gradient-button" onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AlertModal;
