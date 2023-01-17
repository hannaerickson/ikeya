import { useState } from "react";
import { useToken } from "./Auth";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const [token, signup] = useToken();
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const newUser = await signup(first_name, last_name, username, password);
        navigate("/dashboard");
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} id="login-form">
                <div className="form-floating mb-3">
                <input
                    onChange={handleFirstNameChange}
                    value={first_name}
                    placeholder="Enter your first name"
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                />
                <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    onChange={handleLastNameChange}
                    value={last_name}
                    placeholder="Enter your last name"
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                />
                <label htmlFor="last_name">Last Name</label>
                </div>
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
                    value={password}
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                />
                <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-primary">Sign Up</button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default SignUpForm;
