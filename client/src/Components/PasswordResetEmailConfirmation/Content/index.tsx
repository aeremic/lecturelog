import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

const Content = () => {
  const { t } = useTranslation();

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
          </Container>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Content;
