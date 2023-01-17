import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsList from "./Rooms/RoomsList";
import SignUpForm from "./Accounts/SignUpForm";
import Nav from "./Nav";
import Main from "./Main";
import Dashboard from "./Rooms/Dashboard";
import LoginForm from "./Accounts/LoginForm";
import { AuthProvider, useToken } from "./Accounts/Auth";
import LogoutComponent from "./Accounts/Logout";

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
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/logout" element={<LogoutComponent />} />
                </Routes>
            </div>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
