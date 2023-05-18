import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Logo from "../Logo";
import TemporaryDrawer from "../TemporaryDrawer";
import { Logout } from "../../../resources/Typography/index";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer />
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Logo />
          </Typography>
          <Button color="inherit">{Logout}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
