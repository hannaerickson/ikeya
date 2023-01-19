import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../Accounts/Auth";

export default function RoomView() {
  const location = useLocation();
  const roomData = location.state;
  const { token, setToken } = useAuthContext();
  const [furnitures, setFurnitures] = useState([]);

  const getToken = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      localStorage.setItem("token", token);
    } else {
      setToken(storedToken);
    }
  };
  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${roomData}/furniture`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setFurnitures(data);
    }
  };

  useEffect(() => {
    getData();
    getToken();
  }, [token]);

  return (
    <>
      <h1>Room View</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {furnitures?.map((furniture) => {
            return (
              <tr key={furniture.id}>
                <td>{furniture.name}</td>
                <td>{furniture.picture_url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
