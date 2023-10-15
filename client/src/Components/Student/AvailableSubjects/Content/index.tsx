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
import { getCurrentUserId } from "../../../../services/HttpService/AuthService";
import React from "react";
import { IContentProps } from "../../../../models/Props/IContentProps";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import KeyIcon from "@mui/icons-material/Key";
import TelegramIcon from "@mui/icons-material/Telegram";

export const Content: React.FC<IContentProps> = ({
  setOpenAlert,
  setAlertMessage,
  setAlertType,
}) => {
  const { t } = useTranslation();

  const userId = getCurrentUserId();

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
              <form>
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
