import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Common/Loader";
import PrivateRoute from "./components/Common/PrivateRoute";
import Login from "./components/Login";
import Users from "./components/Admin/Users";
import Subjects from "./components/Admin/Subjects";
import EmailRegistration from "./components/EmailRegistration";
import Subject from "./components/Admin/Subjects/Content/Subject";
import MySubjects from "./components/Professor/MySubjects";
import Profile from "./components/User/Profile";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          /**Login flow routes */
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailregistration" element={<EmailRegistration />} />
          /**User routes */
          <Route path="/user/profile" element={<Profile />} />
          /**Admin routes */
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/subjects" element={<Subjects />} />
          <Route path="/admin/subjects/subject" element={<Subject />} />
          /**Professorr routes */
          <Route path="/professor/mysubjects" element={<MySubjects />} />
          {/* <PrivateRoute path="/">
            <Main />
          </PrivateRoute> */}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
