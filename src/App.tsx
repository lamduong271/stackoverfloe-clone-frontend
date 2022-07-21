import React, { FC, ReactElement } from "react";
import Login from "./Components/Login/Login";

import { AppContextProvider, useAppContext } from "./Services/app-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import QuestionList from "./Components/Question/QuestionList/QuestionList";
import QuestionDetail from "./Components/Question/QuestionDetails/QuestionDetail";
import PostQuestion from "./Components/Question/PostQuestion/PostQuestion";

const ProtectedRoutes: FC<{ component: ReactElement }> = ({ component }) => {
  const { jwtToken } = useAppContext();
  const localslToken = localStorage.getItem("jwtToken");
  const auth = jwtToken || localslToken;

  return auth ? component : <Navigate to="/login" />;
};

const Components = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<ProtectedRoutes component={<Home />} />} /> */}
          <Route
            path="/post-question"
            element={<ProtectedRoutes component={<PostQuestion />} />}
          />
          <Route path="/" element={<QuestionList />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          {/* <Route path='/posts/:sender' element={<ProtectedRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

function App() {
  return (
    <AppContextProvider>
      <Header></Header>
      <Components />
    </AppContextProvider>
  );
}

export default App;
