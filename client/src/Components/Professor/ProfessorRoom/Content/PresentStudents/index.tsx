import {
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

const PresentStudents = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{t("CurrentlyPresentStudents")}</Typography>
        <Divider sx={{ mb: 2 }} />
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
                    <AlternateEmailIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
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
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="center">111/2013</TableCell>
                <TableCell align="center">EmailEmailEmailEmail</TableCell>
                <TableCell align="center">FirstnameFirstname</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PresentStudents;
