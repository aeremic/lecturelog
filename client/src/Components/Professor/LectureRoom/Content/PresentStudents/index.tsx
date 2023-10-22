import {
  Alert,
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MessagingEvent } from "../../../../../models/Enums";
import { dispose, listening } from "../../../../../services/MessagingService";
import { HttpStatusCode } from "axios";
import { getUser } from "../../../../../services/HttpService/UsersService";
import { IPresentStudent } from "../../../../../models/IPresentStudent";
import useQueryIdParameter from "../../../../../hooks/UseQueryIdParameter";
import { getCurrentlyPresentStudents } from "../../../../../services/HttpService/LectureService";

const PresentStudents = () => {
  const { t } = useTranslation();

  const subjectId = useQueryIdParameter();

  const [presentStudents, setPresentStudents] = useState<IPresentStudent[]>([]);

  useEffect(() => {
    const fetchPresentStudents = async (subjectId: number) => {
      await getCurrentlyPresentStudents(subjectId).then((res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          setPresentStudents(res.data);
        }
      });
    };

    fetchPresentStudents(subjectId);
  }, [subjectId]);

  useEffect(() => {
    async function onLectureAttendeesChange(value: any) {
      if (
        value &&
        value.lectureAttendeeChangeData &&
        value.lectureAttendeeChangeData > 0
      ) {
        const newPresentStudentId = parseInt(value.lectureAttendeeChangeData);
        await getUser(newPresentStudentId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setPresentStudents([
              ...presentStudents,
              {
                id: res.data.id,
                index: res.data.index,
                year: res.data.year,
                firstname: res.data.firstname,
                email: res.data.email,
              },
            ]);
            console.log(res);
          }
        });
      }
    }

    listening(MessagingEvent.LectureAttendeesChange, onLectureAttendeesChange);

    return () => {
      dispose(MessagingEvent.LectureAttendeesChange, onLectureAttendeesChange);
    };
  }, []);

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{t("CurrentlyPresentStudents")}</Typography>
        <Divider sx={{ mb: 2 }} />
        {presentStudents.length > 0 ? (
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
                      <ContactPageIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    }
                    {t("Index")}
                  </TableCell>
                  <TableCell align="center">
                    {
                      // @ts-ignore
                      <AlternateEmailIcon
                        fontSize="xs"
                        sx={{ mt: 1, mr: 0.5 }}
                      />
                    }
                    {t("Email")}
                  </TableCell>
                  <TableCell align="center">
                    {
                      // @ts-ignore
                      <PersonIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                    }
                    {t("FirstName")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presentStudents.map((student) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="center">
                      {student.index}/{student.year}
                    </TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.firstname}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">
            {t("CurrentlyThereAreNoPresentStudents")}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PresentStudents;
