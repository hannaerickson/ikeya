//Function
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { Link } from "react-router-dom";

//Form
import UpdateRoomForm from "../ModalForms/UpdateRoom";
import RoomsForm from "../ModalForms/RoomsForm";
import FurnitureForm from "../ModalForms/FurnitureForm";

//Styling
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import "../CSS/Style.css";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState(null);
  const { token } = useAuthContext();
  const { handleSubmit } = useState();
  const [showRoom, setShowRoom] = useState(false);
  const [showFurniture, setShowFurniture] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [id, setId] = useState("");

  const handleCloseRoom = () => setShowRoom(false);
  const handleShowRoom = () => setShowRoom(true);
  const handleCloseFurniture = () => setShowFurniture(false);
  const handleShowFurniture = () => setShowFurniture(true);
  const handleCloseUpdate = () => setShowUpdate(false);

  const handleShowUpdate = () => {
    setShowUpdate(true)
  };

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
    <div>
      <br />
      <h1>Welcome back, {username}</h1>
      <div className="d-grid gap-2">
        <div className="btn-group">
          <button onClick={handleShowRoom} className="btn btn-orange m-1">
            Create A Room
          </button>
          <Modal show={showRoom} onHide={handleCloseRoom}>
            <Modal.Body>
              <RoomsForm handleSubmit={handleSubmit} />
            </Modal.Body>
          </Modal>

          <button onClick={handleShowFurniture} className="btn btn-green m-1">
            Create Furniture
          </button>
          <Modal show={showFurniture} onHide={handleCloseFurniture}>
            <Modal.Body>
              <FurnitureForm handleSubmit={handleSubmit} />
            </Modal.Body>
          </Modal>
        </div>
        <br />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {list?.map((room) => {
            return (
              <div className="col" key={room.id}>
                <div className="card bg-light mb-3 text-center h-100">
                  <img
                    src={room.picture_url}
                    className="card-img-top card-image"
                    alt="Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text crop-text-1">{room.description}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-blue btn-sm m-1">
                      <Link
                        to="/rooms/furniture"
                        state={room.id}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Furniture
                      </Link>
                    </button>

                    <button onClick={(e) => {setId(e.target.value); handleShowUpdate();}}
                      value={room.id}
                      className="btn btn-yellow btn-sm m-1">Update</button>

                    <Modal show={showUpdate} onHide={handleCloseUpdate}>
                      <Modal.Body>
                        <UpdateRoomForm id={id} handleSubmit={handleSubmit} />
                      </Modal.Body>
                    </Modal>

                    <Button
                      variant="btn-sm m-1"
                      className="btn-red btn-sm text-right"
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
