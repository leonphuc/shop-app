import { useGetAllUsersQuery } from "../../feature/UserFeature/usersApi";
import Table from "react-bootstrap/Table";
import "./AdminPage.scss";
import { useEffect, useState } from "react";
import { sortUser } from "../../services/UsersService";
import Container from "react-bootstrap/Container";
import ModalEditUser from "../Modal/ModalUser/ModalEditUser";
import ModalConfirm from "../Modal/ModalConfirm/ModalConfirm";
import ModalAddNew from "../Modal/ModalAddNew";
import _, { debounce } from "lodash";

const tipApi = {
  addTip: {
    color: "yellow",
    text: " If you send an object like the code above, it will return you an object with a new id. remember that nothing in real will insert into the database. so if you want to access the new id you will get a 404 error.",
  },

  deleteTip: {
    color: "red",
    text: " The user will not be deleted on the database. but if you sent data successfully it will return you the fake deleted user.",
  },
  updateTip: {
    color: "blue",
    text: "It will return you an object with sent id. remember that nothing in real will update in the database.",
  },
  fakeApi: "https://fakestoreapi.com/docs",
};

function AdminPage() {
  const { data, isFetching } = useGetAllUsersQuery();

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditNew, setIsShowModalEditNew] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [notificationTip, setNotificationTip] = useState("");

  const [listUsers, setListUsers] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditNew(false);
    setIsShowModalDelete(false);
  };

  useEffect(() => {
    handleSort("asc");

    getUser();
  }, []);

  const getUser = async () => {
    let res = await data;
    if (res && res.length > 0 && !isFetching) {
      setListUsers(res);
    }
  };

  const handleSort = async (sortBy) => {
    let res = await sortUser(sortBy);
    setListUsers(res);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEditNew(true);
  };
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.data.id);
    cloneListUsers[index].name.firstname = user.data.name.firstname;
    cloneListUsers[index].name.lastname = user.data.name.lastname;
    setListUsers(cloneListUsers);
    setNotificationTip(tipApi.updateTip);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.data.id);
    setListUsers(cloneListUsers);
    setNotificationTip(tipApi.deleteTip);
  };

  const handleUpdateTable = (user) => {
    console.log(user.data);

    setListUsers([user.data, ...listUsers]);
    setNotificationTip(tipApi.addTip);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
      setNotificationTip("");
    } else {
      getUser();
    }
  }, 300);

  return (
    <>
      {isFetching ? (
        <div className="loading-fetch">...Loading</div>
      ) : (
        <div className="admin-page-wrapper">
          <h1 className="admin-page-title">Admin Page</h1>
          <div className="admin-page-header">
            <div className="my-3 add-new">
              <button
                className="btn btn-success"
                onClick={() => setIsShowModalAddNew(true)}
              >
                Add new user
              </button>
            </div>
            <div className="col-4 my-3">
              <input
                className="form-control"
                placeholder="Search user by email....."
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <div className="sort-header">
                    <span>ID</span>
                    <span>
                      <i
                        onClick={() => handleSort("desc")}
                        className="fa-solid fa-arrow-down-long"
                      ></i>
                      <i
                        onClick={() => handleSort("asc")}
                        className="fa-solid fa-arrow-up-long"
                      ></i>
                    </span>
                  </div>
                </th>
                <th>Email</th>
                <th>
                  <div className="sort-header">
                    <span>First Name</span>
                  </div>
                </th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item) => (
                  <tr key={`users-${item.id}`}>
                    <td>{item.id}</td>
                    <td>{item?.email}</td>
                    <td>{item?.name?.firstname}</td>
                    <td>{item?.name?.lastname}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => {
                          handleEditUser(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
      <ModalEditUser
        show={isShowModalEditNew}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      {notificationTip ? (
        <div className="tip-wrapper">
          <div className="tip-content">
            <i
              className="fa-solid fa-bell"
              style={{ color: `${notificationTip.color}` }}
            />
            <p>{notificationTip.text}</p>
            <a href="https://fakestoreapi.com/docs">
              https://fakestoreapi.com/docs
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AdminPage;
