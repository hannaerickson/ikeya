import { React, useState } from 'react';
import { useToken } from './Accounts/Auth';
import { useNavigate } from "react-router-dom";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Main() {
    const [token, login, , signup] = useToken();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const navigate = useNavigate();

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

    async function handleLogin(e) {
        e.preventDefault();
        login(username, password);
        navigate("/dashboard");
    }

    async function handleSignup(e) {
        e.preventDefault();
        signup(first_name, last_name, username, password);
        navigate("/dashboard");
    }

    return (
        <MDBRow>
        <MDBCol md='8' style={{
                backgroundColor: 'white',
                height: '100vh',
            }}>
            <p className=" pt-3"></p>
            <p className="h2">Fill Rooms with Furniture</p>
            <blockquote className="blockquote">
                <p>IKEYA is an online resource for finding home decor inspiration for the everyday user.</p>
            </blockquote>
            <div className="card">
                <img src="https://static01.nyt.com/images/2019/02/10/realestate/10fixtop1/oakImage-1549299950264-videoSixteenByNineJumbo1600.jpg" className="card-img-top" alt="Sample Room"/>
                <div className="card-body">
                    <h5 className="card-title">Living Room</h5>
                    <p className="card-text">A modern living room perfect for entertaining friends, reading or watching television.</p>
                    <a href="..." className="btn btn-primary">Read More</a>
                </div>
            </div>
        </MDBCol>
        <MDBCol md='4' className='text-center' style={{backgroundColor: '#EDEDE9', height: '100vh',}}>
        <br/><br/>
        <div className="d-grid gap-2">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#login">
                Login
            </button>
        </div>

        <div>
            <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="login-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleUsernameChange} value={username} placeholder="Enter your username" required type="text"
                                name="username" id="login_username" className="form-control"/>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePasswordChange} value={password} placeholder="Enter your password" required type="password"
                                name="password" id="login_password" className="form-control"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleLogin} type="button" data-bs-dismiss="modal" className="btn btn-success">Login</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
        <br/>


        <div className="d-grid gap-2">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#signup">
                Sign Up
            </button>
        </div>

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
                            <input onChange={handleFirstNameChange} value={first_name} placeholder="First Name" required type="text"
                            name="first" id="first" className="form-control"/>
                            <label htmlFor="first">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} value={last_name} placeholder="Last Name" required type="text"
                            name="last" id="last" className="form-control"/>
                            <label htmlFor="last">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleUsernameChange} value={username} placeholder="Enter your username" required type="text"
                            name="username" id="signup_username" className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePasswordChange} value={password} placeholder="Enter your password" required type="password"
                            name="password" id="signup_password" className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleSignup} type="button" data-bs-dismiss="modal" className="btn btn-success">Sign Up</button>
                </div>
                </div>
            </div>
            </div>
      </MDBCol>
    </MDBRow>
  );
}
