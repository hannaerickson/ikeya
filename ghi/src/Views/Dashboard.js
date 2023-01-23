//Function
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { Link } from "react-router-dom";

//Form
import UpdateRoomForm from "../ModalForms/UpdateRoom";
import RoomsForm from "../ModalForms/RoomsForm";
import FurnitureForm from "../ModalForms/FurnitureForm";

//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";
import "../CSS/Style.css";

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
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setUsername(res.account.username));
    }
    fetchData();
  }, [token, username]);

  return (
    <>
      <MDBRow>
        <MDBRow>
          <MDBRow
            md="4"
            className="align-items-center justify-content-center"
            style={{
              backgroundColor: "#212529",
              height: "auto",
            }}
          >
            <div>
              <p className="text-center p margin">
                Welcome, {username}. Here you can{" "}
                <Button
                  type="button"
                  variant="success"
                  onClick={handleShowRoom}
                >
                  Add a Room
                </Button>
                {", "}
                <Modal show={showRoom} onHide={handleCloseRoom}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <RoomsForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
                {/* UPDATE */}
                <Button
                  type="button"
                  variant="warning"
                  onClick={handleShowUpdate}
                >
                  Update a Room
                </Button>
                <Modal show={showRoom} onHide={handleCloseRoom}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <RoomsForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
                {", "}
                {/* Furniture */}
                and{" "}
                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <UpdateRoomForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
                <Button
                  type="button"
                  variant="info"
                  onClick={handleShowFurniture}
                >
                  Add Furniture
                </Button>
                <Modal show={showFurniture} onHide={handleCloseFurniture}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <FurnitureForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
                {"."}
              </p>
            </div>
          </MDBRow>
        </MDBRow>

        <MDBCol md="8" style={{ backgroundColor: "white", height: "100vh" }}>
          <Container>
            <br />
            <br />
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
                          <Button variant="primary" className="text-right">
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
      </MDBRow>
    </>
  );
}
