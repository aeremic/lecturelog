import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email,
  LogIn,
  Password,
  PleaseEnterYourEmail,
  PleaseEnterYourPassword,
} from "../../../resources/Typography";

const Content = () => {
  return (
    <Box>
      <Typography variant="h3">Logo</Typography>
      <FormControl sx={{ minWidth: "300px" }}>
        <FormGroup sx={{ mt: 2 }}>
          <FormLabel>{Email}</FormLabel>
          <TextField
            label={PleaseEnterYourEmail}
            variant="outlined"
          ></TextField>
        </FormGroup>
        <FormGroup sx={{ mt: 2 }}>
          <FormLabel>{Password}</FormLabel>
          <TextField label={PleaseEnterYourPassword} type="password" />
        </FormGroup>
        <FormGroup sx={{ mt: 2 }}>
          <Button variant="contained" size="large">
            {LogIn}
          </Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Content;
