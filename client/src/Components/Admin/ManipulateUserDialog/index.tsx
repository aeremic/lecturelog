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
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Admin,
  Email,
  FirstName,
  Index,
  LastName,
  PleaseEnterEmail,
  PleaseEnterFirstName,
  PleaseEnterLastName,
  PleaseEnterStudentIndex,
  PleaseEnterStudentYear,
  Student,
  UserType,
  Year,
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

    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, valueProp, open, reset]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const onSubmit = async (data: IManipulateUserFormInput) => {
    const user: IUser = {
      id: value.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role,
      index: data.index,
      year: data.year,
    };

    const res: any = await createUser(user);
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
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 700 } }}
      maxWidth="xs"
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
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{LastName}</FormLabel>
              <TextField
                label={PleaseEnterLastName}
                variant="outlined"
                type="text"
                {...register("lastname", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{Email}</FormLabel>
              <TextField
                label={PleaseEnterEmail}
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            {defaultRoleEnum == RoleEnum.Student ? (
              <Stack direction="row">
                <FormGroup sx={{ mt: 2, mr: 2 }}>
                  <FormLabel>{Index}</FormLabel>
                  <TextField
                    label={PleaseEnterStudentIndex}
                    variant="outlined"
                    type="number"
                    {...register("index", {
                      required: true,
                      valueAsNumber: true,
                      validate: (value: any) => value > 0,
                    })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>{Year}</FormLabel>
                  <TextField
                    label={PleaseEnterStudentYear}
                    variant="outlined"
                    type="number"
                    {...register("year", {
                      required: true,
                      valueAsNumber: true,
                      validate: (value: any) => value > 0,
                    })}
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
              </Stack>
            ) : (
              <></>
            )}
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>{UserType}</FormLabel>
              <TextField
                select
                disabled
                defaultValue={defaultRoleEnum}
                inputProps={register("role", {
                  required: true,
                })}
                sx={{ mt: 0.8 }}
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
