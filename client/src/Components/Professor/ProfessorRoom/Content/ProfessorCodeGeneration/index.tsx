import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccessCodeGeneration,
  GenerateAccessCode,
  PleaseGenerateAccessCodeForStudentsToEnter,
} from "../../../../../resources/Typography";
import PinIcon from "@mui/icons-material/Pin";

const ProfessorCodeGeneration = () => {
  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{AccessCodeGeneration}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="column" spacing={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>
              {PleaseGenerateAccessCodeForStudentsToEnter}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">CODE</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={(e) => {}}
              variant="contained"
              color="success"
              size="medium"
            >
              {
                // @ts-ignore
                <PinIcon fontSize="xs" sx={{ mr: 0.5 }} />
              }
              {GenerateAccessCode}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfessorCodeGeneration;
