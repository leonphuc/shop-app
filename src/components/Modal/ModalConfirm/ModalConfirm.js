import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalConfirm.scss";
// import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDeleteUserByIdMutation } from "../../../feature/UserFeature/usersApi";
import { useEffect } from "react";

const ModalConfirm = (props) => {
  const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } =
    props;

  const [deleteUserById] = useDeleteUserByIdMutation();

  const confirmDelete = async () => {
    let res = await deleteUserById(dataUserDelete.id);
    if (res) {
      toast.success("Delete user succeed!");
      handleClose();
      handleDeleteUserFromModal(res);
    } else {
      toast.error("Delete user error!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton className="confirm-header">
        <Modal.Title>Delete a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-confirm">
          This action can't be undone! Do you want to delete this user &nbsp;
          Email : <b> {dataUserDelete.email}</b> ? &nbsp; (Id:
          {dataUserDelete.id} )
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="lg"
          className="confirm-btn"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          className="confirm-btn"
          size="lg"
          variant="danger"
          onClick={() => {
            confirmDelete();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
