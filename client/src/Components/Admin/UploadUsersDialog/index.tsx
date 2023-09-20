import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { IUser } from "../../../models/User";
import { HttpStatusCode } from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { createUser } from "../../../services/HttpService/UsersService";

export interface IUploadUsersDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  negativeAction: string;
  positiveAction: string;
  onClose: (value?: any) => void;
}

const UploadUsersDialog = (props: IUploadUsersDialogRawProps) => {
  const { onClose, open, title, negativeAction, positiveAction, ...other } =
    props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 700 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers></DialogContent>
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
    </Dialog>
  );
};

export default UploadUsersDialog;
