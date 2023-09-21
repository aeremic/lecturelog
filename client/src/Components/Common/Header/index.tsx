import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Logo from "../Logo";
import TemporaryDrawer from "../TemporaryDrawer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

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
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
            <Logo />
          </Typography>
          <Button color="inherit">
            <LogoutIcon fontSize="xs" sx={{ mr: 0.5 }} />
            <Typography>{t("Logout")}</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
