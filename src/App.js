import "./App.css";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import List from './components/Table'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App dark:bg-gray-800 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dash />}>
            <Route path="/create" element={<Users />}></Route>          
            <Route path="/users" element={<List/>}></Route>
          </Route>
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
