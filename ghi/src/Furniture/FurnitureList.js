import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function FurnitureList(props) {
    const { token } = useAuthContext();
    const [furniture, setFurniture] = useState([]);
    const [roomId, setRoomId] = useState('');

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${props.roomId}/furniture`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            setFurniture(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [roomId, token]);

    return (
        <div>
            <p>asjdfhakjdhf</p>
        </div>
    )
}

export default FurnitureList;
