import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Admin,
  Email,
  FirstName,
  LastName,
  PleaseEnterEmail,
  PleaseEnterFirstName,
  PleaseEnterLastName,
  Student,
  UserType,
} from "../../../resources/Typography";
import { useForm } from "react-hook-form";
import { Professor } from "../../../resources/Typography/index";

export interface IManipulateUserDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  negativeAction: string;
  positiveAction: string;
  value: any;
  onClose: (value?: any) => void;
}

enum RoleEnum {
  professor = "professor",
  student = "student",
  admin = "admin",
}

interface IManipulateUserFormInput {
  // TODO: Add index for students
  firstname: string;
  lastname: string;
  email: string;
  role: RoleEnum;
}

interface IManipulateUser {
  id: number;
  actionResult: boolean;
}

const ManipulateUserDialog = (props: IManipulateUserDialogRawProps) => {
  const {
    onClose,
    value: valueProp,
    open,
    title,
    negativeAction,
    positiveAction,
    ...other
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IManipulateUserFormInput>();
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const onSubmit = async (data: IManipulateUserFormInput) => {
    debugger;
    let manipulateUser: IManipulateUser = { id: value.id, actionResult: true };
    setValue(manipulateUser);
    // TODO: Check Role for empty value

    console.log(value);
    console.log(data);
    handleOk();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <FormControl>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{FirstName}</FormLabel>
              <TextField
                label={PleaseEnterFirstName}
                variant="outlined"
                type="text"
                {...register("firstname", { required: true })}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{LastName}</FormLabel>
              <TextField
                label={PleaseEnterLastName}
                variant="outlined"
                type="text"
                {...register("lastname", { required: true })}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Email}</FormLabel>
              <TextField
                label={PleaseEnterEmail}
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-required-label">
                {UserType}
              </InputLabel>
              <TextField
                select
                defaultValue=""
                inputProps={register("role", {
                  required: "Please select type of the user",
                })}
              >
                <MenuItem value="professor">{Professor}</MenuItem>
                <MenuItem value="student">{Student}</MenuItem>
                <MenuItem value="admin">{Admin}</MenuItem>
              </TextField>
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            {negativeAction}
          </Button>
          <Button variant="contained" color="success" type="submit">
            {positiveAction}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ManipulateUserDialog;
