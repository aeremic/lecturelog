import {
  Box,
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../../styles";
import Content from "./Content";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import Header from "../Common/Header";

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 20, flexGrow: 1 }}
        >
          <Card variant="outlined">
            <CardContent>
              <Content />
            </CardContent>
          </Card>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Login;
