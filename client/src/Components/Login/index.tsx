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
            <Content/>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
