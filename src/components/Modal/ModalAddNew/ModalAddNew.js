import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { useAddUserMutation } from "../../../feature/UserFeature/usersApi";
import { useGetAllUsersQuery } from "../../../feature/UserFeature/usersApi";

const ModalAddNew = (props) => {
  const { handleClose, show, handleUpdateTable } = props;
  const { data } = useGetAllUsersQuery();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addUser] = useAddUserMutation();

  const handleSaveUser = async () => {
    let res = await addUser({
      name: { firstname: firstName, lastname: lastName },
    });
    // console.log("res", res);
    if (res) {
      handleClose();
      console.log("res new", res);
      setFirstName("");
      setLastName("");
      toast.success("Create user success");
      handleUpdateTable(res);
    } else {
      toast.error("Create user error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name
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
              Last Name
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
        <Button size="lg" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            handleSaveUser();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNew;
