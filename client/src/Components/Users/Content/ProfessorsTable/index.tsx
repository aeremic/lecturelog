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
} from "@mui/material";
import PaginationComponent from "../../../Common/PaginationComponent";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../services/UsersService";

function createData(email: string, firstname: string, lastname: string) {
  return { email, firstname, lastname };
}

const rows = [
  createData("milos@gmail.com", "Milos", "Jankovic"),
  createData("milos2@gmail.com", "Milos", "Jankovic"),
  createData("petarpetarpetar@gmail.com", "Petar", "Jankovic"),
];

interface IProfessor {
  email: string;
  firstname: string;
  lastname: string;
}

const ProfessorsTable = () => {
  const initialState: IProfessor[] = [
    {
      email: "",
      firstname: "",
      lastname: "",
    },
  ];

  const [professors, setProfessors] = useState(initialState);

  useEffect(() => {
    getUsers().then((response) => {
      setProfessors(response.data);
    });
  }, []);

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
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
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center" colSpan={2}>
                Action
              </TableCell>
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
                  <Button>Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      <Box sx={{ m: 1 }}>
        <PaginationComponent />
      </Box>
    </>
  );
};

export default ProfessorsTable;
