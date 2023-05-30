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
import { RoleEnum } from "../../../Models/Enums";
import { createUser } from "../../../services/UsersService";
import { IUser } from "../../../Models/User";
import { HttpStatusCode } from "axios";

export interface IManipulateUserDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  negativeAction: string;
  positiveAction: string;
  defaultRoleEnum: RoleEnum;
  value: any;
  onClose: (value?: any) => void;
}

interface IManipulateUserFormInput {
  // TODO: Add index for students.
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  index?: number | null;
  year?: number | null;
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
    defaultRoleEnum,
    ...other
  } = props;
  const { register, handleSubmit, reset, formState } =
    useForm<IManipulateUserFormInput>();
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (open) {
      setValue(valueProp);
    }

    // TODO: Bug - Role not reseting after submit. On opening pop up again "User type" is preselected. User needs to click "Add" two times.
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, valueProp, open, reset]);

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const onSubmit = async (data: IManipulateUserFormInput) => {
    let user: IUser = {
      id: value.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role,
      index: data.index,
      year: data.year,
    };

    let res: any = await createUser(user);
    if (
      res &&
      res.status &&
      res.status === HttpStatusCode.Created &&
      res.data &&
      res.data.id
    ) {
      setValue({ id: res.data.id, actionResult: true });
      handleOk();
    } else {
      handleCancel();
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 635 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
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
              <FormLabel>{UserType}</FormLabel>
              <TextField
                select
                disabled
                defaultValue={defaultRoleEnum}
                inputProps={register("role", {
                  required: true,
                })}
              >
                {defaultRoleEnum == RoleEnum.Professor ? (
                  <MenuItem value="professor">{Professor}</MenuItem>
                ) : (
                  <MenuItem value="student">{Student}</MenuItem>
                )}
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
