import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjects } from "../../../../services/SubjectsService";
import {
  Action,
  Add,
  AlertFailureMessage,
  AllSubjects,
  AreYouSure,
  Cancel,
  Id,
  Name,
  NoSubjectsFound,
  RemoveSubject,
  SubjectSuccessfullyRemoved,
  Subjects,
  Yes,
} from "../../../../resources/Typography";
import { HttpStatusCode } from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../../Common/ConfirmationDialog";

interface ISubject {
  id: number;
  name: string;
}

const SubjectsTable = () => {
  const subjectInitialState: ISubject[] = [
    {
      id: 0,
      name: "",
    },
  ];

  const [subjects, setSubjects] = useState(subjectInitialState);
  const [subjectsLoaded, setSubjectsLoaded] = useState(false);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeIndexValue, setRemoveIndexValue] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    getSubjects(`?page=${controller.page}&size=${controller.rowsPerPage}`).then(
      (res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          setSubjects(res.data.subjects ?? []);
          setSubjectsCount(res.data.count ?? 0);

          setSubjectsLoaded(true);
        } else {
          setAlertType("error");
          setAlertMessage(AlertFailureMessage);
          setOpenAlert(true);
        }
      }
    );
  }, [controller, subjectsLoaded]);

  const handlePageChange = (event: any, newPage: number) => {
    setSubjectsLoaded(false);
    setController({ ...controller, page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setSubjectsLoaded(false);
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleRemoveDialogClick = (index: number) => {
    setRemoveIndexValue(index);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogClose = async (newValue?: any) => {
    setRemoveDialogOpen(false);
    if (newValue) {
      setRemoveIndexValue(newValue);

      const res: any = null; /// await removeUser(removeIndexValue);
      if (res && res.status && res.status === HttpStatusCode.Ok) {
        setAlertType("success");
        setAlertMessage(SubjectSuccessfullyRemoved);
        setOpenAlert(true);

        setSubjectsLoaded(false);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    }
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5">{Subjects}</Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">{AllSubjects}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row">
              <Button
                onClick={() => {
                  // handleAddUserDialogClick({ id: 0, actionResult: false });
                }}
                variant="contained"
                color="success"
                size="small"
                sx={{ mb: 1 }}
              >
                <AddIcon />
              </Button>
            </Stack>
            {subjectsLoaded ? (
              <Box>
                <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table sx={{ minWidth: 290 }} size="small">
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                          },
                        }}
                      >
                        <TableCell>{Id}</TableCell>
                        <TableCell align="center">{Name}</TableCell>
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
                          <TableCell>{subject.id}</TableCell>
                          <TableCell align="center">{subject.name}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                handleRemoveDialogClick(subject.id);
                              }}
                              variant="outlined"
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ m: 1 }}>
                  <TablePagination
                    component="div"
                    onPageChange={handlePageChange}
                    page={controller.page}
                    count={subjectsCount}
                    rowsPerPage={controller.rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  ></TablePagination>
                </Box>
              </Box>
            ) : (
              <Typography>{NoSubjectsFound}</Typography>
            )}
            <ConfirmationDialog
              id="remove-subject-menu"
              keepMounted
              open={removeDialogOpen}
              title={RemoveSubject}
              content={AreYouSure}
              negativeAction={Cancel}
              positiveAction={Yes}
              value={removeIndexValue}
              onClose={handleRemoveDialogClose}
            />
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={alertType}
                sx={{ width: "100%" }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SubjectsTable;
