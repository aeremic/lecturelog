import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PaginationComponent from "../../../Common/PaginationComponent";
import { useEffect, useState } from "react";
import { getProfessors } from "../../../../services/ProfessorsService";
import {
  Action,
  AreYouSure,
  FirstName,
  LastName,
  No,
  NoProfessorsFound,
  Remove,
  RemoveUser,
  Search,
  Yes,
} from "../../../../resources/Typography";
import ConfirmationDialog from "../../../Common/ConfirmationDialog";

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
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
    setValue(index);
    setOpen(true);
  };

  const handleRemoveDialogClose = (newValue?: any) => {
    setOpen(false);

    debugger;
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      {professorsLoaded ? (
        <Box>
          <TextField
            id="outlined-basic"
            label={Search}
            variant="outlined"
            size="small"
            sx={{ mb: 1, width: 1 }}
          />
          <TableContainer component={Paper}>
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
        open={open}
        title={RemoveUser}
        content={AreYouSure}
        negativeAction={No}
        positiveAction={Yes}
        value={value}
        onClose={handleRemoveDialogClose}
      />
    </>
  );
};

export default ProfessorsTable;
