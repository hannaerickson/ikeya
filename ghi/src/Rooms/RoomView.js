//Function
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";
//Form
import FurnitureForm from "../Furniture/FurnitureForm";
//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

export default function RoomView() {
  const location = useLocation();
  const roomData = location.state;
  const { token } = useAuthContext();
  const [furnitures, setFurnitures] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const { handleSubmit } = useState();
  const [username, setUserName] = useState(null);

  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${roomData}/furniture`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const dataFurniture = await response.json();
      setFurnitures(dataFurniture);
    }
  };

  const getRoomData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${roomData}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchConfig = {
        method: "GET",
        credentials: "include",
    }

  useEffect(() => {
    getData();
    getRoomData();
    if (username === null ) {
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, fetchConfig)
        .then((res) => res.json())
        .then((res) => setUserName(res.account.username))
          }

  }, [token, username]);

  // console.log("Username for Current Room:", rooms.username)
  // console.log("Username for Current User:", username)
    

  return (
    <>
      <br></br>
      <header className="p-5 text-center bg-light">
        <h1>{rooms.name}</h1>
        <br></br>
        <br></br>
        <br></br>
        <h2>{rooms.description}</h2>
      </header>
      <br></br>
      <br></br>
      <Container>
        <Row className="mb-3">
          {furnitures.length ? (
            furnitures.map((furniture) => {
              return (
                <Col key={furniture.id}>
                  <Card className="card bg-black text-white justify-content-center">
                    <Card.Img variant="top" src={furniture.picture_url} />
                    <Card.Body>
                      <div className="text-center">
                        <Card.Text className="text-right">
                          {furniture.name}
                        </Card.Text>

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
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <div>No furniture yet!</div>
          )}
        </Row>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="outline-success"
          size="lg"
          onClick={handleShow}
        >
          Add Furniture to Your Room
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <FurnitureForm handleSubmit={handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
