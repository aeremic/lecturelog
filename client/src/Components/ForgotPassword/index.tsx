import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@mui/material/styles";
import Content from "./Content";
import theme from "../../styles";
import ErrorComponent from "../Common/ErrorComponent";

const ForgotPassword = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default ForgotPassword;
