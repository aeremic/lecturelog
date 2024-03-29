import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export interface IConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  content?: string;
  negativeAction?: string;
  positiveAction: string;
  value: any;
  onClose: (value?: any) => void;
}

const ConfirmationDialog = (props: IConfirmationDialogRawProps) => {
  const {
    onClose,
    value: valueProp,
    open,
    title,
    content,
    negativeAction,
    positiveAction,
    ...other
  } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      {content ? (
        <DialogContent dividers>
          <Typography>{content}</Typography>
        </DialogContent>
      ) : (
        <></>
      )}
      <DialogActions>
        {negativeAction ? (
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            <CloseIcon fontSize="xs" sx={{ mr: 0.5 }} />
            {negativeAction}
          </Button>
        ) : (
          <></>
        )}
        <Button variant="contained" color="success" onClick={handleOk}>
          <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
          {positiveAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
