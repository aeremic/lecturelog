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
import { RoleEnum } from "../../../Models/Enums";
import { getTokenData } from "../../../services/Common/Auth";

const Menu = () => {
  // TODO: Hide menu when logged off.
  const tokenData = getTokenData();
  return (
    <Box role="presentation">
      {tokenData.id != undefined ? (
        <List>
          {tokenData.role == RoleEnum.Admin ? (
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
          {tokenData.role == RoleEnum.Professor ? (
            <>
              <ListItem>
                <ListItemButton component={Link} to="/user/profile">
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={MyProfile} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton component={Link} to="/professor/subjects">
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
          {tokenData.role == RoleEnum.Student ? <>bb</> : <></>}
        </List>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Menu;
