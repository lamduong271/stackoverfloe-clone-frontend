import React from "react";
import Login from "./Components/Login/Login";

import { AppContextProvider, useAppContext } from "./Services/app-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";

const ProtectedRoutes = () => {
  const { jwtToken } = useAppContext();
  const localslToken = localStorage.getItem("jwtToken");
  const auth = jwtToken || localslToken;

  return auth ? <Navigate to="/" /> : <Navigate to="/login" />;
};

const Components = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<ProtectedRoutes />} />
          {/* <Route path='/posts/:sender' element={<ProtectedRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

function App() {
  return (
    <AppContextProvider>
      <h1>Stackoverflow clone</h1>
      <Components />
    </AppContextProvider>
  );
}

export default App;
