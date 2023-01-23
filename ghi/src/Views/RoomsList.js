import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { useNavigate, Link } from "react-router-dom";

//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

function RoomsList() {
  const [list, setList] = useState([]);
  const { token } = useAuthContext();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
    }
  };

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [token]);

    const imageSize = {
      height: 250,
      width: 350,
    };


  return (
    <div>
      <br />
      <h1>Rooms</h1>
      <input
        type="search"
        placeholder="Search by room name"
        className="form-control"
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <Container>
        <Row className="mb-3">
          {list
            ?.filter((room) => room.name.toLowerCase().includes(query.toLowerCase()))
            .map((room) => {
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
        </MDBCol>
      </div>
    </div>
  );
}

export default RoomsList;
