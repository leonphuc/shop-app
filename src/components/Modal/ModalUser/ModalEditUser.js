import "./ModalEditUser.scss";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useUpdateUserByIdMutation } from "../../../feature/UserFeature/usersApi";

const ModalEditUser = (props) => {
  const { handleClose, show, dataUserEdit, handleEditUserFromModal } = props;

  const [updateUserById] = useUpdateUserByIdMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditUser = async () => {
    let res = await updateUserById({
      ...dataUserEdit,
      name: { firstname: firstName, lastname: lastName },
    });
    if (res.error) {
      toast.error("Update user Failed");
      console.log(res.error);
    } else {
      handleEditUserFromModal(res);
      handleClose();
      toast.success("Update user succeed!");
    }
  };

  useEffect(() => {}, [dataUserEdit.id]);

  const handleClosed = () => {
    setFirstName(`${dataUserEdit.name.firstname}`);
    setLastName(`${dataUserEdit.name.lastname}`);

    handleLog();
  };

  const handleLog = () => {
    return handleClose();
  };

  //   console.log(dataUserEdit);

  useEffect(() => {
    if (show) {
      setFirstName(`${dataUserEdit.name.firstname}`);
      setLastName(`${dataUserEdit.name.lastname}`);
    }
  }, [dataUserEdit]);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Job
            </label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="lg" variant="secondary" onClick={() => handleClosed()}>
          Close
        </Button>
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            handleEditUser();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
