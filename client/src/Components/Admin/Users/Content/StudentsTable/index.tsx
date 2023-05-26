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
import { getStudents } from "../../../../../services/StudentsService/index";
import {
  Action,
  Add,
  Email,
  FirstName,
  Index,
  LastName,
  NoStudentsFound,
  Remove,
} from "../../../../../resources/Typography";
import PaginationComponent from "../../../../Common/PaginationComponent";

interface IStudent {
  index: string;
  email: string;
  firstname: string;
  lastname: string;
}

const StudentsTable = () => {
  const initialState: IStudent[] = [
    {
      index: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  ];

  const [students, setStudents] = useState(initialState);
  const [studentsLoaded, setStudentsLoaded] = useState(false);

  useEffect(() => {
    getStudents().then((response) => {
      if (response && response.data) {
        setStudents(response.data);
        setStudentsLoaded(true);
      }
    });
  }, []);

  return (
    <>
      {studentsLoaded ? (
        <Box>
          {/* <TextField
            id="outlined-basic"
            label={Search}
            variant="outlined"
            size="small"
            sx={{ mb: 1, width: 0.9 }}
          /> */}
          <Stack direction="row">
            <Button variant="contained" color="success">
              {Add}
            </Button>
          </Stack>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
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
                  <TableCell>{Index}</TableCell>
                  <TableCell>{Email}</TableCell>
                  <TableCell align="center">{FirstName}</TableCell>
                  <TableCell align="center">{LastName}</TableCell>
                  <TableCell align="center">{Action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {student.index}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell align="center">{student.firstname}</TableCell>
                    <TableCell align="center">{student.lastname}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error">
                        {Remove}
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ m: 1 }}>
            <PaginationComponent />
          </Box>
        </Box>
      ) : (
        <Typography>{NoStudentsFound}</Typography>
      )}
    </>
  );
};

export default StudentsTable;
