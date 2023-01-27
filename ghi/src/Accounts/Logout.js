import { useToken } from "./Auth"
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutComponent() {
    const [token, , logout, ,] = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            logout(token);
            navigate("/")
        }
    })
}

export default LogoutComponent;
