import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Common/Loader";
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
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { RoleEnum } from "./models/Enums";
import Loading from "./components/Common/Loading";

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          /**Login flow routes */
          <Route path="/" element={<Login />} /> /**TODO: Temporary*/
          <Route path="/login" element={<Login />} />
          <Route path="/emailregistration" element={<EmailRegistration />} />
          /**Register flow routes */
          <Route path="/register" element={<Register />} />
          <Route
            path="/registerconfirmation"
            element={<RegisterConfirmation />}
          />
          /**User routes */
          <Route
            path="/user/profile"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute
                  roles={[RoleEnum.Admin, RoleEnum.Professor, RoleEnum.Student]}
                >
                  <Profile />
                </PrivateRoute>
              </Suspense>
            }
          />
          /**Admin routes */
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute roles={[RoleEnum.Admin]}>
                  <Users />
                </PrivateRoute>
              </Suspense>
            }
          />
          /**Professor routes */
          <Route
            path="/professor/mysubjects"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute roles={[RoleEnum.Professor]}>
                  <MySubjects />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/professor/subject"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute roles={[RoleEnum.Professor]}>
                  <Subject />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/professor/lecture"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute roles={[RoleEnum.Professor]}>
                  <LectureRoom />
                </PrivateRoute>
              </Suspense>
            }
          />
          /**Student routes */
          <Route
            path="/student/home"
            element={
              <Suspense fallback={<Loading />}>
                <PrivateRoute roles={[RoleEnum.Student]}>
                  <AvailableSubjects />
                </PrivateRoute>
              </Suspense>
            }
          />
          {/* <PrivateRoute path="/">
            <Main />
          </PrivateRoute> */}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
