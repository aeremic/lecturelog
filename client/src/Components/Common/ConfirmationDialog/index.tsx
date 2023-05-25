import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { No, Yes } from "../../../resources/Typography";

export interface IConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  title: string;
  content: string;
  negativeAction: string;
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
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    debugger;
    onClose(value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{content}</Typography>
        {/* <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup> */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {negativeAction}
        </Button>
        <Button onClick={handleOk}>{positiveAction}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
