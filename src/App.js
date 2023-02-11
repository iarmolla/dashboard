import "./App.css";
import Dashboard from "./components/Dashboard";
import Data from "./components/Data";
import Users from "./components/Users";
import List from './components/Table'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/Error";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Dash />
          </ProtectedRoute>}>
            <Route path="/create" element={<Users />}></Route>
            <Route path="/" element={<List />}></Route>
            <Route path="/data" element={<Data />}></Route>
          </Route>
          <Route path="/login"element={<Login/>} ></Route>
          <Route path="/register"element={<Register/>} ></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Dash() {
  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );
}

export default App;
