import {
  Alert,
  AlertColor,
  Button,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { HttpStatusCode } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IEmailRegistration } from "../../../models/IEmailRegistration";
import { useState } from "react";
import PasswordIcon from "@mui/icons-material/Password";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import { emailRegistration } from "../../../services/HttpService/UsersService";
import { useTranslation } from "react-i18next";

const Content = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailRegistration>();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const onSubmit = async (data: IEmailRegistration) => {
    const userId: string | null = queryParameters.get("id");
    data.userId = userId != null ? parseInt(userId) : -1;

    const res: any = await emailRegistration(data);
    if (res && res.status && res.status === HttpStatusCode.Created) {
      if (res.data) {
        navigate(`/login?success=${res.data}`, { replace: true });
      } else {
        setAlertType("error");
        setAlertMessage(t("ActivationFailed"));
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(t("AlertFailureMessage"));
      setOpenAlert(true);
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
    <>
      <Container component="main">
        <Typography component="h1" variant="h5">
          <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
          {t("RegistrationWithEmail")}
        </Typography>
        <Divider sx={{ m: 2 }} />
        <Typography variant="body1" sx={{ width: 270 }}>
          {t("EmailRegistrationSubtitle")}
        </Typography>
        <FormControl fullWidth sx={{ width: 300 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                {
                  // @ts-ignore
                  <VpnKeyIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("Code")}
              </FormLabel>
              <TextField
                label={t("PleaseEnterYourCode")}
                variant="outlined"
                type="text"
                {...register("code", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                {
                  // @ts-ignore
                  <PasswordIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("Password")}
              </FormLabel>
              <TextField
                label={t("PleaseEnterYourNewPassword")}
                variant="outlined"
                type="password"
                {...register("password", { required: true })}
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
                {...register("repeatedPassword", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <Button variant="contained" size="large" type="submit">
                {
                  // @ts-ignore
                  <LoginIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("Register")}
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Container>
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
    </>
  );
};

export default Content;
