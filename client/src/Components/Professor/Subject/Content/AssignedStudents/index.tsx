import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardContent,
  Divider,
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
import { IAssignedStudentsProps } from "../../../../../models/Props/IAssignedStudentsProps";
import { useTranslation } from "react-i18next";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import { SubjectManipulationType } from "../../../../../models/Enums";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { IAssignedStudents } from "../../../../../models/IAssignedStudents";
import {
  getCurrentlyAssignedStudents,
  removeAllAssignedStudents,
  removeAssignedStudent,
} from "../../../../../services/HttpService/StudentsSubjectsService";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import { IRemoveAssignedStudentModel } from "../../../../../models/IRemoveAssignedStudentModel";

export const AssignedStudents: React.FC<IAssignedStudentsProps> = ({
  userIdProp,
  subjectIdProp,
}) => {
  const userId: number = userIdProp;
  const subjectId: number = subjectIdProp;

  const { t } = useTranslation();

  const manipulationType =
    subjectId === -1
      ? SubjectManipulationType.creating
      : SubjectManipulationType.updating;

  const [assignedStudents, setAssignedStudents] = useState<IAssignedStudents[]>(
    []
  );
  const [assignedStudentsLoaded, setAssignedStudentsLoaded] =
    useState<boolean>(false);

  const [
    removeAllAssignedStudentsDialogOpen,
    setRemoveAllAssignedStudentsDialogOpen,
  ] = useState(false);

  const [removeAssignedStudentDialogOpen, setRemoveAssignedStudentDialogOpen] =
    useState(false);
  const [removeAssignedStudentIdValue, setRemoveAssignedStudentIdValue] =
    useState(-1);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    const fetchAssignedStudents = async (subjectId: number) => {
      await getCurrentlyAssignedStudents(subjectId).then((res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          setAssignedStudents(res.data);
          setAssignedStudentsLoaded(true);
        }
      });
    };

    fetchAssignedStudents(subjectId);
  }, [assignedStudentsLoaded, userId, subjectId]);

  const handleRemoveAllAssignedStudentsClick = () => {
    setRemoveAllAssignedStudentsDialogOpen(true);
  };

  const handleRemoveAllAssignedStudentsDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setRemoveAllAssignedStudentsDialogOpen(false);

    if (dialogResponseValue) {
      let res: any = null;
      res = await removeAllAssignedStudents(subjectId);

      if (res && res.status && res.status === HttpStatusCode.Ok && res.data) {
        setAlertType("success");
        setAlertMessage(t("UserSuccessfullyRemoved"));
        setOpenAlert(true);

        setAssignedStudentsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
        setOpenAlert(true);
      }
    }
  };

  const handleRemoveAssignedStudentClick = (studentId: number) => {
    debugger;
    setRemoveAssignedStudentIdValue(studentId);
    setRemoveAssignedStudentDialogOpen(true);
  };

  const handleRemoveAssignedStudentDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setRemoveAssignedStudentDialogOpen(false);

    if (dialogResponseValue) {
      let res: any = null;
      if (removeAssignedStudentIdValue > 0) {
        const modelToPost: IRemoveAssignedStudentModel = {
          subjectId: subjectId,
          studentId: removeAssignedStudentIdValue,
        };
        res = await removeAssignedStudent(modelToPost);

        if (
          res &&
          res.status &&
          res.status === HttpStatusCode.Created &&
          res.data
        ) {
          setAlertType("success");
          setAlertMessage(t("UserSuccessfullyRemoved"));
          setOpenAlert(true);

          setAssignedStudentsLoaded(false);
        } else {
          setAlertType("error");
          setAlertMessage(t("AlertFailureMessage"));
          setOpenAlert(true);
        }
      }
    }

    setRemoveAssignedStudentIdValue(-1);
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
    <Card sx={{ mt: 1, minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6">{t("AssignedStudents")}</Typography>
        <Divider sx={{ mb: 2 }} />
        {manipulationType === SubjectManipulationType.creating ? (
          <>
            <Alert severity="info">{t("AssignedSubjectsNotAvailable")}</Alert>
          </>
        ) : (
          <>
            {assignedStudentsLoaded && assignedStudents.length > 0 ? (
              <>
                <Stack direction="row">
                  <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    disabled
                    sx={{ mb: 1, mr: 2 }}
                  >
                    <DownloadIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleRemoveAllAssignedStudentsClick();
                    }}
                    variant="contained"
                    color="error"
                    size="medium"
                    sx={{ mb: 1 }}
                  >
                    <DeleteIcon sx={{ mr: 0.5 }} />
                    {t("ResetAllPresencePoints")}
                  </Button>
                </Stack>
                <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table sx={{ minWidth: 300 }} size="small">
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            backgroundColor: "secondary.light",
                            color: "secondary.contrastText",
                          },
                        }}
                      >
                        <TableCell align="center">
                          {
                            // @ts-ignore
                            <ContactPageIcon
                              fontSize="xs"
                              sx={{ mt: 1, mr: 0.5 }}
                            />
                          }
                          {t("Index")}
                        </TableCell>
                        <TableCell align="center">
                          {
                            // @ts-ignore
                            <PersonIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                          }
                          {t("FirstName")}
                        </TableCell>
                        <TableCell align="center">
                          {
                            // @ts-ignore
                            <PersonIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                          }
                          {t("LastName")}
                        </TableCell>
                        <TableCell align="center">
                          {
                            // @ts-ignore
                            <StarIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                          }
                          {t("PointsPerPresence")}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          {
                            // @ts-ignore
                            <BorderColorIcon
                              fontSize="xs"
                              sx={{ mt: 1, mr: 0.5 }}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignedStudents.map((student, idx) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              cursor: "pointer",
                            }}
                          >
                            <TableCell key={idx} align="center">
                              {student.index}/{student.year}
                            </TableCell>
                            <TableCell align="center">
                              {student.firstname}
                            </TableCell>
                            <TableCell align="center">
                              {student.lastname}
                            </TableCell>
                            <TableCell align="center">
                              {student.sumOfPresencePoints}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                onClick={() => {
                                  handleRemoveAssignedStudentClick(student.id);
                                }}
                                variant="contained"
                                color="error"
                                size="medium"
                              >
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Alert severity="info">
                {t("CurrentlyThereAreNoAssignedStudents")}
              </Alert>
            )}
          </>
        )}
        <ConfirmationDialog
          id="remove-all-assigned-students-menu"
          keepMounted
          open={removeAllAssignedStudentsDialogOpen}
          title={t("RemovingAssignedStudentsFromTheSubject")}
          content={t("RemovingAssignedStudentsAction")}
          negativeAction={t("Cancel")}
          positiveAction={t("Yes")}
          value={-1}
          onClose={handleRemoveAllAssignedStudentsDialogClose}
        />
        <ConfirmationDialog
          id="remove-assigned-student-menu"
          keepMounted
          open={removeAssignedStudentDialogOpen}
          title={t("RemovingAssignedStudentFromTheSubject")}
          content={t("RemovingAssignedStudentAction")}
          negativeAction={t("Cancel")}
          positiveAction={t("Yes")}
          value={removeAssignedStudentIdValue}
          onClose={handleRemoveAssignedStudentDialogClose}
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
  );
};
