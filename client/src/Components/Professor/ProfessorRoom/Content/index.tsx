import { Container, Grid, Typography } from "@mui/material";
import { LiveLecture } from "../../../../resources/Typography";
import ProfessorCodeGeneration from "./ProfessorCodeGeneration";
import PresentStudents from "./PresentStudents";
import LiveTvIcon from "@mui/icons-material/LiveTv";

export const Content = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h5">
      <LiveTvIcon fontSize="small" sx={{ mr: 0.5 }} />
      {LiveLecture}
    </Typography>
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={6} sx={{ minWidth: 340 }}>
        <ProfessorCodeGeneration />
      </Grid>
      <Grid item xs={6} sx={{ minWidth: 340 }}>
        <PresentStudents />
      </Grid>
    </Grid>
  </Container>
);
