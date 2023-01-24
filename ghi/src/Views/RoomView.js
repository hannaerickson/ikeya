//Function
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";

//Form
import FurnitureForm from "../ModalForms/FurnitureForm";
//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function RoomView() {
  const location = useLocation();
  const roomData = location.state;
  const { token } = useAuthContext();
  const [furnitures, setFurnitures] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const { handleSubmit } = useState();
  const [isLoggedIn, setUserStatus] = useState(false);
  const [roomUserName, setUserName] = useState("");
  const [tokenUserName, setTokenUserName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${roomData}/furniture`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const dataFurniture = await response.json();
      setFurnitures(dataFurniture);
    }
  };

  const getRoomData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${roomData}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const dataRooms = await response.json();
      setRooms(dataRooms);
      setUserName(dataRooms.username);
    }
  };

  const getTokenUserName = async () => {
    const res = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
      method: "GET",
      credentials: "include",
    });
    if(res.ok){
      const data = await res.json();
      setTokenUserName(data.account.username);
    }
  }

  const deletion = async (id) => {
    const urlDelete = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/furniture/${id}`;
    const resp = await fetch(urlDelete, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    const dataFurniture = await resp.json();
    getData(); 
  };

  useEffect(() => {
    getData();
    getRoomData(); 
    getTokenUserName();
    if (roomUserName !== null && roomUserName === tokenUserName) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  }, [token, roomUserName, tokenUserName]);

    
  return (
    <MDBRow>
      <MDBCol md="8" style={{ backgroundColor: "white", height: "100vh" }}>
        <div>
          { roomUserName === tokenUserName ? (
            <>
              <header className="p-5 text-center bg-light">
                <div className="col-md-12 gap-3">
                  <button className="btn btn-secondary m-2">Dashboard</button>
                  <button className="btn btn-primary m-2">Add Furniture</button>
                  <button className="btn btn-danger m-2">Delete Room</button>
                </div>
              </header>
              <br></br>
              <br></br>
            </>
          ) : (
            ""
          )}
        </div>
        <Container>
          <Row className="mb-3">
            {furnitures.length ? (
              furnitures.map((furniture) => {
                return (
                  <div className="col" key={furniture.id}>
                    <div className="card bg-light mb-3 text-center h-100">
                      <img src={furniture.picture_url} className="card-img-top card-image" alt="Image"/>
                      <div className="card-body">
                        <h5 className="card-title">{furniture.name}</h5>
                        {/* <p className="card-text">Not needed for furniture</p> */}
                      </div>
                      <div className="card-footer">
                          <Button
                            variant="outline-danger"
                            className="text-right"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.value) {
                                  deletion(furniture.id);
                                  Swal.fire(
                                    "Deleted!",
                                    "This piece of furniture has been deleted.",
                                    "success"
                                  );
                                }
                              });
                            }}
                          >
                            Delete from room
                          </Button>
                        </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>No furniture yet!</h3>
              </div>
            )}
          </div>
      </MDBCol>


      <MDBCol
        md="4"
        className="text-center"
        style={{ backgroundColor: "#EDEDE9", height: "auto" }}
      >
        <br />
        <br />
        <h1>{rooms.name}</h1>
        <p>Designed by {rooms.username}</p>
        <br />
        <img
          src={rooms.picture_url}
          style={{ height: "300px", width: "350px" }}
        ></img>
        <br />
        <br />
        <h4>{rooms.description}</h4>
      </MDBCol>
    </MDBRow>
  );
}
