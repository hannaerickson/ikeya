import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function RoomsForm() {
    const { token } = useAuthContext();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picture_url, setPictureUrl] = useState("");
    const [username, setUserName] = useState(null);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const fetchConfig = {
        method: "GET",
        credentials: "include",
    }
    useEffect(() => {
        if (username === null ) {
        fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, fetchConfig)
            .then((res) => res.json())
            .then((res) => setUserName(res.account.username))
          }
    }, [username]);

    async function handleSubmit(e) {
        e.preventDefault();
        const room = { name, description, picture_url, username };
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(room),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        if (response.ok){
            const data = await response.json();
            setName("");
            setDescription("");
            setPictureUrl("");
            handleClose();
            window.location.reload();
        }
    };

    return (
        <div className="row">
            <div className="p-3">
                <h1>New Room</h1>
                <br/>
                    <div className="form-floating mb-3">
                        <input placeholder="name" required type="text" name="name" id="name" value = { name } onChange={(e) => setName(e.target.value)} className="form-control" />
                        <label htmlFor="name">Room Name</label>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Description">Description</label>
                        <textarea className="form-control" placeholder="Unique information about your room" required type="textarea" rows="4" name="description" id="description" value = { description } onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-floating mb-3">
                        <input placeholder="picture_url" required type="url" name="picture_url" id="picture_url" value = { picture_url } onChange={(e) => setPictureUrl(e.target.value)} className="form-control" />
                        <label htmlFor="name">Picture URL</label>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-orange d-block mx-auto">Create!</button>
            </div>
        </div>
  );
}
export default RoomsForm;
