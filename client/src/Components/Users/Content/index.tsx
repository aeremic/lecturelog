import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ProfessorsTable from "./ProfessorsTable";
import { Professors, Students, Users } from "../../../resources/Typography";
import StudentsTable from "./StudentsTable";

const Content = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">{Users}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{Professors}</Typography>
                <Divider sx={{ mb: 2 }} />
                <ProfessorsTable />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{Students}</Typography>
                <Divider sx={{ mb: 2 }} />
                <StudentsTable />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Content;
