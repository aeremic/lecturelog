import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Subjects, Users } from "../../../resources/Typography";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Box role="presentation">
      <List>
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
      </List>
    </Box>
  );
};

export default Menu;
