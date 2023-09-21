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
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import UploadIcon from "@mui/icons-material/Upload";
import { getProfessors } from "../../../../../services/HttpService/ProfessorsService";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import ManipulateUserDialog from "../../../ManipulateUserDialog";
import { RoleEnum } from "../../../../../modelHelpers/Enums";
import { IUser } from "../../../../../models/User";
import { HttpStatusCode } from "axios";
import { IManipulateUser } from "../../../../../modelHelpers/ManipulateUser";
import {
  removeUser,
  sendEmailVerification,
} from "../../../../../services/HttpService/UsersService";
import UploadUsersDialog from "../../../UploadUsersDialog";
import { useTranslation } from "react-i18next";

const ProfessorsTable = () => {
  const { t } = useTranslation();

  const professorsTableInitialState: IUser[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
      role: RoleEnum.Default,
      isActivated: false,
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

  const [uploadUsersDialogOpen, setUploadUsersDialogOpen] = useState(false);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

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
        setAlertMessage(t("AlertFailureMessage"));
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

        setProfessorsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
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
      setAlertMessage(t("UserAddedSuccessfully"));
      setOpenAlert(true);

      setProfessorsLoaded(false);
    } else {
      setAlertType("error");
      setAlertMessage(t("UserNotAdded"));
      setOpenAlert(true);
    }
  };

  const handleUploadUsersDialogClick = () => {
    setUploadUsersDialogOpen(true);
  };

  const handleUploadUsersDialogClose = async (newValue?: any) => {
    setUploadUsersDialogOpen(false);
    if (newValue) {
      setAlertType("success");
      setAlertMessage(t("UserAddedSuccessfully"));
      setOpenAlert(true);

      setProfessorsLoaded(false);
    } else {
      setAlertType("error");
      setAlertMessage(t("UsersNotAdded"));
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
          sx={{ mb: 1, ml: 2 }}
        >
          <UploadIcon />
        </Button>
      </Stack>
      {professorsLoaded ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small" sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
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
                      {professor.isActivated ? (
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
                          handleSendEmailVerificationClick(professor.id);
                        }}
                        variant="contained"
                        color="info"
                        size="small"
                        disabled={professor.isActivated}
                      >
                        <ForwardToInboxIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(professor.id);
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
              count={professorsCount}
              rowsPerPage={controller.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
          </Box>
        </Box>
      ) : (
        <Typography>{t("NoProfessorsFound")}</Typography>
      )}
      <ConfirmationDialog
        id="confirmation-subject-menu"
        keepMounted
        open={confirmationDialogOpen}
        title={t("AlertSuccessfullMessage")}
        positiveAction={t("Ok")}
        value={-1}
        onClose={handleConfirmationDialogClose}
      />
      <ConfirmationDialog
        id="remove-professor-menu"
        keepMounted
        open={removeDialogOpen}
        title={t("RemoveUser")}
        content={t("AreYouSure")}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={removeIndexValue}
        onClose={handleRemoveDialogClose}
      />
      <ManipulateUserDialog
        id="add-professor-menu"
        keepMounted
        open={addUserDialogOpen}
        title={t("AddUser")}
        negativeAction={t("Cancel")}
        positiveAction={t("Add")}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleAddUserDialogClose}
      />
      <UploadUsersDialog
        id="upload-users-menu"
        keepMounted
        open={uploadUsersDialogOpen}
        title={t("UploadProfessors")}
        negativeAction={t("Cancel")}
        positiveAction={t("Upload")}
        onClose={handleUploadUsersDialogClose}
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
