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
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  index?: number | null;
  year?: number | null;
  role: RoleEnum;
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
              <FormLabel>
                <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                {FirstName}
              </FormLabel>
              <TextField
                label={PleaseEnterFirstName}
                variant="outlined"
                type="text"
                {...register("firstname", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                {LastName}
              </FormLabel>
              <TextField
                label={PleaseEnterLastName}
                variant="outlined"
                type="text"
                {...register("lastname", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                <AlternateEmailIcon fontSize="xs" sx={{ mr: 0.5 }} />
                {Email}
              </FormLabel>
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
                  <FormLabel>
                    <ContactPageIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    {Index}
                  </FormLabel>
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
                  <FormLabel>
                    <CalendarMonthIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    {Year}
                  </FormLabel>
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
              <FormLabel>
                <PeopleAltIcon fontSize="xs" sx={{ mr: 0.5 }} />
                {UserType}
              </FormLabel>
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
            <CloseIcon fontSize="xs" sx={{ mr: 0.5 }} />
            {negativeAction}
          </Button>
          <Button variant="contained" color="success" type="submit">
            <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />

            {positiveAction}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ManipulateUserDialog;
