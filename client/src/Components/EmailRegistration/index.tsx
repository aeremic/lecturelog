import { Box, Card, CardContent, ThemeProvider } from "@mui/material";
import theme from "../../styles/index";
import Header from "../Common/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import Content from "./Content";

const EmailRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 8, flexGrow: 1 }}
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

export default EmailRegistration;
