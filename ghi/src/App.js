import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsList from "./Rooms/RoomsList";
import Nav from "./Nav";
import Main from "./Main";
import Dashboard from "./Rooms/Dashboard";
import { AuthProvider, useToken } from "./Accounts/Auth";
import LogoutComponent from "./Accounts/Logout";
import RoomView from "./Rooms/RoomsView";
import FurnitureList from "./Furniture/FurnitureList";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="/rooms/furniture" element={<FurnitureList />} />
            <Route path="/rooms/:room_id" element={<RoomView />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
