import React from "react";
import Loader from "../Common/Loader";
import Header from "../Common/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import { ThemeProvider } from "@mui/material";
import theme from "../../styles/Common";

const Subjects = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <p>Subjects!</p>
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
