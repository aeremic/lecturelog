import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
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
import {
  generateTemplateFile,
  uploadProfessors,
} from "../../../services/HttpService/ProfessorsService";
import { uploadStudents } from "../../../services/HttpService/StudentsService";
import { UploadUsersResult } from "../../../modelHelpers/Enums/index";

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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
        if (res.data.errors.length > 0) {
          setErrorMessages(res.data.errors);
        }

        if (res.data.result == UploadUsersResult.successfull) {
          onClose(true);
        }
      } else {
        onClose(false);
      }
    }
  };

  const handleUploadUsersChange = (newFileValue: any) => {
    setFileValue(newFileValue);
  };

  const handleGenerateTemplateFileClick = async () => {
    const res: any = await generateTemplateFile();
    if (res && res.status == HttpStatusCode.Ok && res.data) {
      debugger;
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "100%", maxHeight: 500, minWidth: 300 },
      }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 1 }}>
          <Typography>{t("UploadCSVFileToAddMoreUsers")}</Typography>
        </Box>
        <Stack direction={"row"} sx={{ mb: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleGenerateTemplateFileClick}
          >
            <Typography variant="body2">{t("DownloadFileTemplate")}</Typography>
          </Button>
        </Stack>
        <Divider />
        <Box sx={{ mt: 1, mb: 1 }}>
          <MuiFileInput
            fullWidth
            value={fileValue}
            onChange={handleUploadUsersChange}
          />
        </Box>
        {errorMessages.length > 0 ? (
          <Box sx={{ mb: 1 }}>
            <Typography>Errors:</Typography>
            {errorMessages.map((errorMessage, index) => (
              <Typography variant="body2">
                {index + 1}. {errorMessage}
              </Typography>
            ))}
          </Box>
        ) : (
          <></>
        )}
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
