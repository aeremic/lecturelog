import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const ErrorComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <SentimentDissatisfiedIcon />
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="h6">Something went wrong!</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ErrorComponent;
