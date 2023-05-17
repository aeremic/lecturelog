import React from "react";
import Loader from "../Common/Loader";
import Header from "../Common/Header";

const Main = () => {
  return (
    <>
      <Header />
      {/* <Wrapper>
        <Sidebar />
        <ErrorBoundary>
          <React.Suspense fallback={<Loader />}>
            <Content />
          </React.Suspense>
        </ErrorBoundary>
      </Wrapper> */}
    </>
  );
};

export default Main;
