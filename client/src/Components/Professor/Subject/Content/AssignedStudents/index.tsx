import {
  Alert,
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
import { getCurrentlyAssignedStudents } from "../../../../../services/HttpService/StudentsSubjectsService";

export const AssignedStudents: React.FC<IAssignedStudentsProps> = ({
  userIdProp,
  subjectIdProp,
}) => {
  const userId: number = userIdProp;
  const subjectId: number = subjectIdProp;

  const { t } = useTranslation();

  const [assignedStudents, setAssignedStudents] = useState<IAssignedStudents[]>(
    []
  );
  const [assignedStudentsLoaded, setAssignedStudentsLoaded] =
    useState<boolean>(false);

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

  const manipulationType =
    subjectId === -1
      ? SubjectManipulationType.creating
      : SubjectManipulationType.updating;

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
                    variant="contained"
                    color="error"
                    size="medium"
                    sx={{ mb: 1 }}
                  >
                    <DeleteIcon sx={{ mr: 0.5 }} />{" "}
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
      </CardContent>
    </Card>
  );
};
