import {
  Box,
  Card,
  CardContent,
  Container,
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
import {
  LiveLectures,
  NonActiveSubjects,
  NonActiveSubjectsDescription,
} from "../../../../resources/Typography";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import convertToRoman from "../../../../functionHelpers/ConvertToRoman";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAssignedSubject } from "../../../../modelHelpers/AssignedSubject";
import { HttpStatusCode } from "axios";
import { socket } from "../../../../services/MessagingService";
import { getAvailableSubjects } from "../../../../services/HttpService/StudentsService";

export const Content = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [availableSubjects, setAvailableSubjects] = useState<
    IAssignedSubject[]
  >([]);
  const [subjectsLoaded, setSubjectsLoaded] = useState<boolean>(false);
  const [lecturesChangeEvents, setLecturesChangeEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId != -1) {
        await getAvailableSubjects(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setAvailableSubjects(res.data);
          }
        });

        setSubjectsLoaded(true);
      }
    };

    fetchData();
  }, [userId, subjectsLoaded, lecturesChangeEvents]);

  useEffect(() => {
    function onLecturesChange(value: any) {
      setLecturesChangeEvents(lecturesChangeEvents.concat(value));
    }

    socket.on("lecturesChange", onLecturesChange);

    return () => {
      socket.off("lecturesChange", onLecturesChange);
    };
  }, [lecturesChangeEvents]);

  const handleSessionClick = (subjectId: number) => {
    console.log(subjectId);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2, flexGrow: 1 }}
    >
      <Container component="main">
        {availableSubjects.length > 0 ? (
          <Stack direction="column">
            <Typography variant="h6">
              <LibraryBooksIcon fontSize="small" sx={{ mr: 0.5 }} />
              {LiveLectures}
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table sx={{ minWidth: 340 }} size="medium">
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
                    </TableCell>
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <NumbersIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableSubjects.map((subject, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={(e) => handleSessionClick(subject.subjectId)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="center">{subject.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">{NonActiveSubjects}</Typography>
              <Divider />
              <Typography textAlign="center" variant="subtitle1" sx={{ mt: 2 }}>
                {NonActiveSubjectsDescription}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};
