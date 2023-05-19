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

function createData(
  index: string,
  email: string,
  firstname: string,
  lastname: string,
  carbs: number,
  protein: number
) {
  return { index, email, firstname, lastname, carbs, protein };
}

const rows = [
  createData("114/2020", "milos@gmail.com", "Milos", "Jankovic", 24, 4.0),
  createData(
    "134/2020",
    "petarpetarpetar@gmail.com",
    "Petar",
    "Jankovic",
    24,
    4.0
  ),
];

const StudentsTable = () => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        sx={{ mb: 1, wiwdth: 1 }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 290 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "secondary.light",
                  color: "secondary.contrastText",
                },
              }}
            >
              <TableCell>Index</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center" colSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.index}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="center">{row.firstname}</TableCell>
                <TableCell align="center">{row.lastname}</TableCell>
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
      </TableContainer>
      <Box sx={{ m: 1 }}>
        <PaginationComponent />
      </Box>
    </>
  );
};

export default StudentsTable;
