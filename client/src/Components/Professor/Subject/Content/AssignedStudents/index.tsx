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
import { IAssignedStudentsProps } from "../../../../../models/Props/IAssignedStudentsProps";
import { useTranslation } from "react-i18next";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { SubjectManipulationType } from "../../../../../models/Enums";

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

  return (
    <Card sx={{ mt: 1, minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6">{t("AssignedStudents")}</Typography>
        <Divider sx={{ mb: 2 }} />
        {manipulationType === SubjectManipulationType.creating ? (
          <>
            <Typography>{t("AssignedSubjectsNotAvailable")}</Typography>
          </>
        ) : (
          <>
            <Stack direction="row">
              <Button
                variant="contained"
                color="warning"
                size="medium"
                sx={{ mb: 1 }}
              >
                <BlockIcon sx={{ mr: 0.5 }} /> {t("ResetAllPresencePoints")}
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
                    <TableCell align="right" colSpan={2}>
                      {
                        // @ts-ignore
                        <BorderColorIcon
                          fontSize="xs"
                          sx={{ mt: 1, mr: 0.5 }}
                        />
                      }
                      {t("Action")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="center">111/2013</TableCell>
                    <TableCell align="center">FirstnameFirstname</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="warning" size="medium">
                        <BlockIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
