import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";

import Logo from "../Logo";
import TemporaryDrawer from "../TemporaryDrawer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { logout } from "../../../services/HttpService/AuthService";
import { useNavigate } from "react-router-dom";
import { disconnect } from "../../../services/MessagingService";

const Header = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLogoutClick = () => {
    logout();
    disconnect();

    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 65 }}>
          <TemporaryDrawer />
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Stack
            sx={{ flexGrow: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Logo widthProp={30} heightProp={30} />
            <Typography variant="subtitle2" component="div">
              {t("LectureLog")}
            </Typography>
          </Stack>
          <Button color="inherit" onClick={handleLogoutClick}>
            {
              // @ts-ignore
              <LogoutIcon fontSize="medium" sx={{ mr: 0.5 }} />
            }
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
