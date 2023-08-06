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
  MyProfile,
  MySubjects,
  Subjects,
  Users,
} from "../../../resources/Typography";
import { Link } from "react-router-dom";
import { RoleEnum } from "../../../models/Enums";
import { getCurrentUserData } from "../../../services/Common/Auth";

const Menu = () => {
  // TODO: Hide menu when logged off.
  const userData = getCurrentUserData();
  return (
    <Box role="presentation">
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
          {userData.role == RoleEnum.Student ? <>bb</> : <></>}
        </List>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Menu;
