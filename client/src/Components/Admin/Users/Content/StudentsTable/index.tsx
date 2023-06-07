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
import { getStudents } from "../../../../../services/StudentsService/index";
import {
  Action,
  Add,
  AddUser,
  AlertFailureMessage,
  AreYouSure,
  Cancel,
  Email,
  FirstName,
  Index,
  LastName,
  NoStudentsFound,
  Remove,
  RemoveUser,
  UserAddedSuccessfully,
  UserNotAdded,
  UserSuccessfullyRemoved,
  Yes,
} from "../../../../../resources/Typography";
import { RoleEnum } from "../../../../../Models/Enums";
import { IUser } from "../../../../../Models/User";
import { HttpStatusCode } from "axios";
import { removeUser } from "../../../../../services/UsersService";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import ManipulateUserDialog from "../../../ManipulateUserDialog";
import DeleteIcon from "@mui/icons-material/Delete";

interface IManipulateUser {
  id: number;
  actionResult: boolean;
}

const StudentsTable = () => {
  const studentsTablleInitialState: IUser[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
      role: RoleEnum.Default,
      index: null,
      year: null,
    },
  ];

  const [students, setStudents] = useState(studentsTablleInitialState);
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);
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

  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const [manipulateUserValue, setManipulateUserValue] = useState(
    manipulateUserInitialState
  );

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    getStudents(`?page=${controller.page}&size=${controller.rowsPerPage}`).then(
      (res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          setStudents(res.data.students ?? []);
          setStudentsCount(res.data.count ?? 0);

          setStudentsLoaded(true);
        } else {
          setAlertType("error");
          setAlertMessage(AlertFailureMessage);
          setOpenAlert(true);
        }
      }
    );
  }, [controller, studentsLoaded]);

  const handlePageChange = (event: any, newPage: number) => {
    setStudentsLoaded(false);
    setController({ ...controller, page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setStudentsLoaded(false);
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
      if (res && res.status && res.status === HttpStatusCode.Ok) {
        setAlertType("success");
        setAlertMessage(UserSuccessfullyRemoved);
        setOpenAlert(true);

        setStudentsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    }
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

      setAlertType("success");
      setAlertMessage(UserAddedSuccessfully);
      setOpenAlert(true);

      setStudentsLoaded(false);
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
      {studentsLoaded ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 290 }} size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                    },
                  }}
                >
                  <TableCell>{Index}</TableCell>
                  <TableCell>{Email}</TableCell>
                  <TableCell align="center">{FirstName}</TableCell>
                  <TableCell align="center">{LastName}</TableCell>
                  <TableCell align="center">{Action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {student.index}/{student.year}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell align="center">{student.firstname}</TableCell>
                    <TableCell align="center">{student.lastname}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(student.id);
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
              count={studentsCount}
              rowsPerPage={controller.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
          </Box>
        </Box>
      ) : (
        <Typography>{NoStudentsFound}</Typography>
      )}
      <ConfirmationDialog
        id="remove-student-menu"
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
        id="add-student-menu"
        keepMounted
        open={addUserDialogOpen}
        title={AddUser}
        negativeAction={Cancel}
        positiveAction={Add}
        defaultRoleEnum={RoleEnum.Student}
        value={manipulateUserValue}
        onClose={handleAddUserDialogClose}
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
    </>
  );
};

export default StudentsTable;
