import {
  Button,
  Container,
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
import useForm from "../../../hooks/UseForm";

const Content = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const loginCallback = async () => {
    // send call
    console.log(values);
  };

  const { onChange, onSubmit, values } = useForm(loginCallback, initialState);

  return (
    <Container component="main">
      <Typography textAlign="center" variant="h3">
        Logo
      </Typography>
      <Typography component="h1" variant="h5">
        {LogIn}
      </Typography>
      <FormControl sx={{ minWidth: "300px" }}>
        <form onSubmit={onSubmit}>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Email}</FormLabel>
            <TextField
              label={PleaseEnterYourEmail}
              variant="outlined"
              required
              name="email"
              id="email"
              type="email"
              onChange={onChange}
            ></TextField>
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Password}</FormLabel>
            <TextField
              label={PleaseEnterYourPassword}
              variant="outlined"
              name="password"
              id="password"
              type="password"
              required
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <Button variant="contained" size="large" type="submit">
              {LogIn}
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Container>
  );
};

export default Content;
