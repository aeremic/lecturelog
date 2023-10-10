import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckIcon from "@mui/icons-material/Check";
import { ISubjectFormInput } from "../../../../../models/FormInputs/ISubjectFormInput";
import { IManipulateSubjectProps } from "../../../../../models/Props/IManipulateSubjectProps";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  createOrUpdateSubject,
  getSubject,
  removeSubject,
} from "../../../../../services/HttpService/SubjectsService";
import { HttpStatusCode } from "axios";
import { ISubject } from "../../../../../models/ISubject";
import { SubjectManipulationType } from "../../../../../models/Enums";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const subjectInitialState = {
  id: 0,
  name: "",
  pointsPerPresence: "",
};

export const ManipulateSubject: React.FC<IManipulateSubjectProps> = ({
  userIdProp,
  subjectIdProp,
}) => {
  const userId: number = userIdProp;
  const subjectId: number = subjectIdProp;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const manipulationType =
    subjectId === -1
      ? SubjectManipulationType.creating
      : SubjectManipulationType.updating;

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationDialogContent, setConfirmationDialogContent] =
    useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const [subject, setSubject] =
    useState<ISubjectFormInput>(subjectInitialState);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeIndexValue, setRemoveIndexValue] = useState(0);

  useEffect(() => {
    const getSubjectData = async () => {
      if (userId != -1 && subjectId != -1) {
        const res: any = await getSubject(subjectId);
        if (res && res.status && res.status === HttpStatusCode.Ok && res.data) {
          setSubject({
            id: res.data.id,
            name: res.data.name,
            pointsPerPresence: res.data.pointsPerPresence,
          });
        } else {
          setAlertType("error");
          setAlertMessage(t("SomethingWentWrong"));
          setOpenAlert(true);
        }
      }
    };

    getSubjectData();
  }, [userId, subjectId]);

  const handleNameChange = (event: any) => {
    setSubject({
      id: subject.id,
      name: event.target.value,
      pointsPerPresence: subject.pointsPerPresence,
    });
  };

  const handlePoinstPerPresenceChange = (event: any) => {
    setSubject({
      id: subject.id,
      name: subject.name,
      pointsPerPresence: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const modelToPost: ISubject = {
      id: subject.id ?? 0,
      name: subject.name,
      pointsPerPresence: subject.pointsPerPresence
        ? parseFloat(subject.pointsPerPresence)
        : 0,
      professorId: userId,
    };

    const res: any = await createOrUpdateSubject(modelToPost);
    if (res && res.status && res.status === HttpStatusCode.Created) {
      if (manipulationType === SubjectManipulationType.creating) {
        setConfirmationDialogContent(t("SubjectSuccessfullyAdded"));
      } else if (manipulationType === SubjectManipulationType.updating) {
        setConfirmationDialogContent(t("SubjectSuccessfullyUpdated"));
      }
      setConfirmationDialogOpen(true);
    } else {
      setAlertType("error");
      setAlertMessage(t("SomethingWentWrong"));
      setOpenAlert(true);
    }
  };

  const handleConfirmationDialogClose = async (value?: any) => {
    setConfirmationDialogOpen(false);
    if (manipulationType === SubjectManipulationType.creating) {
      navigate(`/professor/mysubjects?id=${userId}`, {
        replace: true,
      });
    }
  };

  const handleRemoveDialogClick = async (subjectId: number) => {
    setRemoveIndexValue(subjectId);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setRemoveDialogOpen(false);
    if (newValue) {
      setRemoveIndexValue(newValue);

      const res: any = await removeSubject(removeIndexValue);
      if (
        res &&
        res.status &&
        res.status === HttpStatusCode.Ok &&
        res.data > 0
      ) {
        setAlertType("success");
        setAlertMessage(t("SubjectSuccessfullyRemoved"));
        setOpenAlert(true);
        navigate(`/professor/mysubjects?id=${userId}`, {
          replace: true,
        });
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
        setOpenAlert(true);
      }
    }
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ mt: 1, minHeight: 200 }}>
          <CardContent>
            <FormControl fullWidth>
              <FormGroup sx={{ mt: 2 }}>
                <FormLabel>
                  {
                    // @ts-ignore
                    <TextFieldsIcon fontSize="xs" sx={{ mr: 0.5 }} />
                  }
                  {t("SubjectName")}
                </FormLabel>
                <Stack direction="row">
                  <TextField
                    label={t("PleaseEnterSubjectName")}
                    value={subject.name}
                    onChange={handleNameChange}
                    size="small"
                    variant="outlined"
                    type="text"
                    sx={{ mt: 0.8 }}
                  ></TextField>
                  <TextField
                    label={t("PleaseEnterPointsPerPresence")}
                    value={subject.pointsPerPresence}
                    onChange={handlePoinstPerPresenceChange}
                    size="small"
                    variant="outlined"
                    type="number"
                    sx={{ mt: 0.8, ml: 1, width: 100 }}
                  ></TextField>
                </Stack>
              </FormGroup>
              <FormGroup>
                {manipulationType === SubjectManipulationType.creating ? (
                  <Box sx={{ mt: 1, textAlign: "right" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="medium"
                      color="success"
                      sx={{ maxWidth: "xs", mr: 0.5 }}
                    >
                      {
                        // @ts-ignore
                        <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                      }
                      {t("CreateSubject")}
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 1, textAlign: "right" }}>
                    <Stack direction="row-reverse">
                      <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        color="info"
                        sx={{ maxWidth: "xs", ml: 1 }}
                      >
                        {
                          // @ts-ignore
                          <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                        }
                        {t("UpdateSubject")}
                      </Button>
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(subject.id);
                        }}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </Box>
                )}
              </FormGroup>
            </FormControl>
          </CardContent>
        </Card>
      </form>
      <ConfirmationDialog
        id="confirmation-subject-created"
        keepMounted
        open={confirmationDialogOpen}
        title={t("AlertSuccessfullMessage")}
        content={confirmationDialogContent}
        positiveAction={t("Ok")}
        value={-1}
        onClose={handleConfirmationDialogClose}
      />
      <ConfirmationDialog
        id="remove-subject-menu"
        keepMounted
        open={removeDialogOpen}
        title={t("RemoveSubject")}
        content={t("AreYouSure")}
        negativeAction={t("Cancel")}
        positiveAction={t("Yes")}
        value={removeIndexValue}
        onClose={handleRemoveDialogClose}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
