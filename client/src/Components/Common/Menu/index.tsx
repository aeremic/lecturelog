import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { RoleEnum } from "../../../models/Enums";
import { getAccessTokenData } from "../../../services/HttpService/AuthService";
import { useTranslation } from "react-i18next";
import useCurrentUserData from "../../../hooks/UseCurrentUserData";

const Menu = () => {
  const { t } = useTranslation();

  const accessTokenData = getAccessTokenData();
  const userData = useCurrentUserData();

  return (
    <Box role="presentation" sx={{ minWidth: 280 }}>
      {accessTokenData.id != undefined ? (
        <List>
          <ListItem>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 2 }}
            >
              <Typography variant="h5">
                {t("Hi")} {userData != undefined ? userData.firstname : ""}
              </Typography>
            </Box>
          </ListItem>
          <Divider />
          {accessTokenData.role == RoleEnum.Admin ? (
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
          {accessTokenData.role == RoleEnum.Professor ? (
            <>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/professor/mysubjects`,
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
          {accessTokenData.role == RoleEnum.Student ? (
            <>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/student/home`,
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
