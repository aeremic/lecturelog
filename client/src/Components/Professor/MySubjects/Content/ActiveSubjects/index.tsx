import {
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import StopIcon from "@mui/icons-material/Stop";
import { IAssignedSubject } from "../../../../../models/IAssignedSubject";
import { IActiveSubjectsProps } from "../../../../../models/Props/IActiveSubjectsProps";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";

const ActiveSubjects: React.FC<IActiveSubjectsProps> = ({
  userId,
  subjectsProp,
  handleStopSession,
  handleStopAllSession,
  handleSessionClick,
}) => {
  const { t } = useTranslation();

  const subjects: IAssignedSubject[] = subjectsProp;

  const [stopAllSessionDialogOpen, setStopAllSessionDialogOpen] =
    useState(false);

  const [stopSessionDialogOpen, setStopSessionDialogOpen] = useState(false);
  const [stopSessionSubjectIdValue, setStopSessionSubjectIdValue] =
    useState(-1);

  const handleStopAllSessionClick = () => {
    setStopAllSessionDialogOpen(true);
  };

  const handleStopAllSessionDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setStopAllSessionDialogOpen(false);

    if (dialogResponseValue) {
      handleStopAllSession();
    }
  };

  const handleStopSessionClick = (subjectId: number) => {
    setStopSessionSubjectIdValue(subjectId);
    setStopSessionDialogOpen(true);
  };

  const handleStopSessionDialogClose = async (
    dialogResponseValue?: boolean
  ) => {
    setStopSessionDialogOpen(false);

    if (dialogResponseValue) {
      handleStopSession(stopSessionSubjectIdValue);
    }

    setStopSessionSubjectIdValue(-1);
  };

  return (
    <>
      {subjects.length > 0 ? (
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Typography variant="h6">{t("LiveLectures")}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row">
              <Button
                onClick={handleStopAllSessionClick}
                variant="contained"
                color="error"
                size="medium"
                sx={{ mb: 1 }}
              >
                {
                  // @ts-ignore
                  <StopIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("EndAllLiveLectures")}
              </Button>
            </Stack>
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
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <TextFieldsIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                      {t("SubjectName")}
                    </TableCell>
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <StopCircleIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={(e) => handleSessionClick(subject)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="center">{subject.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStopSessionClick(subject.subjectId);
                          }}
                          variant="contained"
                          color="error"
                          size="medium"
                          disabled={subject.userId != userId}
                        >
                          <StopIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
      <ConfirmationDialog
        id="stop-all-session-menu"
        keepMounted
        open={stopAllSessionDialogOpen}
        title={t("Ending all lectures without saving points")}
        content={t(
          "This action will end all current lectures and dismiss all gathered points. Are you sure you want to continue?"
        )}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={-1}
        onClose={handleStopAllSessionDialogClose}
      />
      <ConfirmationDialog
        id="stop-sessions-menu"
        keepMounted
        open={stopSessionDialogOpen}
        title={t("Ending lecture without saving points")}
        content={t(
          "This action will end lecture and dismiss gathered points. Are you sure you want to continue?"
        )}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={stopSessionSubjectIdValue}
        onClose={handleStopSessionDialogClose}
      />
    </>
  );
};

export default ActiveSubjects;
