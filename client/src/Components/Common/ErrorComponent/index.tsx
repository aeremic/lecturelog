import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useTranslation } from "react-i18next";

const ErrorComponent = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 6 }}
    >
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <SentimentDissatisfiedIcon />
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="h6">{t("SomethingWentWrong")}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ErrorComponent;
