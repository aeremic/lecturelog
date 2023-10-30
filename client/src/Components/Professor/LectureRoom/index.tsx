import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../styles";
import Header from "../../Common/Header";
import ErrorComponent from "../../Common/ErrorComponent";
import { Content } from "./Content";
import { createContext } from "react";
import { CodeGenerationState } from "../../../models/Enums";

export const CurrentCodeStateContext = createContext({
  currentCodeState: CodeGenerationState.notGenerated,
  setCurrentCodeState: (state: CodeGenerationState) => {},
});

export const LectureRoom = () => {
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
