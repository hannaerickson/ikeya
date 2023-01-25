import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function FurnitureForm() {
  const { token } = useAuthContext();
  const [name, setName] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [room_id, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [setShow] = useState(true);
  const handleClose = () => setShow(false);

  const handleNameChange = (e) => {
    setName(e.target.value);};
  const handlePictureChange = (e) => {
    setPictureUrl(e.target.value);};
  const handleRoomChange = (e) => {
    setRoomId(e.target.value);};

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: {Authorization: `Bearer ${token}`}
    });
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    const furniture = {name, picture_url, room_id};
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/furniture/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(furniture),
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    });
    if (response.ok) {
      const data = await response.json();
      setName("");
      setPictureUrl("");
      setRoomId("");
      handleClose();
      window.location.reload();
    }
  };

  return (
    <div className="row">
      <div className="p-3">
        <h1>New Furniture</h1>
        <br />
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
            <label htmlFor="name">Name</label>
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
          <div className="mb-3">
            <select
              onChange={handleRoomChange}
              required
              name="room_id"
              id="room_id"
              value={room_id}
              className="form-select"
            >
              <option value="">Choose a room</option>
              {rooms.map((room) => {
                return (
                  <option value={room.id} key={room.id}>
                    {room.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={handleSubmit} className="btn btn-green d-block mx-auto">
            Create
          </button>
      </div>
    </div>
  );
};

export default FurnitureForm;
