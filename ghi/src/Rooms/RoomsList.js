import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { Link } from "react-router-dom";

//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

function RoomsList() {
  const { token } = useAuthContext();
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState(null);

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
      <br />
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
    </MDBCol>
    <MDBCol md="4" className="text-center" style={{backgroundColor: "#EDEDE9", height: "100vh"}}>
      <br/>
      <h1>Welcome, {username}</h1>
      <h4>You are currently viewing all rooms.</h4>
      <br/>
      <input type="search" placeholder="Search by room name" className="form-control"
        onChange={(e) => setQuery(e.target.value)}/>
      <br/>
      <div className="d-grid gap-2"><button className="btn btn-secondary btn-lg">
        <Link to="/dashboard" style={{textDecoration: "none", color: "white"}}>
        Back to Dashboard
        </Link>
      </button></div>
    </MDBCol>
  </MDBRow>
  );
}

export default RoomsList;
