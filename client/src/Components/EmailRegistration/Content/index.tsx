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
import {
  ActivationFailed,
  AlertFailureMessage,
  Code,
  EmailRegistrationSubtitle,
  Password,
  PleaseEnterYourCode,
  PleaseEnterYourNewPassword,
  PleaseRepeatYourNewPassword,
  Register,
  RegistrationWithEmail,
  RepeatPassword,
} from "../../../resources/Typography";
import { IEmailRegistration } from "../../../Models/EmailRegistration";
import { emailRegistration } from "../../../services/UsersService";
import { useState } from "react";

const Content = () => {
  const navigate = useNavigate();
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
    let userId: string | null = queryParameters.get("id");
    data.userId = userId != null ? parseInt(userId) : -1;

    let res: any = await emailRegistration(data);
    if (res && res.status && res.status === HttpStatusCode.Created) {
      if (res.data) {
        navigate(`/login?success=${res.data}`, { replace: true });
      } else {
        setAlertType("error");
        setAlertMessage(ActivationFailed);
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(AlertFailureMessage);
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
          {RegistrationWithEmail}
        </Typography>
        <Divider sx={{ m: 2 }} />
        <Typography variant="body1">{EmailRegistrationSubtitle}</Typography>
        <FormControl fullWidth sx={{ minWidth: "300px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Code}</FormLabel>
              <TextField
                label={PleaseEnterYourCode}
                variant="outlined"
                type="text"
                {...register("code", { required: true })}
              >
                {errors?.code?.type === "required" && (
                  <Typography>This field is required</Typography>
                )}
              </TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Password}</FormLabel>
              <TextField
                label={PleaseEnterYourNewPassword}
                variant="outlined"
                type="password"
                {...register("password", { required: true })}
              >
                {errors?.password?.type === "required" && (
                  <Typography>This field is required</Typography>
                )}
              </TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{RepeatPassword}</FormLabel>
              <TextField
                label={PleaseRepeatYourNewPassword}
                variant="outlined"
                type="password"
                {...register("repeatedPassword", { required: true })}
              >
                {errors?.repeatedPassword?.type === "required" && (
                  <Typography>This field is required</Typography>
                )}
              </TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <Button variant="contained" size="large" type="submit">
                {Register}
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
