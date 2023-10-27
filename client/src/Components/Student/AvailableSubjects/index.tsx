import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../styles";
import Header from "../../Common/Header";
import ErrorComponent from "../../Common/ErrorComponent";
import { Content } from "./Content";
import { useEffect, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { connect } from "../../../services/MessagingService";
import useCurrentUserRole from "../../../hooks/UseCurrentUserRole";
import { RoleEnum } from "../../../models/Enums";

const AvailableSubjects = () => {
  const userRole = useCurrentUserRole();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    if (userRole == RoleEnum.Student) {
      connect();
    }
  });

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
      <Header />
      <ErrorBoundary fallback={<ErrorComponent />}>
        {userRole == RoleEnum.Student ? (
          <>
            <Content
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
              setAlertType={setAlertType}
            />
          </>
        ) : (
          <></>
        )}

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

export default AvailableSubjects;
