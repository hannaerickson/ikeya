import React from 'react';
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState("");
  const { token } = useAuthContext();
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
      setSelectedRoomId(data[0]["id"])
      setUsername(data[0]["username"])
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);


  return (
    <MDBRow>
      <MDBCol md='8' style={{
            backgroundColor: 'white',
            height: '100vh',
        }}>
        <br/>
        <h1>My Rooms</h1>
        <br/>
        <table className="table table-striped">
            <thead>
            <tr className="table-success">
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>URL</th>
            </tr>
            </thead>
            <tbody>
            {list.map((room) => {
                return (
                    <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.description}</td>
                    <td>{room.picture_url}</td>
                    <td><button onClick={() => setSelectedRoomId(room.id)}>Furniture</button></td>
                    </tr>
                );
                })}
            </tbody>
      </table>
      </MDBCol>
      <MDBCol md='4' className='text-center' style={{
            backgroundColor: '#EDEDE9',
            height: '100vh',}}>
        <br />
        <h1>Welcome, {username}</h1>
      </MDBCol>
    </MDBRow>
  );
}
export default Dashboard;
