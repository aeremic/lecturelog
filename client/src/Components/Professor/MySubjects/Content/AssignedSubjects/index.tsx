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
import { AssignedSubjects } from "../../../../../resources/Typography";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { IAssignedSubject } from "../../../../../modelHelpers/AssignedSubject";
import { IAssignedSubjectsProps } from "../../../../../modelHelpers/AssignedSubjectsProps";

const AssignedSubject: React.FC<IAssignedSubjectsProps> = ({
  subjectsProp,
  handleStartSession,
  handleSubjectClick,
}) => {
  const subject: IAssignedSubject[] = subjectsProp;

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{AssignedSubjects}</Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 290 }} size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
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
                <TableCell align="center">
                  {
                    // @ts-ignore
                    <SmartDisplayIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                  }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subject.map((subject, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={(e) => handleSubjectClick(subject.subjectId)}
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
                        handleStartSession(subject.subjectId);
                      }}
                      variant="contained"
                      color="success"
                      size="small"
                    >
                      <PlayArrowIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AssignedSubject;
