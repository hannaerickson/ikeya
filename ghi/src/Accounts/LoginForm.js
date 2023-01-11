import { useState } from "react";
import { useToken } from "./Auth";

function LoginComponent() {
  const [token, login] = useToken();
  const [username, setUsername] = useState("");
  const [passowrd, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Login</h1>
          <form onSubmit={login} id="login-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleUsernameChange}
                value={username}
                placeholder="Enter your username"
                required
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePasswordChange}
                value={passowrd}
                placeholder="Enter your password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
