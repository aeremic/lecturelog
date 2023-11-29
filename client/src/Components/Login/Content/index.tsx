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
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { RoleEnum } from "../../../models/Enums";
import { ILoginFormInput } from "../../../models/FormInputs/ILoginFormInput";
import {
  getAccessTokenData,
  login,
  setUserData,
} from "../../../services/HttpService/AuthService";
import { useTranslation } from "react-i18next";
import Logo from "../../Common/Logo";
import { getUserData } from "../../../services/HttpService/UsersService";
import { IUserData } from "../../../models/IUserData";

const Content = () => {
  const [queryParameters] = useSearchParams();
  const { t } = useTranslation();

  const emailRegistrationSuccess: boolean =
    queryParameters.get("registration-success") == "true";

  const passwordChangeSuccess: boolean =
    queryParameters.get("change-success") == "true";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const initUserData = async (id: number) => {
    const userDataRes: any = await getUserData(id);
    if (
      userDataRes &&
      userDataRes.status &&
      userDataRes.status === HttpStatusCode.Ok &&
      userDataRes.data
    ) {
      const modelToSet: IUserData = {
        firstname: userDataRes.data.firstname,
        lastname: userDataRes.data.lastname,
      };

      setUserData(modelToSet);
    }
  };

  const onSubmit = async (data: ILoginFormInput) => {
    const res: any = await login(data);
    if (res) {
      if (res.status && res.status === HttpStatusCode.Created) {
        const userData = getAccessTokenData();
        if (userData && userData.id) {
          await initUserData(userData.id);

          switch (userData.role) {
            case RoleEnum.Admin:
              navigate("/admin/users", { replace: true });
              break;
            case RoleEnum.Professor:
              navigate(`/professor/mysubjects`, {
                replace: true,
              });
              break;
            case RoleEnum.Student:
              navigate(`/student/home`, {
                replace: true,
              });
              break;
          }
        }
      } else if (res.status && res.status === HttpStatusCode.Unauthorized) {
        setAlertType("error");
        setAlertMessage(t("WrongCredentials"));
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(t("AlertFailureMessage"));
      setOpenAlert(true);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register", {
      replace: false,
    });
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword", {
      replace: false,
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
      <Card variant="outlined">
        <CardContent>
          <Container component="main">
            <Stack
              sx={{ flexGrow: 1, mb: 2 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Logo widthProp={75} heightProp={75} />
              <Typography variant="h4" component="div">
                {t("LectureLog")}
              </Typography>
            </Stack>
            <Typography component="h1" variant="h5">
              <LockOpenIcon fontSize="small" sx={{ mr: 0.5 }} />
              {t("LogIn")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            {emailRegistrationSuccess ? (
              <Alert severity="success" sx={{ width: 270 }}>
                {t("EmailRegistrationSuccess")}
              </Alert>
            ) : (
              <></>
            )}
            {passwordChangeSuccess ? (
              <Alert severity="success" sx={{ width: 270 }}>
                {t("PasswordChangeSuccess")}
              </Alert>
            ) : (
              <></>
            )}
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    type="email"
                    {...register("email", { required: true })}
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
                    label={t("PleaseEnterYourPassword")}
                    variant="outlined"
                    type="password"
                    {...register("password", { required: true })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <Stack direction={"row"} sx={{ mt: 0.4 }}>
                  <Typography variant="body2" sx={{ mt: 0.4 }}>
                    {t("DontHaveAnAccount")}
                  </Typography>
                  <Button size="small" onClick={handleRegisterClick}>
                    <Typography variant="body2">{t("RegisterHere")}</Typography>
                  </Button>
                </Stack>
                <FormGroup sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" type="submit">
                    {
                      // @ts-ignore
                      <LoginIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{t("LogIn")}</Typography>
                  </Button>
                </FormGroup>
                <Stack direction={"row"} sx={{ mt: 0.4 }}>
                  <Typography variant="body2" sx={{ mt: 0.4 }}>
                    {t("ForgotPassword")}
                  </Typography>
                  <Button size="small" onClick={handleForgotPasswordClick}>
                    <Typography variant="body2">{t("ClickHere")}</Typography>
                  </Button>
                </Stack>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
