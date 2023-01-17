import React from 'react';
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Dashboard(username) {
  const [list, setList] = useState([]);
  const { token } = useAuthContext();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/user/${username}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
    } else {
      alert("Oops! Something went wrong");
    }
  };

  useEffect(() => {
    fetchData(username);
  }, []);


  return (
    <MDBRow>
      <MDBCol md='8' style={{
            backgroundColor: 'white',
            height: '100vh',
        }}>
        <table className="table table-striped">
            <thead>
            <tr className="table-success">
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>URL</th>
            </tr>
            </thead>
            <tbody>
            {list
                ?.filter((room) => room.username === username)
                .map((room) => {
                return (
                    <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.description}</td>
                    <td>{room.picture_url}</td>
                    </tr>
                );
                })}
            </tbody>
      </table>
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
