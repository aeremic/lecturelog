import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Common/Loader";
import PrivateRoute from "./components/Common/PrivateRoute";
import Users from "./components/Users";
import Subjects from "./components/Subjects";
import Login from "./components/Login";
import Main from "./components/Login";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/subjects" element={<Subjects />} />
          {/* <PrivateRoute path="/">
            <Main />
          </PrivateRoute> */}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
