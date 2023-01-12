import React from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import SignUpForm from './Accounts/SignUpForm';

export default function Main() {
  return (
    <MDBRow>
      <MDBCol md='8' style={{
            backgroundColor: 'white',
            height: '100vh',
        }}>
        <p className=" pt-3"></p>
        <p className="h2">Fill Rooms with Furniture</p>
        <blockquote className="blockquote">
            <p>IKEYA is a resource for finding home decor inspiration for the everyday user.</p>
        </blockquote>
      </MDBCol>
      <MDBCol md='4' className='text-center' style={{
            backgroundColor: '#EDEDE9',
            height: '100vh',
        }}>
        <br />
        <br />
        <div className="d-grid gap-2">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#login">
                Login
            </button>
        </div>

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
                            <input placeholder="Enter your username" required type="text"
                            name="username" id="user" className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Enter your password" required type="password"
                            name="password" id="pass" className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success">Login</button>
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
                            <input placeholder="First Name" required type="text"
                            name="first" id="first" className="form-control"/>
                            <label htmlFor="first">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Last Name" required type="text"
                            name="last" id="last" className="form-control"/>
                            <label htmlFor="last">Last Name</label>
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
                    <button type="button" className="btn btn-success">Sign Up</button>
                </div>
                </div>
            </div>
            </div>
      </MDBCol>
    </MDBRow>
  );
}
