import React from "react";
import "./App.css";
import Loader from "./Components/Common/Loader";
import { BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
