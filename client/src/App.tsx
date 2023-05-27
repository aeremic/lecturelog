import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Common/Loader";
import PrivateRoute from "./components/Common/PrivateRoute";
import Login from "./components/Login";
import Main from "./components/Login";
import Users from "./components/Admin/Users";
import Subjects from "./components/Admin/Subjects";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/subjects" element={<Subjects />} />
          {/* <PrivateRoute path="/">
            <Main />
          </PrivateRoute> */}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
