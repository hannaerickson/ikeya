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
  const [username, setUserName] = useState(null);
  const [isLoggedIn, setUserStatus] = useState(null);
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
    }
  };

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
    if (username === null) {
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setUserName(res.account.username));
    }
    if (username === rooms.username) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  }, [token, username, isLoggedIn]);

  return (
    <MDBRow>
      <MDBCol md="8" style={{ backgroundColor: "white", height: "100vh" }}>
        <br/><br/>
          <div className="row row-cols-1 row-cols-md-3 g-4">
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
