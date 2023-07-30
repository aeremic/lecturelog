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
import {
  AllProfessors,
  AllStudents,
  Users,
} from "../../../../resources/Typography";
import StudentsTable from "./StudentsTable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Content = () => {
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                <PeopleAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                {Users}
              </Typography>
            </Box>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{AllProfessors}</Typography>
                <Divider sx={{ mb: 2 }} />
                <ProfessorsTable />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{AllStudents}</Typography>
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
