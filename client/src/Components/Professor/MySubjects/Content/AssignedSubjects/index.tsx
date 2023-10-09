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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IAssignedSubject } from "../../../../../modelHelpers/AssignedSubject";
import { IAssignedSubjectsProps } from "../../../../../modelHelpers/AssignedSubjectsProps";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

const AssignedSubject: React.FC<IAssignedSubjectsProps> = ({
  subjectsProp,
  handleStartSession,
  handleSubjectClick,
  handleAddSubjectDialogClick,
}) => {
  const { t } = useTranslation();

  const subject: IAssignedSubject[] = subjectsProp;

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{t("AssignedSubjects")}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row">
          <Button
            onClick={() => {
              handleAddSubjectDialogClick();
            }}
            variant="contained"
            color="success"
            size="large"
            sx={{ mb: 1 }}
          >
            <AddIcon />
          </Button>
        </Stack>
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
                <TableCell align="right"></TableCell>
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
                  <TableCell align="right">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartSession(subject.subjectId);
                      }}
                      variant="contained"
                      color="success"
                      size="large"
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
