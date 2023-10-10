import { ThemeProvider } from "@mui/material";
import theme from "../../styles";
import Content from "./Content";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";

const Register = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Register;
