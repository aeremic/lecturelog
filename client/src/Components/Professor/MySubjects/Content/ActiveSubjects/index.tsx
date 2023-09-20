import {
  Button,
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
import { LiveLectures } from "../../../../../resources/Typography";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { IAssignedSubject } from "../../../../../modelHelpers/AssignedSubject";
import convertToRoman from "../../../../../functionHelpers/ConvertToRoman";
import { IActiveSubjectsProps } from "../../../../../modelHelpers/ActiveSubjectsProps";

const ActiveSubjects: React.FC<IActiveSubjectsProps> = ({
  userId,
  subjectsProp,
  handleStopSession,
  handleSessionClick,
}) => {
  const subjects: IAssignedSubject[] = subjectsProp;

  return (
    <>
      {subjects.length > 0 ? (
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Typography variant="h6">{LiveLectures}</Typography>
            <Divider sx={{ mb: 2 }} />
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
                            handleStopSession(subject.subjectId);
                          }}
                          variant="contained"
                          color="error"
                          size="small"
                          disabled={subject.userId != userId}
                        >
                          <PauseIcon fontSize="small" />
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
    </>
  );
};

export default ActiveSubjects;