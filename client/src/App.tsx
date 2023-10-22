import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Common/Loader";
import PrivateRoute from "./components/Common/PrivateRoute";
import Login from "./components/Login";
import Users from "./components/Admin/Users";
import EmailRegistration from "./components/EmailRegistration";
import MySubjects from "./components/Professor/MySubjects";
import Profile from "./components/User/Profile";
import LectureRoom from "./components/Professor/LectureRoom";
import Register from "./components/Register";
import RegisterConfirmation from "./components/RegisterConfirmation";
import Subject from "./components/Professor/Subject";
import AvailableSubjects from "./components/Student/AvailableSubjects";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          /**Login flow routes */
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailregistration" element={<EmailRegistration />} />
          /**Register flow routes */
          <Route path="/register" element={<Register />} />
          <Route
            path="/registerconfirmation"
            element={<RegisterConfirmation />}
          />
          /**User routes */
          <Route path="/user/profile" element={<Profile />} />
          /**Admin routes */
          <Route path="/admin/users" element={<Users />} />
          /**Professor routes */
          <Route path="/professor/mysubjects" element={<MySubjects />} />
          <Route path="/professor/subject" element={<Subject />} />
          <Route path="/professor/lecture" element={<LectureRoom />} />
          /**Student routes */
          <Route path="/student/home" element={<AvailableSubjects />} />
          {/* <PrivateRoute path="/">
            <Main />
          </PrivateRoute> */}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
