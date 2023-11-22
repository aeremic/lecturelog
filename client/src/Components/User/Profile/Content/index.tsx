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
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import CheckIcon from "@mui/icons-material/Check";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTranslation } from "react-i18next";
import useCurrentUserIdentifier from "../../../../hooks/UseCurrentUserIdentifier";
import { IUpdateUser } from "../../../../models/IUpdateUser";
import { getCurrentUserData } from "../../../../services/HttpService/AuthService";
import { RoleEnum } from "../../../../models/Enums";
import {
  getUser,
  updateUser,
} from "../../../../services/HttpService/UsersService";
import ConfirmationDialog from "../../../Common/ConfirmationDialog";

const userInitialState: IUpdateUser = {
  id: 0,
  firstname: "",
  lastname: "",
  index: -1,
  year: -1,
};

const Content = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userId = useCurrentUserIdentifier();
  const userData = getCurrentUserData();

  const [user, setUser] = useState<IUpdateUser>(userInitialState);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    const getUserData = async () => {
      if (userId != -1) {
        const res: any = await getUser(userId);
        if (res && res.status && res.status === HttpStatusCode.Ok && res.data) {
          setUser({
            id: res.data.id,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            index: res.data.index,
            year: res.data.year,
          });
        } else {
          setAlertType("error");
          setAlertMessage(t("SomethingWentWrong"));
          setOpenAlert(true);
        }
      }
    };

    getUserData();
  }, [userId]);

  const handleFirstnameChange = (event: any) => {
    setUser({
      id: user.id,
      firstname: event.target.value,
      lastname: user.lastname,
      index: user.index,
      year: user.year,
    });
  };

  const handleLastnameChange = (event: any) => {
    setUser({
      id: user.id,
      firstname: user.firstname,
      lastname: event.target.value,
      index: user.index,
      year: user.year,
    });
  };

  const handleIndexChange = (event: any) => {
    setUser({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      index: event.target.value,
      year: user.year,
    });
  };

  const handleYearChange = (event: any) => {
    setUser({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      index: user.index,
      year: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setConfirmationDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setConfirmationDialogOpen(false);
    if (newValue) {
      if (userData.role !== RoleEnum.Student) {
        setUser({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          index: null,
          year: null,
        });
      }

      const res: any = await updateUser(user);
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
            setAlertType("success");
            setAlertMessage(t("AlertSuccessfullMessage"));
            setOpenAlert(true);
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
              {t("Profile")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("FirstName")}
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    type="text"
                    value={user.firstname}
                    onChange={handleFirstnameChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("LastName")}
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    type="text"
                    value={user.lastname}
                    onChange={handleLastnameChange}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                {userData.role == RoleEnum.Student ? (
                  <Stack direction="row">
                    <FormGroup sx={{ mt: 2, mr: 2 }}>
                      <FormLabel>
                        {
                          // @ts-ignore
                          <ContactPageIcon fontSize="xs" sx={{ mr: 0.5 }} />
                        }
                        {t("Index")}
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        type="number"
                        value={user.index}
                        onChange={handleIndexChange}
                        sx={{ mt: 0.8 }}
                      ></TextField>
                    </FormGroup>
                    <FormGroup sx={{ mt: 2 }}>
                      <FormLabel>
                        {
                          // @ts-ignore
                          <CalendarMonthIcon fontSize="xs" sx={{ mr: 0.5 }} />
                        }
                        {t("Year")}
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        type="number"
                        value={user.year}
                        onChange={handleYearChange}
                        sx={{ mt: 0.8 }}
                      ></TextField>
                    </FormGroup>
                  </Stack>
                ) : (
                  <></>
                )}

                <FormGroup sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    color="success"
                    disabled={
                      user.firstname === "" ||
                      user.lastname === "" ||
                      (userData.role === RoleEnum.Student &&
                        ((user.index && user.index <= 0) ||
                          (user.year && user.year <= 0)))
                    }
                  >
                    {
                      // @ts-ignore
                      <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{t("Save")}</Typography>
                  </Button>
                </FormGroup>
                <FormGroup sx={{ mt: 1 }}>
                  <Button variant="contained" size="medium" color="warning">
                    {
                      // @ts-ignore
                      <PasswordIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{t("Change password")}</Typography>
                  </Button>
                </FormGroup>
              </form>
            </FormControl>
          </Container>
          <ConfirmationDialog
            id="edit-user-confirmation-menu"
            keepMounted
            open={confirmationDialogOpen}
            title={t("EditUser")}
            content={t("AreYouSure")}
            negativeAction={t("Cancel")}
            positiveAction={t("Yes")}
            value={user.id}
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
