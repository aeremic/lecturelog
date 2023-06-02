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
import {
  AlertFailureMessage,
  Email,
  EmailRegistrationSuccess,
  LogIn,
  Password,
  PleaseEnterYourEmail,
  PleaseEnterYourPassword,
  WrongCredentials,
} from "../../../resources/Typography";
import { useForm } from "react-hook-form";
import { login } from "../../../services/Common/Auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";

interface ILoginFormInput {
  email: string;
  password: string;
}

const Content = () => {
  const [queryParameters] = useSearchParams();
  let emailRegistrationSuccess: boolean =
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
    let res: any = await login(data);
    if (res) {
      if (res.status && res.status === HttpStatusCode.Created) {
        navigate("/admin/users", { replace: true });
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
        <Typography textAlign="center" variant="h3">
          Logo
        </Typography>
        <Typography component="h1" variant="h5">
          {LogIn}
        </Typography>
        <Divider sx={{ m: 2 }} />
        {emailRegistrationSuccess ? (
          <Alert severity="success">{EmailRegistrationSuccess}</Alert>
        ) : (
          <></>
        )}
        <FormControl sx={{ minWidth: "300px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Email}</FormLabel>
              <TextField
                label={PleaseEnterYourEmail}
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
              >
                {errors?.email?.type === "required" && (
                  <Typography>This field is required</Typography>
                )}
              </TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Password}</FormLabel>
              <TextField
                label={PleaseEnterYourPassword}
                variant="outlined"
                type="password"
                {...register("password", { required: true })}
              >
                {errors?.email?.type === "required" && (
                  <Typography>This field is required</Typography>
                )}
              </TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <Button variant="contained" size="large" type="submit">
                {LogIn}
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
