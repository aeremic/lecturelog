import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MuiFileInput } from "mui-file-input";
import { HttpStatusCode } from "axios";
import { uploadUsers } from "../../../services/HttpService/UsersService";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { uploadProfessors } from "../../../services/HttpService/ProfessorsService";
import { uploadStudents } from "../../../services/HttpService/StudentsService";

export interface IUploadUsersDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  roleType: RoleEnum;
  negativeAction: string;
  positiveAction: string;
  onClose: (value?: any) => void;
}

const UploadUsersDialog = (props: IUploadUsersDialogRawProps) => {
  const {
    onClose,
    open,
    title,
    roleType,
    negativeAction,
    positiveAction,
    ...other
  } = props;

  const { t } = useTranslation();

  const [fileValue, setFileValue] = useState();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    if (fileValue) {
      const formData = new FormData();
      formData.append("file", fileValue);

      let res: any = undefined;
      switch (roleType) {
        case RoleEnum.Professor:
          res = await uploadProfessors(formData);
          break;
        case RoleEnum.Student:
          res = await uploadStudents(formData);
          break;
      }

      if (res && res.status == HttpStatusCode.Created && res.data) {
        onClose(fileValue);
      }
    }
  };

  const handleUploadUsersChange = (newFileValue: any) => {
    setFileValue(newFileValue);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 700 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{t("UploadCSVFileToAddMoreUsers")}</Typography>
        <MuiFileInput value={fileValue} onChange={handleUploadUsersChange} />
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
        <Button variant="contained" color="success" onClick={handleOk}>
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
