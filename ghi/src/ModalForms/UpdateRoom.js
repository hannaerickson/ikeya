import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";

const UpdateRoomForm = (id) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const roomData = location.state;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [room_id, setRoomId] = useState("");
  const [username, setUserName] = useState(null);
  // const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictureUrl(event.target.value);
  };

  const handleUpdate = async (event, room_id) => {
    event.preventDefault();
    const data = { name, description, picture_url, username };
    const roomUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}`;
    const response = await fetch(roomUrl, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const updateRoom = await response.json();
      console.log(updateRoom);
      setRoomId(updateRoom.id);
      setName("");
      setDescription("");
      setPictureUrl("");
      setUserName();
      handleClose();
      window.location.reload();
    }
  };

  const handleClose = () => setShow(false);

  const fetchData = async (room_id) => {
    console.log(room_id);
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setPictureUrl(data.picture_url);
    }
  };

  const fetchConfig = {
    method: "GET",
    credentials: "include",
  };

  useEffect(() => {
    if (room_id) {
      console.log(room_id);
      fetchData(room_id);
    }
  }, [room_id]);

  return (
    <div className="row">
      <div className="p-3">
        <h1>Update Your Room</h1>
        <br />
        <form onSubmit={() => handleUpdate(room_id)} id="create-furniture-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleNameChange}
              placeholder="Name"
              required
              type="text"
              name="name"
              id="name"
              value={name}
              className="form-control"
            />
            <label htmlFor="name">Room Name</label>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleDescriptionChange}
              placeholder="Updated description"
              required
              type="textarea"
              name="description"
              id="description"
              value={description}
              className="form-control"
            />
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePictureChange}
              placeholder="picture_url"
              required
              type="text"
              name="picture_url"
              id="picture_url"
              value={picture_url}
              className="form-control"
            />
            <label htmlFor="picture_url">Picture URL</label>
          </div>
          <button className="btn btn-outline-warning d-block mx-auto">
            Update!
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
