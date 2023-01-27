import { React, useEffect, useState } from "react";
import { useToken } from "../Accounts/Auth";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [, login] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCloseLogin = () => {
    setShowLoginModal(false);
    handleClose();
  };
  const handleClose = () => setShow(false);

  async function handleLogin(e) {
    e.preventDefault();
    await login(username, password);
    handleCloseLogin();
    navigate("/dashboard");
  };

  return (
    <div className="row">
      <div className="p-3">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              onChange={handleUsernameChange}
              value={username}
              placeholder="Enter your username"
              required
              type="text"
              name="username"
              id="login_username"
              className="form-control"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePasswordChange}
              value={password}
              placeholder="Enter your password"
              required
              type="password"
              name="password"
              id="login_password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-red"
              onClick={handleCloseLogin}
            >
              Close
            </button>
            <button type="submit" className="btn btn-green">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
