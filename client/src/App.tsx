import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Admin/Users";
import EmailRegistration from "./components/EmailRegistration";
import MySubjects from "./components/Professor/MySubjects";
import Profile from "./components/User/Profile";
import Register from "./components/Register";
import RegisterConfirmation from "./components/RegisterConfirmation";
import Subject from "./components/Professor/Subject";
import AvailableSubjects from "./components/Student/AvailableSubjects";
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { RoleEnum } from "./models/Enums";
import LoadingComponent from "./components/Common/LoadingComponent";
import { LectureRoom } from "./components/Professor/LectureRoom";
import PasswordChange from "./components/User/PasswordChange";
import ForgotPassword from "./components/ForgotPassword";
import PasswordResetConfirmation from "./components/PasswordResetConfirmation";

const App = () => {
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <BrowserRouter>
        <Routes>
          /**Login flow routes */
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailregistration" element={<EmailRegistration />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/passwordresetconfirmation"
            element={<PasswordResetConfirmation />}
          />
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
              <Suspense fallback={<LoadingComponent />}>
                <PrivateRoute
                  roles={[RoleEnum.Admin, RoleEnum.Professor, RoleEnum.Student]}
                >
                  <Profile />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/user/password-change"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <PrivateRoute
                  roles={[RoleEnum.Admin, RoleEnum.Professor, RoleEnum.Student]}
                >
                  <PasswordChange />
                </PrivateRoute>
              </Suspense>
            }
          />
          /**Admin routes */
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<LoadingComponent />}>
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
              <Suspense fallback={<LoadingComponent />}>
                <PrivateRoute roles={[RoleEnum.Professor]}>
                  <MySubjects />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/professor/subject"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <PrivateRoute roles={[RoleEnum.Professor]}>
                  <Subject />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/professor/lecture"
            element={
              <Suspense fallback={<LoadingComponent />}>
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
              <Suspense fallback={<LoadingComponent />}>
                <PrivateRoute roles={[RoleEnum.Student]}>
                  <AvailableSubjects />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
