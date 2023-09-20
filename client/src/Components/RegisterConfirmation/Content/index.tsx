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
              <Button size="small" href="register">
                <Typography variant="body2">{SendAgain}</Typography>
              </Button>
            </Stack>
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
