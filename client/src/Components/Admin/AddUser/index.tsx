import { Box, Card, CardContent, ThemeProvider } from "@mui/material";
import Content from "./Content";
import theme from "../../../styles";

const AddUser = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 20, flexGrow: 1 }}
        >
          <Card variant="outlined">
            <CardContent>
              <Content />
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default AddUser;
