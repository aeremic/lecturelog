import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { LiveLecture } from "../../../../resources/Typography";

export const Content = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">{LiveLecture}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 340 }}>
          <Card sx={{ mt: 1 }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 340 }}>
          <Card sx={{ mt: 1 }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
