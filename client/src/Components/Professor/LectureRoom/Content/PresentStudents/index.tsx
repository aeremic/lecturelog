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
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StopIcon from "@mui/icons-material/Stop";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import {
  CodeGenerationState,
  MessagingEvent,
} from "../../../../../models/Enums";
import {
  dispose,
  listening,
  onStopSession,
} from "../../../../../services/MessagingService";
import { HttpStatusCode } from "axios";
import { getUser } from "../../../../../services/HttpService/UsersService";
import { IPresentStudent } from "../../../../../models/IPresentStudent";
import useQueryIdParameter from "../../../../../hooks/UseQueryIdParameter";
import {
  getCurrentlyPresentStudents,
  removePresentStudent,
} from "../../../../../services/HttpService/LectureService";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import { IRemovePresentStudentModel } from "../../../../../models/IRemovePresentStudentModel";
import { ISessionMetadata } from "../../../../../models/ISessionMetadata";
import { useNavigate } from "react-router-dom";
import useCurrentUserIdentifier from "../../../../../hooks/UseCurrentUserIdentifier";
import { CurrentCodeStateContext } from "../..";

const PresentStudents = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userId = useCurrentUserIdentifier();
  const subjectId = useQueryIdParameter();

  const { currentCodeState } = useContext(CurrentCodeStateContext);

  const [presentStudents, setPresentStudents] = useState<IPresentStudent[]>([]);
  const [presentStudentsLoaded, setPresentStudentsLoaded] =
    useState<boolean>(false);

  const [stopSessionDialogOpen, setStopSessionDialogOpen] = useState(false);

  const [removePresentStudentDialogOpen, setRemovePresentStudentDialogOpen] =
    useState(false);
  const [removePresentStudentIdValue, setRemovePresentStudentIdValue] =
    useState(-1);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    const fetchPresentStudents = async (subjectId: number) => {
      await getCurrentlyPresentStudents(subjectId).then((res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          setPresentStudents(res.data);
          setPresentStudentsLoaded(true);
        }
      });
    };

    fetchPresentStudents(subjectId);
  }, [presentStudentsLoaded, subjectId]);

  useEffect(() => {
    async function onLectureAttendeesChange(value: any) {
      if (
        value &&
        value.lectureAttendeeChangeData &&
        value.lectureAttendeeChangeData > 0
      ) {
        const newPresentStudentId = parseInt(value.lectureAttendeeChangeData);
        setPresentStudentsLoaded(false);

        await getUser(newPresentStudentId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setPresentStudents((prevState) => [
              ...prevState,
              {
                id: res.data.id,
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                index: res.data.index,
                year: res.data.year,
              },
            ]);
            setPresentStudentsLoaded(true);
          }
        });
      }
    }

    listening(MessagingEvent.LectureAttendeesChange, onLectureAttendeesChange);

    return () => {
      dispose(MessagingEvent.LectureAttendeesChange, onLectureAttendeesChange);
    };
  });

  const handleStopSessionClick = () => {
    setStopSessionDialogOpen(true);
  };

  const handleStopSessionDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setStopSessionDialogOpen(false);

    if (dialogResponseValue) {
      const sessionData: ISessionMetadata = {
        userId: userId,
        subjectId: subjectId,
      };

      onStopSession(sessionData);
      navigate(`/professor/mysubjects`, {
        replace: true,
      });
    }
  };

  const handleRemovePresentStudentClick = (studentId: number) => {
    setRemovePresentStudentIdValue(studentId);
    setRemovePresentStudentDialogOpen(true);
  };

  const handleRemovePresentStudentDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setRemovePresentStudentDialogOpen(false);

    if (dialogResponseValue) {
      let res: any = null;
      if (removePresentStudentIdValue > 0) {
        const modelToPost: IRemovePresentStudentModel = {
          subjectId: subjectId,
          studentId: removePresentStudentIdValue,
        };
        res = await removePresentStudent(modelToPost);

        if (
          res &&
          res.status &&
          res.status === HttpStatusCode.Created &&
          res.data > 0
        ) {
          setAlertType("success");
          setAlertMessage(t("UserSuccessfullyRemoved"));
          setOpenAlert(true);

          setPresentStudentsLoaded(false);
        } else {
          setAlertType("error");
          setAlertMessage(t("AlertFailureMessage"));
          setOpenAlert(true);
        }
      }
    }

    setRemovePresentStudentIdValue(-1);
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
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Typography variant="h6">{t("CurrentlyPresentStudents")}</Typography>
          <Divider sx={{ mb: 2 }} />
          {presentStudentsLoaded && presentStudents.length > 0 ? (
            <>
              <Stack direction="row">
                <Button
                  variant="contained"
                  color="success"
                  size="medium"
                  disabled={currentCodeState == CodeGenerationState.generated}
                  sx={{ mb: 1, mr: 2 }}
                >
                  <SaveIcon sx={{ mr: 0.5 }} />
                </Button>
                <Button
                  onClick={handleStopSessionClick}
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ mb: 1 }}
                >
                  <StopIcon sx={{ mr: 0.5 }} />{" "}
                  {t("End lecture and dismiss points")}
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
                        {t("Name")}
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
                    {presentStudents.map((student, idx) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell key={idx} align="center">
                            {student.index}/{student.year}
                          </TableCell>
                          <TableCell align="center">
                            {student.firstname} {student.lastname}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                handleRemovePresentStudentClick(student.id);
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
              {t("CurrentlyThereAreNoPresentStudents")}
            </Alert>
          )}
        </CardContent>
      </Card>
      <ConfirmationDialog
        id="stop-session-menu"
        keepMounted
        open={stopSessionDialogOpen}
        title={t("EndingLectureAndDismissingAllPoints")}
        content={t("EndingLectureAction")}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={-1}
        onClose={handleStopSessionDialogClose}
      />
      <ConfirmationDialog
        id="remove-present-student-menu"
        keepMounted
        open={removePresentStudentDialogOpen}
        title={t("RemovingStudentFromTheLecture")}
        content={t("RemovingStudentAction")}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={removePresentStudentIdValue}
        onClose={handleRemovePresentStudentDialogClose}
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

export default PresentStudents;
