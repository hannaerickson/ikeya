import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Accounts/Auth";

const FurnitureForm = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [room_id, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictureUrl(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, picture_url, room_id };
    console.log(data);

    const furnitureUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/furniture/`;
    const fetchConfig = {
      method: "POST",
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

      setName("");
      setPictureUrl("");
      setRoomId("");
      handleClose();
      window.location.reload();
    }
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
      const fetchConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
        <div className="p-3">
          <h1>New Furniture</h1>
          <br/>
          <form onSubmit={handleSubmit} id="create-furniture-form">
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
            <button className="btn btn-outline-info d-block mx-auto">
              Create!
            </button>
          </form>
        </div>
      </div>
  );
};

export default FurnitureForm;
