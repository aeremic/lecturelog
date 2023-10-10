import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RoleEnum } from "../../../models/Enums";
import { IUser } from "../../../models/IUser";
import { HttpStatusCode } from "axios";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IManipulateUserFormInput } from "../../../models/FormInputs/IManipulateUserFormInput";
import { createUser } from "../../../services/HttpService/UsersService";
import { useTranslation } from "react-i18next";

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

const ManipulateUserDialog = (props: IManipulateUserDialogRawProps) => {
  const { t } = useTranslation();

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
      isActivated: false,
    };

    const res: any = await createUser(user);
    if (
      res &&
      res.status &&
      res.status === HttpStatusCode.Created &&
      res.data &&
      res.data.id
    ) {
      if (res.data.errorMessage) {
        handleCancel();
      } else if (res.data.id > 0) {
        setValue({ id: res.data.id, actionResult: true });
        handleOk();
      }
    } else {
      handleCancel();
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "100%", maxHeight: 700, minWidth: 300 },
      }}
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
                {
                  // @ts-ignore
                  <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("FirstName")}
              </FormLabel>
              <TextField
                label={t("PleaseEnterFirstName")}
                variant="outlined"
                type="text"
                {...register("firstname", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                {
                  // @ts-ignore
                  <PersonIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("LastName")}
              </FormLabel>
              <TextField
                label={t("PleaseEnterLastName")}
                variant="outlined"
                type="text"
                {...register("lastname", { required: true })}
                sx={{ mt: 0.8 }}
              ></TextField>
            </FormGroup>
            <FormGroup sx={{ mt: 2 }}>
              <FormLabel>
                {
                  // @ts-ignore
                  <AlternateEmailIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("Email")}
              </FormLabel>
              <TextField
                label={t("PleaseEnterEmail")}
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
                    {
                      // @ts-ignore
                      <ContactPageIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("Index")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterStudentIndex")}
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
                    {
                      // @ts-ignore
                      <CalendarMonthIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("Year")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterStudentYear")}
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
                {
                  // @ts-ignore
                  <PeopleAltIcon fontSize="xs" sx={{ mr: 0.5 }} />
                }
                {t("UserType")}
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
                  <MenuItem value="professor">{t("Professor")}</MenuItem>
                ) : (
                  <MenuItem value="student">{t("Student")}</MenuItem>
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
            {
              // @ts-ignore
              <CloseIcon fontSize="xs" sx={{ mr: 0.5 }} />
            }
            {negativeAction}
          </Button>
          <Button variant="contained" color="success" type="submit">
            {
              // @ts-ignore
              <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
            }

            {positiveAction}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ManipulateUserDialog;
