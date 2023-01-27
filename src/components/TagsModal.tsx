import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TagsModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Too many tags!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Maximum number of tags is 5</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.setSearchTags}>Clear Tags</Button>
        <Button onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TagsModal;
