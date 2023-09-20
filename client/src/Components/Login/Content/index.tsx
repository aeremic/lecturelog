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
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AlertFailureMessage,
  DontHaveAnAccount,
  Email,
  EmailRegistrationSuccess,
  LogIn,
  Password,
  PleaseEnterYourEmail,
  PleaseEnterYourPassword,
  RegisterHere,
  WrongCredentials,
} from "../../../resources/Typography";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { ILoginFormInput } from "../../../modelHelpers/LoginFormInput";
import {
  getCurrentUserData,
  login,
} from "../../../services/HttpService/AuthService";

const Content = () => {
  const [queryParameters] = useSearchParams();
  const emailRegistrationSuccess: boolean =
    queryParameters.get("success") == "true";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const onSubmit = async (data: ILoginFormInput) => {
    const res: any = await login(data);
    if (res) {
      if (res.status && res.status === HttpStatusCode.Created) {
        const userData = getCurrentUserData();
        if (userData.id) {
          switch (userData.role) {
            case RoleEnum.Admin:
              navigate("/admin/users", { replace: true });
              break;
            case RoleEnum.Professor:
              navigate(`/professor/mysubjects?id=${userData.id}`, {
                replace: true,
              });
              break;
            case RoleEnum.Student:
              navigate(`/student/availablesubjects?id=${userData.id}`, {
                replace: true,
              });
              break;
          }
        }
      } else if (res.status && res.status === HttpStatusCode.Unauthorized) {
        setAlertType("error");
        setAlertMessage(WrongCredentials);
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(AlertFailureMessage);
      setOpenAlert(true);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register", {
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
            <Typography textAlign="center" variant="h3">
              Logo
            </Typography>
            <Typography component="h1" variant="h5">
              <LockOpenIcon fontSize="small" sx={{ mr: 0.5 }} />
              {LogIn}
            </Typography>
            <Divider sx={{ m: 2 }} />
            {emailRegistrationSuccess ? (
              <Alert severity="success" sx={{ width: 270 }}>
                {EmailRegistrationSuccess}
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
                    {Email}
                  </FormLabel>
                  <TextField
                    label={PleaseEnterYourEmail}
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
                    {Password}
                  </FormLabel>
                  <TextField
                    label={PleaseEnterYourPassword}
                    variant="outlined"
                    type="password"
                    {...register("password", { required: true })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <Stack direction={"row"} sx={{ mt: 0.4 }}>
                  <Typography variant="body2" sx={{ mt: 0.4 }}>
                    {DontHaveAnAccount}
                  </Typography>
                  <Button size="small" onClick={handleRegisterClick}>
                    <Typography variant="body2">{RegisterHere}</Typography>
                  </Button>
                </Stack>
                <FormGroup sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" type="submit">
                    {
                      // @ts-ignore
                      <LoginIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{LogIn}</Typography>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
