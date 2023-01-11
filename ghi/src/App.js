import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsList from "./Rooms/RoomsList";
import SignUpForm from "./Accounts/SignUpForm";
import Nav from "./Nav";
import Dashboard from "./Rooms/Dashboard";
import LoginForm from "./Accounts/LoginForm";
import { AuthProvider, useToken } from "./Accounts/Auth";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
<<<<<<< HEAD
      <AuthProvider>
        <GetToken />
      <BrowserRouter>
        <Nav />
        <div className="container">
            <Routes>
              <Route path="/rooms" element={<RoomsList />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
=======
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
          <div className="container">
            <Routes>
              <Route path="/rooms" element={<RoomsList />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </div>
      </AuthProvider>
    </BrowserRouter>
>>>>>>> main
  );
}

export default App;
