import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { Link } from "react-router-dom";
import UpdateRoomForm from "../ModalForms/UpdateRoom";
import RoomsForm from "../ModalForms/RoomsForm";
import { Modal } from "react-bootstrap";
import "../CSS/Style.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const { token } = useAuthContext();
  const [showRoom, setShowRoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [username, setUsername] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const handleCloseRoom = () => setShowRoom(false);
  const handleShowRoom = () => setShowRoom(true);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setSelectedRoom(null);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleSubmit = async (event) => {
    // Handle form submission
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

  const handleDelete = async (id) => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${id}`;
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    if (resp.ok) {
      fetchData();
      Swal.fire("Deleted!", "Your room has been deleted.", "success");
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setRoomId(room.id);
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
    <div className="d-grid gap-2">
      <div className="btn-group">
        <button onClick={handleShowRoom} className="btn btn-info m-1">
          Create A Room
        </button>
        <Modal show={showRoom} onHide={handleCloseRoom}>
          <Modal.Body>
            <RoomsForm handleSubmit={handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {list?.map((room) => (
          <div className="col" key={room.id}>
            <div className="card bg-light mb-3 text-center h-100">
              <div className="card-header d-flex justify-content-between">
                <button className="btn btn-outline-primary btn-sm m-1">
                  <Link
                    to="/rooms/furniture"
                    state={room.id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Furniture
                  </Link>
                </button>
                <div>
                  <button
                    onClick={handleShowModal}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </button>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <UpdateRoomForm
                      room={selectedRoom}
                      roomId={room.id}
                      onSelectRoom={handleSelectRoom}
                      onSubmit={handleSubmit}
                    />
                  </Modal>
                  <Button
                    variant="outline-danger btn-sm m-1"
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
                          handleDelete(room.id);
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
              <img
                src={room.picture_url}
                className="card-img-top card-image"
                alt="Image"
              />
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text crop-text-1">{room.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
