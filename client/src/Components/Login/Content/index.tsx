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
import { useForm } from "react-hook-form";
import { login } from "../../../services/Common/Auth";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";

interface ILoginFormInput {
  email: string;
  password: string;
}

const Content = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const onSubmit = async (data: ILoginFormInput) => {
    let res: any = await login(data);
    if (res && res.status && res.status === HttpStatusCode.Created) {
      navigate("/admin/users", { replace: true });
    }
  };

  return (
    <Container component="main">
      <Typography textAlign="center" variant="h3">
        Logo
      </Typography>
      <Typography component="h1" variant="h5">
        {LogIn}
      </Typography>
      <FormControl sx={{ minWidth: "300px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Email}</FormLabel>
            <TextField
              label={PleaseEnterYourEmail}
              variant="outlined"
              type="email"
              {...register("email", { required: true })}
            >
              {errors?.email?.type === "required" && (
                <Typography>This field is required</Typography>
              )}
            </TextField>
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Password}</FormLabel>
            <TextField
              label={PleaseEnterYourPassword}
              variant="outlined"
              type="password"
              {...register("password", { required: true })}
            >
              {errors?.email?.type === "required" && (
                <Typography>This field is required</Typography>
              )}
            </TextField>
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
