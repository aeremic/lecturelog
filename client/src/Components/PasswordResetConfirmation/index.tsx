import { Alert, AlertColor, Snackbar, ThemeProvider } from "@mui/material";
import theme from "../../styles";
import Content from "./Content";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Common/ErrorComponent";
import { useState } from "react";

const PasswordResetConfirmation = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Content
          setOpenAlert={setOpenAlert}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
        />
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default PasswordResetConfirmation;
