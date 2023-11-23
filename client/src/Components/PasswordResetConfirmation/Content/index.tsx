import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { sendEmailVerification } from "../../../services/HttpService/UsersService";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import { IContentProps } from "../../../models/Props/IContentProps";
import { useTranslation } from "react-i18next";
import useQueryIdParameter from "../../../hooks/UseQueryIdParameter";

const Content: React.FC<IContentProps> = ({
  setOpenAlert,
  setAlertMessage,
  setAlertType,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userId = useQueryIdParameter();

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleSendPasswordResetEmailAgainClick = async () => {
    if (userId != -1) {
      const res: any = await sendPasswordResetEmail(userId);
      if (
        res &&
        res.status &&
        res.status === HttpStatusCode.Created &&
        res.data &&
        res.data.id > 0
      ) {
        setConfirmationDialogOpen(true);
      } else {
        setAlertType("error");
        setAlertMessage(t("AlertFailureMessage"));
        setOpenAlert(true);
      }
    } else {
      setAlertType("error");
      setAlertMessage(t("AlertFailureMessage"));
      setOpenAlert(true);
    }
  };

  const handleConfirmationDialogClose = async (value?: any) => {
    setConfirmationDialogOpen(false);
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 8, flexGrow: 1 }}
    >
      <Card variant="outlined" sx={{ width: 365 }}>
        <CardContent>
          <Container component="main">
            <Typography component="h1" variant="h5">
              <CheckIcon fontSize="small" sx={{ mr: 0.5 }} />
              {t("ResetPasswordEmailSent")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <Alert severity="success" sx={{ width: 270 }}>
              {t("ResetPasswordEmailSuccess")}
            </Alert>
            <Stack direction={"row"} sx={{ mt: 0.4 }}>
              <Typography variant="body2" sx={{ mt: 0.4 }}>
                {t("DidntReceiveAnEmail")}
              </Typography>
              <Button
                size="small"
                onClick={handleSendPasswordResetEmailAgainClick}
              >
                <Typography variant="body2">{t("SendAgain")}</Typography>
              </Button>
            </Stack>
          </Container>
          <ConfirmationDialog
            id="confirmation-subject-menu"
            keepMounted
            open={confirmationDialogOpen}
            title={t("AlertSuccessfullMessage")}
            positiveAction={t("Ok")}
            value={-1}
            onClose={handleConfirmationDialogClose}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
