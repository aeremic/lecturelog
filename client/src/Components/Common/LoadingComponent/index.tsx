import { ThemeProvider } from "@mui/material";
import theme from "../../../styles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../ErrorComponent";
import Content from "./Content";

const LoadingComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default LoadingComponent;
