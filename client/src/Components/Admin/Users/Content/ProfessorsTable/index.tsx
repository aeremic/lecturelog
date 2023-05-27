import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getProfessors } from "../../../../../services/ProfessorsService";
import {
  Action,
  Add,
  AddUser,
  AlertFailureMessage,
  AreYouSure,
  Cancel,
  Edit,
  EditUser,
  Email,
  FirstName,
  LastName,
  NoProfessorsFound,
  Remove,
  RemoveUser,
  UserAddedSuccessfully,
  UserNotAdded,
  UserSuccessfullyRemoved,
  Yes,
} from "../../../../../resources/Typography";
import PaginationComponent from "../../../../Common/PaginationComponent";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import ManipulateUserDialog from "../../../ManipulateUserDialog";
import { RoleEnum } from "../../../../../Models/Enums";
import { IUser } from "../../../../../Models/User";
import { removeUser } from "../../../../../services/UsersService";
import { HttpStatusCode } from "axios";

interface IManipulateUser {
  id: number;
  actionResult: boolean;
}

const ProfessorsTable = () => {
  const professorsTableInitialState: IUser[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
      role: RoleEnum.Default,
    },
  ];

  const manipulateUserInitialState: IManipulateUser = {
    id: 0,
    actionResult: false,
  };

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeIndexValue, setRemoveIndexValue] = useState(0);

  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const [manipulateUserValue, setManipulateUserValue] = useState(
    manipulateUserInitialState
  );

  const [professors, setProfessors] = useState(professorsTableInitialState);
  const [professorsLoaded, setProfessorsLoaded] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);

  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");
  const [alertFailureMessage, setAlertFailureMessage] = useState("");

  useEffect(() => {
    getProfessors()
      .then((response) => {
        if (
          response &&
          response.status &&
          response.status === HttpStatusCode.Ok &&
          response.data
        ) {
          setProfessors(response.data);
          setProfessorsLoaded(true);
        } else {
          setAlertFailureMessage(AlertFailureMessage);
          setOpenFailureAlert(true);
        }
      })
      .catch(() => {
        // TODO: Error should trigger alert
      });
  }, [professorsLoaded]);

  const handleRemoveDialogClick = (index: number) => {
    setRemoveIndexValue(index);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setRemoveDialogOpen(false);
    if (newValue) {
      setRemoveIndexValue(newValue);

      let res = await removeUser(removeIndexValue);
      if (res && res.status && res.status === HttpStatusCode.Ok) {
        setAlertSuccessMessage(UserSuccessfullyRemoved);
        setOpenSuccessAlert(true);
        setProfessorsLoaded(false);
      } else {
        setAlertFailureMessage(AlertFailureMessage);
        setOpenFailureAlert(true);
      }
    }
  };

  const handleEditUserDialogClick = (editUser: IManipulateUser) => {
    setManipulateUserValue(editUser);
    setEditUserDialogOpen(true);
  };

  const handleEditUserDialogClose = (newValue?: any) => {
    // TODO: Bug - Values not updated.
    setEditUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);
    }

    setProfessorsLoaded(false);
  };

  const handleAddUserDialogClick = (addUser: IManipulateUser) => {
    setManipulateUserValue(addUser);
    setAddUserDialogOpen(true);
  };

  const handleAddUserDialogClose = (newValue?: any) => {
    // TODO: Bug - Values not updated.
    setAddUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);

      setAlertSuccessMessage(UserAddedSuccessfully);
      setOpenSuccessAlert(true);
      setProfessorsLoaded(false);
    } else {
      setAlertFailureMessage(UserNotAdded);
      setOpenFailureAlert(true);
    }
  };

  const handleCloseSuccessAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };

  const handleCloseFailureAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailureAlert(false);
  };

  return (
    <>
      <Stack direction="row">
        <Button
          onClick={() => {
            handleAddUserDialogClick({ id: 0, actionResult: false });
          }}
          variant="contained"
          color="success"
          size="large"
          sx={{ mb: 1 }}
        >
          <AddIcon />
        </Button>
      </Stack>
      {professorsLoaded ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 290 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  <TableCell>{Email}</TableCell>
                  <TableCell align="center">{FirstName}</TableCell>
                  <TableCell align="center">{LastName}</TableCell>
                  <TableCell align="center">{Action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {professors.map((professor, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {professor.email}
                    </TableCell>
                    <TableCell align="center">{professor.firstname}</TableCell>
                    <TableCell align="center">{professor.lastname}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(professor.id);
                        }}
                        variant="contained"
                        color="error"
                      >
                        {Remove}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <Box sx={{ m: 1 }}>
            <PaginationComponent />
          </Box>
        </Box>
      ) : (
        <Typography>{NoProfessorsFound}</Typography>
      )}
      <ConfirmationDialog
        id="remove-professor-menu"
        keepMounted
        open={removeDialogOpen}
        title={RemoveUser}
        content={AreYouSure}
        negativeAction={Cancel}
        positiveAction={Yes}
        value={removeIndexValue}
        onClose={handleRemoveDialogClose}
      />
      <ManipulateUserDialog
        id="add-professor-menu"
        keepMounted
        open={addUserDialogOpen}
        title={AddUser}
        negativeAction={Cancel}
        positiveAction={Add}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleAddUserDialogClose}
      />
      <ManipulateUserDialog
        id="edit-professor-menu"
        keepMounted
        open={editUserDialogOpen}
        title={EditUser}
        negativeAction={Cancel}
        positiveAction={Edit}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleEditUserDialogClose}
      />
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleCloseSuccessAlert}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertSuccessMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFailureAlert}
        autoHideDuration={6000}
        onClose={handleCloseFailureAlert}
      >
        <Alert
          onClose={handleCloseFailureAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertFailureMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfessorsTable;
