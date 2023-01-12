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

    async function handleSubmit(e) {
        e.preventDefault();
        signup(first_name, last_name, username, password);
        navigate("/dashboard");
    }

    return (
        <>
        <br/>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup">
                Sign Up
            </button>

            <div className="modal fade" id="signup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id="signup-form">
                        <div className="form-floating mb-3">
                            <input placeholder="First Name" required type="text"
                            name="first_name" id="first_name" className="form-control"/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Last Name" required type="text"
                            name="last_name" id="last_name" className="form-control"/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Enter your username" required type="text"
                            name="username" id="username" className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Enter your password" required type="password"
                            name="password" id="password" className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Sign Up</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default SignUpForm;
