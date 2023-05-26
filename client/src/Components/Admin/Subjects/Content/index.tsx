import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
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
import { getSubjects } from "../../../../services/SubjectsService";
import {
  Action,
  Add,
  AllSubjects,
  Name,
  NoSubjectsFound,
  PointsPerPresence,
  Remove,
  Subjects,
} from "../../../../resources/Typography";
import PaginationComponent from "../../../Common/PaginationComponent";

interface ISubject {
  name: string;
  pointsPerPresence: number;
}

const SubjectsTable = () => {
  const initialState: ISubject[] = [
    {
      name: "",
      pointsPerPresence: 0,
    },
  ];

  const [subjects, setSubjects] = useState(initialState);
  const [subjectsLoaded, setSubjectsLoaded] = useState(false);

  useEffect(() => {
    getSubjects().then((response) => {
      if (response && response.data) {
        setSubjects(response.data);
        setSubjectsLoaded(true);
      }
    });
  }, []);

  return (
    <>
      {subjectsLoaded ? (
        <Container sx={{ mt: 2 }}>
          <Typography variant="h5">{Subjects}</Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">{AllSubjects}</Typography>
              <Divider sx={{ mb: 2 }} />
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
                          backgroundColor: "primary.light",
                          color: "primary.contrastText",
                        },
                      }}
                    >
                      <TableCell align="center">{Name}</TableCell>
                      <TableCell align="center">{PointsPerPresence}</TableCell>
                      <TableCell align="center">{Action}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjects.map((subject, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {subject.name}
                        </TableCell>
                        <TableCell align="center">
                          {subject.pointsPerPresence}
                        </TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="error">
                            {Remove}
                          </Button>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>{" "}
              <Box sx={{ m: 1 }}>
                <PaginationComponent />
              </Box>
            </CardContent>
          </Card>
        </Container>
      ) : (
        <Typography>{NoSubjectsFound}</Typography>
      )}
    </>
  );
};

export default SubjectsTable;
