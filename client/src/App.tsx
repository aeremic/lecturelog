import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import "./App.css";

import Loader from "./components/Common/Loader";
import PrivateRoute from "./components/Common/PrivateRoute";

const Main = React.lazy(() => import("./components/Main"));

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
