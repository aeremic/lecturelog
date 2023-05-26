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
  AreYouSure,
  Cancel,
  FirstName,
  LastName,
  NoProfessorsFound,
  Remove,
  RemoveUser,
  Yes,
} from "../../../../../resources/Typography";
import PaginationComponent from "../../../../Common/PaginationComponent";
import ConfirmationDialog from "../../../../Common/ConfirmationDialog";

interface IProfessor {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

const ProfessorsTable = () => {
  const initialState: IProfessor[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
    },
  ];

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeIndexValue, setRemoveIndexValue] = useState(0);
  const [professors, setProfessors] = useState(initialState);
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

  return (
    <>
      {professorsLoaded ? (
        <Box>
          {/* <TextField
            id="outlined-basic"
            label={Search}
            variant="outlined"
            size="small"
            sx={{ mb: 1, width: 0.9 }}
          /> */}
          <Stack direction="row">
            <Button
              component={Link}
              to="/admin/adduser"
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
                  <TableCell>Email</TableCell>
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
    </>
  );
};

export default ProfessorsTable;
