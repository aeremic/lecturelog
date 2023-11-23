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
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import useCurrentUserIdentifier from "../../../../hooks/UseCurrentUserIdentifier";
import ConfirmationDialog from "../../../Common/ConfirmationDialog";
import { IUpdateUserPassword } from "../../../../models/IUpdateUserPassword";
import { IPasswordChangeFormInput } from "../../../../models/FormInputs/IPasswordChangeFormInput";
import { updateUserPassword } from "../../../../services/HttpService/UsersService";
import { logout } from "../../../../services/HttpService/AuthService";

const passwordChangeInitialState: IPasswordChangeFormInput = {
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
};

const Content = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userId = useCurrentUserIdentifier();

  const [passwordChange, setPasswordChange] =
    useState<IPasswordChangeFormInput>(passwordChangeInitialState);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const handleCurrentPasswordChange = (event: any) => {
    setPasswordChange({
      currentPassword: event.target.value,
      newPassword: passwordChange.newPassword,
      repeatPassword: passwordChange.repeatPassword,
    });
  };

  const handleNewPasswordChange = (event: any) => {
    setPasswordChange({
      currentPassword: passwordChange.currentPassword,
      newPassword: event.target.value,
      repeatPassword: passwordChange.repeatPassword,
    });
  };

  const handleRepeatPasswordChange = (event: any) => {
    setPasswordChange({
      currentPassword: passwordChange.currentPassword,
      newPassword: passwordChange.newPassword,
      repeatPassword: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setConfirmationDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setConfirmationDialogOpen(false);
    if (userId > 0 && newValue) {
      const modelToPost: IUpdateUserPassword = {
        id: userId,
        currentPassword: passwordChange.currentPassword,
        newPassword: passwordChange.newPassword,
        repeatPassword: passwordChange.repeatPassword,
      };

      const res: any = await updateUserPassword(modelToPost);
      if (res) {
        if (
          res.status &&
          res.status === HttpStatusCode.Created &&
          res.data &&
          res.data.id
        ) {
          if (res.data.errorMessage) {
            setAlertType("error");
            setAlertMessage(res.data.errorMessage);
            setOpenAlert(true);
          } else if (res.data.id > 0) {
            logout();
            navigate(`/login?change-success=${true}`, { replace: true });
          }
        }
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
              {t("ChangePassword")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PasswordIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("CurrentPassword")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterYourCurrentPassword")}
                    variant="outlined"
                    type="password"
                    value={passwordChange.currentPassword}
                    onChange={handleCurrentPasswordChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PasswordIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("NewPassword")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterYourNewPassword")}
                    variant="outlined"
                    type="password"
                    value={passwordChange.newPassword}
                    onChange={handleNewPasswordChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PasswordIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("RepeatPassword")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseRepeatYourNewPassword")}
                    variant="outlined"
                    type="password"
                    value={passwordChange.repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    color="success"
                    disabled={
                      passwordChange.currentPassword === "" ||
                      passwordChange.newPassword === "" ||
                      passwordChange.repeatPassword === ""
                    }
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
            title={t("ChangePassword")}
            content={t("AreYouSure")}
            negativeAction={t("Cancel")}
            positiveAction={t("Yes")}
            value={userId}
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
