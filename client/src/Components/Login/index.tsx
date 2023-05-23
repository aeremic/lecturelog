import {
  Box,
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../../styles";
import Content from "./Content";

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 20, flexGrow: 1 }}
      >
        <Card variant="outlined">
          <CardContent>
            <Content></Content>
          </CardContent>
        </Card>

        {/* <Grid container direction="column" spacing={2}>
          <Grid item sx={{ minHeight: "25vh" }}></Grid>
          <Grid item xs={10}>
            <Card variant="outlined">
              <CardContent>
                <Content></Content>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sx={{ minHeight: "25vh" }}></Grid>
        </Grid> */}
      </Box>
    </ThemeProvider>
  );
};

export default Login;
