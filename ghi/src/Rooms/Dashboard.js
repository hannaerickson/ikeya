import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { Link } from "react-router-dom";

//Form
import UpdateRoomForm from "./UpdateRoom";
import RoomsForm from "./RoomsForm";
import FurnitureForm from "../Furniture/FurnitureForm";

//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState(null);
  const { token } = useAuthContext();
  const { handleSubmit } = useState();
  const [showRoom, setShowRoom] = useState(false);
  const [showFurniture, setShowFurniture] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseRoom = () => setShowRoom(false);
  const handleShowRoom = () => setShowRoom(true);
  const handleCloseFurniture = () => setShowFurniture(false);
  const handleShowFurniture = () => setShowFurniture(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);


  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
    }
  };

  const deletion = async (id) => {
    const urlDelete = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${id}`;
    const resp = await fetch(urlDelete, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    const data = await resp.json();
    fetchData();
  };

  useEffect(() => {
    if (username === null) {
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {method: "GET", credentials: "include"})
        .then((res) => res.json())
        .then((res) => setUsername(res.account.username));
    }
    fetchData();
  }, [token, username]);

  return (
    <MDBRow>
      <MDBCol md="8" style={{backgroundColor: "white", height: "100vh",}}>
        <Container>
        <br/><br/>
          <Row className="mb-3">
            {list.map((room) => {
              return (
                <Col key={room.id}>
                  <Card className="w-75 justify-content-center">
                    <Card.Img variant="top" src={room.picture_url} />
                    <Card.Body>
                      <div className="text-center">
                        <Card.Text className="text-right">
                          {room.name}
                        </Card.Text>

                        <Card.Text className="text-right">
                          {room.description}
                        </Card.Text>
                        <Button
                          variant="primary"
                          className="text-right"
                        >
                          <Link
                            to="/rooms/furniture"
                            state={room.id}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            Furniture
                          </Link>
                        </Button>
                        <Button
                          variant="danger"
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
                                deletion(room.id);
                                Swal.fire(
                                  "Deleted!",
                                  "Your room has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </MDBCol>
      <MDBCol
        md="4"
        className="text-center"
        style={{
          backgroundColor: "#EDEDE9",
          height: "100vh",
        }}
      >
        <br />
        <br />
        <h1>Welcome, {username}</h1>
        <br/>

      <div className="d-grid gap-2">
        <Button type="button" variant="success" size="lg" onClick={handleShowRoom}>
          Add a Room
        </Button>
      </div>
          <Modal show={showRoom} onHide={handleCloseRoom}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <RoomsForm handleSubmit={handleSubmit}/>
            </Modal.Body>
          </Modal>
        <br/>


      <div className="d-grid gap-2">
        <Button type="button" variant="warning" size="lg" onClick={handleShowUpdate}>
          Update a Room
        </Button>
      </div>
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <UpdateRoomForm handleSubmit={handleSubmit}/>
          </Modal.Body>
        </Modal>
      <br/>


        <div className="d-grid gap-2">
          <Button type="button" variant="info" size="lg" onClick={handleShowFurniture}>
            Add Furniture
          </Button>
        </div>
          <Modal show={showFurniture} onHide={handleCloseFurniture}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <FurnitureForm handleSubmit={handleSubmit}/>
            </Modal.Body>
          </Modal>
      </MDBCol>
    </MDBRow>
  );
}
