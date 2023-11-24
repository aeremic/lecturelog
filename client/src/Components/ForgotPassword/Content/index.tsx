import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import useCurrentUserIdentifier from "../../../hooks/UseCurrentUserIdentifier";
import { IForgotPasswordFormInput } from "../../../models/FormInputs/IForgotPasswordFormInput";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import { IForgotPassword } from "../../../models/IForgotPassword";
import { sendPasswordResetEmail } from "../../../services/HttpService/UsersService";

const forgotPasswordInitialState: IForgotPasswordFormInput = {
  email: "",
};

const Content = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userId = useCurrentUserIdentifier();

  const [forgotPassword, setForgotPassword] =
    useState<IForgotPasswordFormInput>(forgotPasswordInitialState);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const handleEmailChange = (event: any) => {
    setForgotPassword({
      email: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setConfirmationDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setConfirmationDialogOpen(false);
    if (newValue) {
      const modelToPost: IForgotPassword = {
        email: forgotPassword.email,
      };

      const res: any = await sendPasswordResetEmail(modelToPost);
      if (
        res &&
        res.status &&
        res.status === HttpStatusCode.Created &&
        res.data &&
        res.data.id > 0
      ) {
        navigate(`/passwordresetemailconfirmation`, {
          replace: false,
        });
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
        setOpenAlert(true);
      }
    }
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
      <Card variant="outlined">
        <CardContent>
          <Container component="main">
            <Stack
              sx={{ flexGrow: 1, mb: 2 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Stack>
            <Typography component="h1" variant="h5">
              <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
              {t("ResetPassword")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <AlternateEmailIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("Email")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterYourEmail")}
                    variant="outlined"
                    type="text"
                    value={forgotPassword.email}
                    onChange={handleEmailChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    color="success"
                    disabled={forgotPassword.email === ""}
                  >
                    {
                      // @ts-ignore
                      <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{t("Save")}</Typography>
                  </Button>
                </FormGroup>
              </form>
            </FormControl>
          </Container>
          <ConfirmationDialog
            id="edit-user-confirmation-menu"
            keepMounted
            open={confirmationDialogOpen}
            title={t("SendResetPasswordEmail")}
            content={t("AreYouSure")}
            negativeAction={t("Cancel")}
            positiveAction={t("Yes")}
            value={1}
            onClose={handleRemoveDialogClose}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
