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
import {
  AlertFailureMessage,
  Email,
  FirstName,
  Index,
  LastName,
  PleaseEnterEmail,
  PleaseEnterFirstName,
  PleaseEnterLastName,
  PleaseEnterStudentIndex,
  PleaseEnterStudentYear,
  Register,
  WrongCredentials,
  Year,
} from "../../../resources/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoginIcon from "@mui/icons-material/Login";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { IRegisterFormInput } from "../../../modelHelpers/IRegisterFormInput";
import { registerStudent } from "../../../services/HttpService/StudentsService";
import { IRegisterStudent } from "../../../modelHelpers/RegisterStudent";

const Content = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const onSubmit = async (data: IRegisterFormInput) => {
    const modelToPost: IRegisterStudent = {
      id: 0,
      firstname: data.firstname,
      lastname: data.lastname,
      role: RoleEnum.Student,
      email: data.email,
      index: data.index,
      year: data.year,
    };

    const res: any = await registerStudent(modelToPost);
    if (res) {
      if (res.status && res.status === HttpStatusCode.Created) {
        navigate("/registerconfirmation", { replace: true });
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
              {Register}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {FirstName}
                  </FormLabel>
                  <TextField
                    label={PleaseEnterFirstName}
                    variant="outlined"
                    type="text"
                    {...register("firstname", { required: true })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {LastName}
                  </FormLabel>
                  <TextField
                    label={PleaseEnterLastName}
                    variant="outlined"
                    type="text"
                    {...register("lastname", { required: true })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <AlternateEmailIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {Email}
                  </FormLabel>
                  <TextField
                    label={PleaseEnterEmail}
                    variant="outlined"
                    type="email"
                    {...register("email", { required: true })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <Stack direction="row">
                  <FormGroup sx={{ mt: 2, mr: 2 }}>
                    <FormLabel>
                      {
                        // @ts-ignore
                        <ContactPageIcon fontSize="xs" sx={{ mr: 0.5 }} />
                      }
                      {Index}
                    </FormLabel>
                    <TextField
                      label={PleaseEnterStudentIndex}
                      variant="outlined"
                      type="number"
                      {...register("index", {
                        required: true,
                        valueAsNumber: true,
                        validate: (value: any) => value > 0,
                      })}
                      sx={{ mt: 0.8 }}
                    ></TextField>
                  </FormGroup>
                  <FormGroup sx={{ mt: 2 }}>
                    <FormLabel>
                      {
                        // @ts-ignore
                        <CalendarMonthIcon fontSize="xs" sx={{ mr: 0.5 }} />
                      }
                      {Year}
                    </FormLabel>
                    <TextField
                      label={PleaseEnterStudentYear}
                      variant="outlined"
                      type="number"
                      {...register("year", {
                        required: true,
                        valueAsNumber: true,
                        validate: (value: any) => value > 0,
                      })}
                      sx={{ mt: 0.8 }}
                    ></TextField>
                  </FormGroup>
                </Stack>
                <FormGroup sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" type="submit">
                    {
                      // @ts-ignore
                      <LoginIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{Register}</Typography>
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
