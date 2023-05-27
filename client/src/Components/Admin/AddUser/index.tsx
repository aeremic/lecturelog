import { Box, Card, CardContent, ThemeProvider } from "@mui/material";
import Content from "./Content";
import theme from "../../../styles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../Common/ErrorComponent";
import Header from "../../Common/Header";

const AddUser = () => {
  return (
    <>
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
    </>
  );
};

export default AddUser;
