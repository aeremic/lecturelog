import { Container, FormControl, Typography } from "@mui/material";
import { AddUser } from "../../../../resources/Typography";

const Content = () => {
  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        {AddUser}
      </Typography>
      <FormControl sx={{ minWidth: "300px" }}></FormControl>
    </Container>
  );
};

export default Content;
