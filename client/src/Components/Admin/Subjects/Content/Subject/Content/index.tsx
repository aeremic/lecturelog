import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Subject } from "../../../../../../resources/Typography";

const Content = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">{Subject}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
