import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Content from "./Content";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../../styles";
import Header from "../../Common/Header";
import ErrorComponent from "../../Common/ErrorComponent";

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
