import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const { token } = useAuthContext();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/{room_id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return <div>This is a single Rooms view</div>;
}
