import {
  Button,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { HttpStatusCode } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Code,
  EmailRegistrationSubtitle,
  Password,
  PleaseEnterYourCode,
  PleaseEnterYourNewPassword,
  PleaseRepeatYourNewPassword,
  Register,
  RegistrationWithEmail,
  RepeatPassword,
} from "../../../resources/Typography";

interface IEmailRegistration {
  userId: number;
  code: string;
  password: string;
  repeatedPassword: string;
}

const Content = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailRegistration>();

  const onSubmit = async (data: IEmailRegistration) => {
    let userId: string | null = queryParameters.get("id");
    data.userId = userId != null ? parseInt(userId) : -1;

    let res: any; // = await login(data);
    if (res && res.status && res.status === HttpStatusCode.Ok) {
      if (res.data) {
        navigate("/login", { replace: true });
      } else {
      }
    }
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        {RegistrationWithEmail}
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Typography variant="body1">{EmailRegistrationSubtitle}</Typography>
      <FormControl fullWidth sx={{ minWidth: "300px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Code}</FormLabel>
            <TextField
              label={PleaseEnterYourCode}
              variant="outlined"
              type="text"
              {...register("code", { required: true })}
            >
              {errors?.code?.type === "required" && (
                <Typography>This field is required</Typography>
              )}
            </TextField>
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{Password}</FormLabel>
            <TextField
              label={PleaseEnterYourNewPassword}
              variant="outlined"
              type="password"
              {...register("password", { required: true })}
            >
              {errors?.password?.type === "required" && (
                <Typography>This field is required</Typography>
              )}
            </TextField>
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <FormLabel>{RepeatPassword}</FormLabel>
            <TextField
              label={PleaseRepeatYourNewPassword}
              variant="outlined"
              type="password"
              {...register("repeatedPassword", { required: true })}
            >
              {errors?.repeatedPassword?.type === "required" && (
                <Typography>This field is required</Typography>
              )}
            </TextField>
          </FormGroup>
          <FormGroup sx={{ mt: 2 }}>
            <Button variant="contained" size="large" type="submit">
              {Register}
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Container>
  );
};

export default Content;
