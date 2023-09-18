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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  AvailableSubjects,
  MyProfile,
  MySubjects,
  Subjects,
  Users,
} from "../../../resources/Typography";
import { Link } from "react-router-dom";
import { RoleEnum } from "../../../modelHelpers/Enums";
import { getCurrentUserData } from "../../../services/HttpService/AuthService";

const Menu = () => {
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
                  <ListItemText primary={Users} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/admin/subjects">
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary={Subjects} />
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
                    pathname: `/user/profile`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={MyProfile} />
                </ListItemButton>
              </ListItem>
              <Divider />
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
                  <ListItemText primary={MySubjects} />
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
                    pathname: `/user/profile`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={MyProfile} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <Divider />
              <ListItem>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: `/student/availablesubjects`,
                    search: `?id=${userData.id}`,
                  }}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary={AvailableSubjects} />
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
