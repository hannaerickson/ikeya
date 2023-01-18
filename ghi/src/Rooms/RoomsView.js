import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function RoomView() {
  const [furniture, setFurniture] = useState("");
  const [furniture_name, setFurnitureName] = useState("");
  const [furniture_picture, setFurniturePictureUrl] = useState("");

  const [room_id, setRoomId] = useState("");
  const [room_name, setRoomName] = useState("");
  const [room_description, setRoomDescription] = useState("");
  const [room_picture, setRoomPictureUrl] = useState("");

  const [show, setShow] = useState(false);

  const { token } = useAuthContext();

  const fetchFurnitureData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}/furniture`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setFurniture(data);
      setFurnitureName(data[1]["name"]);
      setFurniturePictureUrl(data[2]["picture_url"]);
    }
  };

  const fetchRoomData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}`;
    const response = await fetch(url, {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setRoomId(data[0]["id"]);
      setRoomName(data[1]["name"]);
      setRoomDescription(data[2]["description"]);
      setRoomPictureUrl(data[3]["picture_url"]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: furniture_name,
      picture_url: furniture_picture,
      room_id: room_id,
    };

    const furnitureUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/furniture/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(furnitureUrl, fetchConfig);
    if (response.ok) {
      const newFurniture = await response.json();
      console.log(newFurniture);
      fetchFurnitureData();
    }
  };

  const handleDelete = async (furniture_id) => {
    const resp = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}/furniture/${furniture_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.ok) {
      fetchFurnitureData();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchRoomData();
    fetchFurnitureData();
  }, [token]);

  return (
    <>
      <br></br>
      <h1>room.name</h1>
      <h2>room.description</h2>
      <br></br>
      <br></br>
      <Container>
        <Row>
          {furniture.length === 0 ? (
            <div>No Furniture Found</div>
          ) : (
            furniture.map((furniture) => (
              <Col key={furniture.id}>
                <Card className="bg-black text-white">
                  <Card.Img variant="top" src={furniture.picture_url} />
                  <Card.Body>
                    <div className="text-center">
                      <Card.Text className="text-right">
                        {furniture_name}{" "}
                      </Card.Text>

                      <Button
                        variant="outline-danger"
                        className="text-right"
                        onClick={() => {
                          handleDelete(furniture.id);
                        }}
                      >
                        Delete from room
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row>{/* ... */}</Row>
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
          Add Furniture to Room
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Furniture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={furniture_name}
                onChange={(e) => setFurnitureName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Picture URL"
                value={furniture_picture}
                onChange={(e) => setFurniturePictureUrl(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
