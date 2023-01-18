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
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [furniture, setFurniture] = useState([]);
  const { token } = useAuthContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/{room_id}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setFurniture(data.furniture);
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      picture_url: pictureUrl,
    };

    const furnitureUrl = "http://localhost:8000/api/furniture/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(furnitureUrl, fetchConfig);
    if (response.ok) {
      const newFurniture = await response.json();
      console.log(newFurniture);

      setName("");
      setPictureUrl("");
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "name") {
      setName(value);
    } else if (event.target.name === "picture_url") {
      setPictureUrl(value);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <br></br>
      <h1>room name</h1>
      <h2>room description</h2>
      <br></br>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right"> furniture.name </Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right">furniture.name</Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right">furniture.name</Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right">furniture.name</Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right">furniture.name</Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-black text-white">
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <Card.Body>
                <div class="text-center">
                  <Card.Text class="text-right">furniture.name</Card.Text>
                  <Button variant="outline-danger" class="text-right">
                    Delete from room
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
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
          Add Furniture to Room
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Furniture</Modal.Title>
          </Modal.Header>
          <Modal.Body>Coming soon: form to add furniture</Modal.Body>
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
