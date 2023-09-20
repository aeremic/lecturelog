import { ThemeProvider } from "@mui/material";
import theme from "../../styles";
import Content from "./Content";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import Header from "../Common/Header";

const RegisterConfirmation = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default RegisterConfirmation;
