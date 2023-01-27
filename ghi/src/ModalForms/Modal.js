import { React, useState } from "react";
import { useToken } from "../Accounts/Auth";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const [, , , signup] = useToken();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [showLoginModal, setShowSignupModal] = useState(true);
  const [show, setShow] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleCloseSignup = () => {
    setShowSignupModal(false);
    handleClose();
  };
  const handleClose = () => setShow(false);

  async function handleSignup(e) {
    e.preventDefault();
    await signup(first_name, last_name, username, password);
    handleCloseSignup();
    navigate("/dashboard");
  };

  return (
    <div className="row">
      <div className="p-3">
        <h1>Signup</h1>
        <br />
        <form onSubmit={handleSignup}>
          <div className="form-floating mb-3">
            <input
              onChange={handleFirstNameChange}
              value={first_name}
              placeholder="First Name"
              required
              type="text"
              name="first"
              id="first"
              className="form-control"
            />
            <label htmlFor="first">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleLastNameChange}
              value={last_name}
              placeholder="Last Name"
              required
              type="text"
              name="last"
              id="last"
              className="form-control"
            />
            <label htmlFor="last">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleUsernameChange}
              value={username}
              placeholder="Enter your username"
              required
              type="text"
              name="username"
              id="signup_username"
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
              id="signup_password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-red"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="submit" className="btn btn-green">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LoginForm() {
  const [, login] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(true);
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
    login(username, password);
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
              onClick={handleClose}
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
