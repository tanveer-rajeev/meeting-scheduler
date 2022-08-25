import "./App.css";
import SignInSide from "./Components/Login/SignIn";
import { createContext } from "react";
import Layout from "./Components/Layout/Layout";
import DisplayRooms from "./Components/Room/DisplayRooms";
import {
  Routes,
  BrowserRouter,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./Components/Dashboard/Home";
import { JWT_Decode } from "./Components/Utilities/LoggedInUserInfo";
import AddRoom from "./Components/Room/AddRoom";

export const UserContext = createContext();

const ProtectedRoute = ({ user }) => {
  // const name = user();

  if (user() == null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App = () => {
  console.log("hi");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignInSide />} />
        <Route path="login" element={<SignInSide />} />
        <Route element={<ProtectedRoute user={JWT_Decode} />}>
          <Route element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="ongoingScheduled" element={<DisplayRooms />} />
            <Route path="addRoom" element={<AddRoom />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
