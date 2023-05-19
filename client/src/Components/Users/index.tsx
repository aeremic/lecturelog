import React from "react";
import Loader from "../Common/Loader";
import Header from "../Common/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import Content from "./Content";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../styles/Common";

const Users = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content />
        {/* <Wrapper>
        <Sidebar />
        <ErrorBoundary>
          <React.Suspense fallback={<Loader />}>
            <Content />
          </React.Suspense>
        </ErrorBoundary>
      </Wrapper> */}
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Users;
