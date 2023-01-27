//Function
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

//Form
import FurnitureForm from "../ModalForms/FurnitureForm";
import UpdateRoomForm from "../ModalForms/UpdateRoom";

//Styling
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Modal } from "react-bootstrap";

export default function RoomView() {
  const location = useLocation();
  const id = location.state;
  const { token } = useAuthContext();
  const [furnitures, setFurnitures] = useState([]);
  const [rooms, setRooms] = useState([]);
  const { handleSubmit } = useState();
  const [roomUserName, setUserName] = useState("");
  const [tokenUserName, setTokenUserName] = useState("");
  const [showFurniture, setShowFurniture] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseFurniture = () => setShowFurniture(false);
  const handleShowFurniture = () => setShowFurniture(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const getData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${id}/furniture`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const dataFurniture = await response.json();
      setFurnitures(dataFurniture);
    }
  };

  const getRoomData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${id}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const dataRooms = await response.json();
      setRooms(dataRooms);
      setUserName(dataRooms.username);
    }
  };

  const getTokenUserName = async () => {
    const response = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setTokenUserName(data.account.username);
    }
  }

  const deletion = async (id) => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/furniture/${id}`;
    const resp = await fetch(url, {
      credentials: "include",
      method: "DELETE",
    });
    const dataFurniture = await resp.json();
    getData();
  };

  useEffect(() => {
    getData();
    getRoomData();
    getTokenUserName();
  }, [token, roomUserName, tokenUserName]);


  return (
    <MDBRow>
      <MDBCol md="8" style={{ backgroundColor: "white", height: "100vh" }}>
        <br />
        {roomUserName === tokenUserName ? (
          <>
            <header className="p-3 text-center bg-light">
              <div className="col-md-12 gap-3">
                <button className="btn btn-gray m-2">
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "white" }}>
                    Dashboard
                  </Link>
                </button>

                <button onClick={handleShowFurniture} className="btn btn-blue m-2">Add Furniture</button>
                <Modal show={showFurniture} onHide={handleCloseFurniture}>
                  <Modal.Body>
                    <FurnitureForm id={id} handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>

                <button onClick={handleShowUpdate} className="btn btn-yellow m-2">Update</button>
                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                  <Modal.Body>
                    <UpdateRoomForm id={id} handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>

              </div>
            </header>
            <br></br>
          </>
        ) : (
          ""
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {furnitures.length ? (
            furnitures.map((furniture) => {
              return (
                <div className="col" key={furniture.id}>
                  <div className="card bg-light mb-3 text-center h-100">
                    <img src={furniture.picture_url} className="card-img-top card-image" alt="Image" />
                    <div className="card-body">
                      <h5 className="card-title">{furniture.name}</h5>
                    </div>
                    {roomUserName === tokenUserName ? (
                      <div className="card-footer">
                        <Button
                          variant="btn"
                          className="btn-red text-right"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#bb7e74",
                              cancelButtonColor: "#808080",
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
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-100">
              <figure className="figure">
                <img src="https://images2.imgbox.com/13/c6/JVWff3xJ_o.png" className="figure-img img-fluid rounded" />
              </figure>
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
          className="col-md-12"
        ></img>
        <br />
        <br />
        <h4>{rooms.description}</h4>
      </MDBCol>
    </MDBRow>
  );
}
