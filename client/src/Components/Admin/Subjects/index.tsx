import React from "react";
import Loader from "../Common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@mui/material";
import Content from "./Content";
import theme from "../../../styles";
import Header from "../../Common/Header";
import ErrorComponent from "../../Common/ErrorComponent";

const Subjects = () => {
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

export default Subjects;
