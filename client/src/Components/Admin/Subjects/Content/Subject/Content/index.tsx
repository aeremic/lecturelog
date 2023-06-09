import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Subject } from "../../../../../../resources/Typography";

const Content = () => {
  return (
    <Container sx={{ mt: 1 }}>
      <Typography variant="h5">{Subject}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ mt: 1 }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Stack>
            <Card sx={{ mt: 1 }}>
              <CardContent></CardContent>
            </Card>
            <Card sx={{ mt: 1 }}>
              <CardContent></CardContent>
            </Card>
            <Card sx={{ mt: 1 }}>
              <CardContent></CardContent>
            </Card>
            <Card sx={{ mt: 1 }}>
              <CardContent></CardContent>
            </Card>
          </Stack>
          <Stack>
            <Box sx={{ mt: 1, textAlign: "right" }}>
              <Button
                variant="contained"
                color="success"
                sx={{ maxWidth: "xs" }}
              >
                {Add}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
