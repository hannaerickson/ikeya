import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { useNavigate, Link } from "react-router-dom";

//Form
import UpdateRoomForm from "./UpdateRoom";

//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState("");
  const { token } = useAuthContext();
  const [show, setShow] = useState(false);
  const { handleSubmit } = useState();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
      setUsername(data[0]["username"]);
    }
  };

  const fetchUserData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
    });
    if (response.ok) {
      const accountData = await response.json();
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, [token]);

  return (
    <div>
      <Container>
        <Row className="mb-3">
          {list.map((room) => {
            return (
              <Col key={room.id}>
                <Card className="card bg-black text-white justify-content-center">
                  <Card.Img variant="top" src={room.picture_url} />
                  <Card.Body>
                    <div className="text-center">
                      <Card.Text className="text-right">{room.name}</Card.Text>

                      <Card.Text className="text-right">
                        {room.description}
                      </Card.Text>
                      <Button variant="outline-primary" className="text-right">
                        <Link
                          to="/rooms/furniture"
                          state={room.id}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          See Furniture
                        </Link>
                      </Button>
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
                        Delete Room
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div style={{ position: "absolute", right: 0, top: 30, zIndex: 2 }}>
        <MDBCol
          md="4"
          className="text-center"
          style={{
            backgroundColor: "#EDEDE9",
            height: "100vh",
          }}
        >
          <br />
          <h1>Welcome, {username}</h1>
          <Button type="button" variant="outline-warning" onClick={handleShow}>
            Update a Room
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <UpdateRoomForm handleSubmit={handleSubmit} />
            </Modal.Body>
          </Modal>
        </MDBCol>
      </div>
    </div>
  );
}
export default Dashboard;
