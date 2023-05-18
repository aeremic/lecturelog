import React from "react";
import Loader from "../Common/Loader";
import Header from "../Common/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";

const Subjects = () => {
  return (
    <>
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
    </>
  );
};

export default Subjects;
