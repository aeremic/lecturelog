import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  NewAccountSuccess,
  AlertFailureMessage,
  NewAccountAddedSuccessfull,
  WrongCredentials,
  DidntReceiveAnEmail,
  SendAgain,
  AlertSuccessfullMessage,
  Ok,
} from "../../../resources/Typography";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { ILoginFormInput } from "../../../modelHelpers/LoginFormInput";
import {
  getCurrentUserData,
  login,
} from "../../../services/HttpService/AuthService";
import { sendEmailVerification } from "../../../services/HttpService/UsersService";
import ConfirmationDialog from "../../Common/ConfirmationDialog";

const Content = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const handleSendEmailAgainClick = async () => {
    if (userId != -1) {
      const res: any = await sendEmailVerification(userId);
      if (
        res &&
        res.status &&
        res.status === HttpStatusCode.Created &&
        res.data
      ) {
        setConfirmationDialogOpen(true);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(AlertFailureMessage);
      setOpenAlert(true);
    }
  };

  const handleConfirmationDialogClose = async (value?: any) => {
    setConfirmationDialogOpen(false);
    navigate("/login", {
      replace: true,
    });
  };

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 8, flexGrow: 1 }}
    >
      <Card variant="outlined" sx={{ width: 365 }}>
        <CardContent>
          <Container component="main">
            <Typography component="h1" variant="h5">
              <CheckIcon fontSize="small" sx={{ mr: 0.5 }} />
              {NewAccountAddedSuccessfull}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <Alert severity="success" sx={{ width: 270 }}>
              {NewAccountSuccess}
            </Alert>
            <Stack direction={"row"} sx={{ mt: 0.4 }}>
              <Typography variant="body2" sx={{ mt: 0.4 }}>
                {DidntReceiveAnEmail}
              </Typography>
              <Button size="small" onClick={handleSendEmailAgainClick}>
                <Typography variant="body2">{SendAgain}</Typography>
              </Button>
            </Stack>
          </Container>
          <ConfirmationDialog
            id="confirmation-subject-menu"
            keepMounted
            open={confirmationDialogOpen}
            title={AlertSuccessfullMessage}
            positiveAction={Ok}
            value={-1}
            onClose={handleConfirmationDialogClose}
          />{" "}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
