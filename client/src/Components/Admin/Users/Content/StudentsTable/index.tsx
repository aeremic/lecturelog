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
import { RoleEnum } from "../../../../../modelHelpers/Enums";
import { IUser } from "../../../../../models/User";
import { HttpStatusCode } from "axios";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import ManipulateUserDialog from "../../../ManipulateUserDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import UploadIcon from "@mui/icons-material/Upload";
import { IManipulateUser } from "../../../../../modelHelpers/ManipulateUser";
import { getStudents } from "../../../../../services/HttpService/StudentsService";
import { useTranslation } from "react-i18next";
import {
  removeUser,
  sendEmailVerification,
} from "../../../../../services/HttpService/UsersService";

const StudentsTable = () => {
  const { t } = useTranslation();

  const studentsTablleInitialState: IUser[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
      role: RoleEnum.Default,
      index: null,
      year: null,
      isActivated: false,
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

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

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
          setAlertMessage(t("AlertFailureMessage"));
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

  const handleSendEmailVerificationClick = async (userId: number) => {
    const res: any = await sendEmailVerification(userId);
    if (
      res &&
      res.status &&
      res.status === HttpStatusCode.Created &&
      res.data
    ) {
      setConfirmationDialogOpen(true);
    } else {
      setAlertType("error");
      setAlertMessage(t("AlertFailureMessage"));
      setOpenAlert(true);
    }
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
        setAlertMessage(t("UserSuccessfullyRemoved"));
        setOpenAlert(true);

        setStudentsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
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
      setAlertMessage(t("UserAddedSuccessfully"));
      setOpenAlert(true);

      setStudentsLoaded(false);
    } else {
      setAlertType("error");
      setAlertMessage(t("UserNotAdded"));
      setOpenAlert(true);
    }
  };

  const handleUploadUsersDialogClick = (addUser: IManipulateUser) => {
    setManipulateUserValue(addUser);
    setAddUserDialogOpen(true);
  };

  const handleUploadUsersDialogClose = async (newValue?: any) => {
    setAddUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);

      setAlertType("success");
      setAlertMessage(t("UserAddedSuccessfully"));
      setOpenAlert(true);

      setStudentsLoaded(false);
    } else {
      setAlertType("error");
      setAlertMessage(t("UserNotAdded"));
      setOpenAlert(true);
    }
  };

  const handleConfirmationDialogClose = async (value?: any) => {
    setConfirmationDialogOpen(false);
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
          disabled={true}
          sx={{ mb: 1 }}
        >
          <AddIcon />
        </Button>
        <Button
          onClick={() => {
            handleUploadUsersDialogClick({ id: 0, actionResult: false });
          }}
          variant="contained"
          color="success"
          size="small"
          disabled={true}
          sx={{ mb: 1, ml: 2 }}
        >
          <UploadIcon />
        </Button>
      </Stack>
      {studentsLoaded ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 900 }} size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                    },
                  }}
                >
                  <TableCell>
                    <FormatListNumberedIcon
                      fontSize="xs"
                      sx={{ mt: 1, ml: 0.5 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <ContactPageIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    {t("Index")}
                  </TableCell>
                  <TableCell align="center">
                    <AlternateEmailIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    {t("Email")}
                  </TableCell>
                  <TableCell align="center">
                    <PersonIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    {t("FirstName")}
                  </TableCell>
                  <TableCell align="center">
                    <PersonIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    {t("LastName")}
                  </TableCell>
                  <TableCell align="center">
                    <LibraryAddCheckIcon
                      fontSize="xs"
                      sx={{ mt: 1, mr: 0.5 }}
                    />
                    {t("IsActivated")}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <BorderColorIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    {t("Action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {student.id}
                    </TableCell>
                    <TableCell align="center">
                      {student.index}/{student.year}
                    </TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.firstname}</TableCell>
                    <TableCell align="center">{student.lastname}</TableCell>
                    <TableCell align="center">
                      {student.isActivated ? (
                        <CheckBoxIcon
                          fontSize="small"
                          color="primary"
                          sx={{ mt: 1, mr: 0.5 }}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          fontSize="small"
                          color="primary"
                          sx={{ mt: 1, mr: 0.5 }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleSendEmailVerificationClick(student.id);
                        }}
                        variant="contained"
                        color="info"
                        size="small"
                        disabled={student.isActivated}
                      >
                        <ForwardToInboxIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(student.id);
                        }}
                        variant="contained"
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
        <Typography>{t("NoStudentsFound")}</Typography>
      )}
      <ConfirmationDialog
        id="remove-student-menu"
        keepMounted
        open={removeDialogOpen}
        title={t("RemoveUser")}
        content={t("AreYouSure")}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={removeIndexValue}
        onClose={handleRemoveDialogClose}
      />
      <ConfirmationDialog
        id="confirmation-subject-menu"
        keepMounted
        open={confirmationDialogOpen}
        title={t("AlertSuccessfullMessage")}
        positiveAction={t("Ok")}
        value={-1}
        onClose={handleConfirmationDialogClose}
      />
      <ManipulateUserDialog
        id="add-student-menu"
        keepMounted
        open={addUserDialogOpen}
        title={t("AddUser")}
        negativeAction={t("Cancel")}
        positiveAction={t("Add")}
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
