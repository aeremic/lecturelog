import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { RoleEnum } from "../../../models/Enums";
import { getCurrentUserData } from "../../../services/HttpService/AuthService";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();

  // TODO: Hide menu when logged off.
  const userData = getCurrentUserData();
  return (
    <Box role="presentation" sx={{ minWidth: 280 }}>
      {userData.id != undefined ? (
        <List>
          {userData.role == RoleEnum.Admin ? (
            <>
              <ListItem>
                <ListItemButton component={Link} to="/admin/users">
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("Users")} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/user/profile`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("MyProfile")} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          {userData.role == RoleEnum.Professor ? (
            <>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/professor/mysubjects`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("MySubjects")} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/user/profile`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("MyProfile")} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          {userData.role == RoleEnum.Student ? (
            <>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/student/home`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("Home")} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/user/profile`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("MyProfile")} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <></>
          )}
        </List>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Menu;
