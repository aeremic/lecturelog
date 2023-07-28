import {
  Alert,
  AlertColor,
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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
  Id,
  LastName,
  NoProfessorsFound,
  Remove,
  RemoveUser,
  UserAddedSuccessfully,
  UserNotAdded,
  UserSuccessfullyRemoved,
  Yes,
} from "../../../../../resources/Typography";
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

  const [professors, setProfessors] = useState(professorsTableInitialState);
  const [professorsLoaded, setProfessorsLoaded] = useState(false);
  const [professorsCount, setProfessorsCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

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

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    getProfessors(
      `?page=${controller.page}&size=${controller.rowsPerPage}`
    ).then((res) => {
      if (res && res.status === HttpStatusCode.Ok && res.data) {
        setProfessors(res.data.professors ?? []);
        setProfessorsCount(res.data.count ?? 0);

        setProfessorsLoaded(true);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    });
  }, [controller, professorsLoaded]);

  const handlePageChange = (event: any, newPage: number) => {
    setProfessorsLoaded(false);
    setController({ ...controller, page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setProfessorsLoaded(false);
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleRemoveDialogClick = (index: number) => {
    setRemoveIndexValue(index);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setRemoveDialogOpen(false);
    if (newValue) {
      setRemoveIndexValue(newValue);

      const res = await removeUser(removeIndexValue);
      if (
        res &&
        res.status &&
        res.status === HttpStatusCode.Ok &&
        res.data > 0
      ) {
        setAlertType("success");
        setAlertMessage(UserSuccessfullyRemoved);
        setOpenAlert(true);

        setProfessorsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    }
  };

  // const handleEditUserDialogClick = (editUser: IManipulateUser) => {
  //   setManipulateUserValue(editUser);
  //   setEditUserDialogOpen(true);
  // };

  // const handleEditUserDialogClose = (newValue?: any) => {
  //   // TODO: Bug - Values not updated.
  //   setEditUserDialogOpen(false);
  //   if (newValue) {
  //     setManipulateUserValue(newValue);
  //   }

  //   setProfessorsLoaded(false);
  // };

  const handleAddUserDialogClick = (addUser: IManipulateUser) => {
    setManipulateUserValue(addUser);
    setAddUserDialogOpen(true);
  };

  const handleAddUserDialogClose = (newValue?: any) => {
    // TODO: Bug - Values not updated.
    setAddUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);

      setAlertType("success");
      setAlertMessage(UserAddedSuccessfully);
      setOpenAlert(true);

      setProfessorsLoaded(false);
    } else {
      setAlertType("error");
      setAlertMessage(UserNotAdded);
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
      <Stack direction="row">
        <Button
          onClick={() => {
            handleAddUserDialogClick({ id: 0, actionResult: false });
          }}
          variant="contained"
          color="success"
          size="small"
          sx={{ mb: 1 }}
        >
          <AddIcon />
        </Button>
      </Stack>
      {professorsLoaded ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small" sx={{ minWidth: 290 }}>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  <TableCell>{Id}</TableCell>
                  <TableCell align="center">{Email}</TableCell>
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
                      {professor.id}
                    </TableCell>
                    <TableCell align="center">{professor.email}</TableCell>
                    <TableCell align="center">{professor.firstname}</TableCell>
                    <TableCell align="center">{professor.lastname}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(professor.id);
                        }}
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ m: 1 }}>
            <TablePagination
              component="div"
              onPageChange={handlePageChange}
              page={controller.page}
              count={professorsCount}
              rowsPerPage={controller.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
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
      {/* <ManipulateUserDialog
        id="edit-professor-menu"
        keepMounted
        open={editUserDialogOpen}
        title={EditUser}
        negativeAction={Cancel}
        positiveAction={Edit}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleEditUserDialogClose}
      /> */}
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

export default ProfessorsTable;
