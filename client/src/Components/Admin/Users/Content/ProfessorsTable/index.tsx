import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { getProfessors } from "../../../../../services/ProfessorsService";
import {
  Action,
  Add,
  AddUser,
  AreYouSure,
  Cancel,
  Edit,
  EditUser,
  Email,
  FirstName,
  LastName,
  NoProfessorsFound,
  Remove,
  RemoveUser,
  Yes,
} from "../../../../../resources/Typography";
import PaginationComponent from "../../../../Common/PaginationComponent";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";
import ManipulateUserDialog from "../../../ManipulateUserDialog";
import { RoleEnum } from "../../../../../Models/Enums";
import { Professor } from "../../../../../resources/Typography/index";
import { IProfessor } from "../../../../../Models/User/Professor";

interface IManipulateUser {
  id: number;
  actionResult: boolean;
}

const ProfessorsTable = () => {
  const professorsTableInitialState: IProfessor[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
    },
  ];

  const manipulateUserInitialState: IManipulateUser = {
    id: 0,
    actionResult: false,
  };

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeIndexValue, setRemoveIndexValue] = useState(0);

  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const [manipulateUserValue, setManipulateUserValue] = useState(
    manipulateUserInitialState
  );

  const [professors, setProfessors] = useState(professorsTableInitialState);
  const [professorsLoaded, setProfessorsLoaded] = useState(false);

  useEffect(() => {
    getProfessors().then((response) => {
      if (response && response.data) {
        setProfessors(response.data);
        setProfessorsLoaded(true);
      }
    });
  }, []);

  const handleRemoveDialogClick = (index: number) => {
    setRemoveIndexValue(index);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = (newValue?: any) => {
    setRemoveDialogOpen(false);
    if (newValue) {
      setRemoveIndexValue(newValue);
    }
  };

  const handleEditUserDialogClick = (editUser: IManipulateUser) => {
    setManipulateUserValue(editUser);
    setEditUserDialogOpen(true);
  };

  const handleEditUserDialogClose = (newValue?: any) => {
    // TODO: Bug - Values not updated.
    setEditUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);
    }
  };

  const handleAddUserDialogClick = (addUser: IManipulateUser) => {
    setManipulateUserValue(addUser);
    setAddUserDialogOpen(true);
  };

  const handleAddUserDialogClose = (newValue?: any) => {
    // TODO: Bug - Values not updated.
    setAddUserDialogOpen(false);
    if (newValue) {
      setManipulateUserValue(newValue);
    }
  };

  return (
    <>
      {professorsLoaded ? (
        <Box>
          <Stack direction="row">
            <Button
              onClick={() => {
                handleAddUserDialogClick({ id: 0, actionResult: false });
              }}
              variant="contained"
              color="success"
              size="large"
            >
              <AddIcon />
            </Button>
          </Stack>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 290 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  <TableCell>{Email}</TableCell>
                  <TableCell align="center">{FirstName}</TableCell>
                  <TableCell align="center">{LastName}</TableCell>
                  <TableCell align="center">{Action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {professors.map((professor, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {professor.email}
                    </TableCell>
                    <TableCell align="center">{professor.firstname}</TableCell>
                    <TableCell align="center">{professor.lastname}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleRemoveDialogClick(professor.id);
                        }}
                        variant="contained"
                        color="error"
                      >
                        {Remove}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <Box sx={{ m: 1 }}>
            <PaginationComponent />
          </Box>
        </Box>
      ) : (
        <Typography>{NoProfessorsFound}</Typography>
      )}
      <ConfirmationDialog
        id="remove-professor-menu"
        keepMounted
        open={removeDialogOpen}
        title={RemoveUser}
        content={AreYouSure}
        negativeAction={Cancel}
        positiveAction={Yes}
        value={removeIndexValue}
        onClose={handleRemoveDialogClose}
      />
      <ManipulateUserDialog
        id="add-professor-menu"
        keepMounted
        open={addUserDialogOpen}
        title={AddUser}
        negativeAction={Cancel}
        positiveAction={Add}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleAddUserDialogClose}
      />
      <ManipulateUserDialog
        id="edit-professor-menu"
        keepMounted
        open={editUserDialogOpen}
        title={EditUser}
        negativeAction={Cancel}
        positiveAction={Edit}
        defaultRoleEnum={RoleEnum.Professor}
        value={manipulateUserValue}
        onClose={handleEditUserDialogClose}
      />
    </>
  );
};

export default ProfessorsTable;
