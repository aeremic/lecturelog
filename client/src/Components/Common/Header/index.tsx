import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Logo from "../Logo";
import TemporaryDrawer from "../TemporaryDrawer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { logout } from "../../../services/HttpService/AuthService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLogoutClick = () => {
    logout();
    navigate("/", { replace: true });
  };

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
          ></IconButton>
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
            <Logo widthProp={70} heightProp={70} />
          </Typography>
          <Button color="inherit" onClick={handleLogoutClick}>
            {
              // @ts-ignore
              <LogoutIcon fontSize="xs" sx={{ mr: 0.5 }} />
            }
            <Typography>{t("Logout")}</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
