import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IContentProps } from "../../../../models/Props/IContentProps";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import KeyIcon from "@mui/icons-material/Key";
import TelegramIcon from "@mui/icons-material/Telegram";
import { IAttendSessionMetadata } from "../../../../models/IAttendSessionMetadata";
import { onAttendLecture } from "../../../../services/MessagingService";
import useCurrentUserIdentifier from "../../../../hooks/UseCurrentUserIdentifier";

export const Content: React.FC<IContentProps> = ({
  setOpenAlert,
  setAlertMessage,
  setAlertType,
}) => {
  const { t } = useTranslation();

  const userId = useCurrentUserIdentifier();

  const [code, setCode] = useState("");

  const handleCodeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCode(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (userId != -1 && code != "") {
      const attendSessionMetadata: IAttendSessionMetadata = {
        studentId: userId,
        code: code,
      };

      onAttendLecture(attendSessionMetadata);
      setCode("");

      setAlertType("success");
      setAlertMessage(t("AccessCodeSent"));
      setOpenAlert(true);
    } else {
      setAlertType("error");
      setAlertMessage(t("SomethingWentWrong"));
      setOpenAlert(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 8, flexGrow: 1 }}
    >
      <Card variant="outlined">
        <CardContent>
          <Container component="main">
            <Typography component="h1" variant="h5">
              <MeetingRoomIcon fontSize="small" sx={{ mr: 0.5 }} />
              {t("LiveLecturePass")}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <Alert severity="info" sx={{ width: 270 }}>
              {t("LiveLecturePassInfo")}
            </Alert>
            <FormControl fullWidth sx={{ width: 300 }}>
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mt: 2 }}>
                  <FormLabel>
                    {
                      // @ts-ignore
                      <KeyIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    {t("AccessCode")}
                  </FormLabel>
                  <TextField
                    label={t("PleaseEnterLiveLectureAccessCode")}
                    onChange={handleCodeChange}
                    value={code}
                    variant="outlined"
                    type="password"
                    sx={{ mt: 0.8 }}
                  ></TextField>
                </FormGroup>
                <FormGroup sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" type="submit">
                    {
                      // @ts-ignore
                      <TelegramIcon fontSize="xs" sx={{ mr: 0.5 }} />
                    }
                    <Typography>{t("Send")}</Typography>
                  </Button>
                </FormGroup>
              </form>
            </FormControl>
          </Container>
        </CardContent>
      </Card>
    </Box>
  );
};
