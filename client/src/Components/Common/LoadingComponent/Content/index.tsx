import { Box } from "@mui/material";
import Loader from "../../Loader";

const Content = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 30, flexGrow: 1 }}
    >
      <Loader type={"bars"} color="#3d6bb3" height={60} width={60} />
    </Box>
  );
};

export default Content;
