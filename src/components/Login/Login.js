import "./Login.scss";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/UserSlice";
import { Navigate, useNavigate } from "react-router-dom";
import config from "../../router/config";

function LoginPage() {
  const getUserIsLogin = Boolean(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [notification, SetNotification] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
    SetNotification("");
    // console.log(username);
  };

  const handleChangePassWord = (e) => {
    setPassword(e.target.value);
    SetNotification("");

    // console.log(password);
  };

  const handleLoginEvent = (e) => {
    e.preventDefault();

    if (!username || !password) {
      SetNotification("Chưa nhập Email / Password ");
      return;
    }
    let userCredentials = {
      username,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setUserName("");
        setPassword("");
        navigate("/");
      }
    });
  };

  // console.log(getUserIsLogin);

  if (getUserIsLogin === true) {
    return <Navigate to={config.routes.home} />;
  }

  return (
    <>
      <div className="login-page">
        <h1>Login</h1>

        <div className="login-wrapper">
          <div className="login-form">
            <h3>Username: (johnd)</h3>
            <input
              value={username}
              type="text"
              onChange={handleChangeUsername}
            />
          </div>

          <div className="login-form">
            <h3>Password: (m38rmF$)</h3>
            <input
              value={password}
              type="text"
              onChange={handleChangePassWord}
            />
          </div>

          <div className="login-form">
            <Button variant="contained" onClick={handleLoginEvent}>
              Login
            </Button>
          </div>
          <p>{notification}</p>
          {error && (
            <div className="login-form">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
