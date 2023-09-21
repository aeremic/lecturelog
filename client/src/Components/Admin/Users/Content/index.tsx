import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ProfessorsTable from "./ProfessorsTable";
import StudentsTable from "./StudentsTable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTranslation } from "react-i18next";

const Content = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                <PeopleAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                {t("Users")}
              </Typography>
            </Box>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{t("AllProfessors")}</Typography>
                <Divider sx={{ mb: 2 }} />
                <ProfessorsTable />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{t("AllStudents")}</Typography>
                <Divider sx={{ mb: 2 }} />
                <StudentsTable />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Content;
