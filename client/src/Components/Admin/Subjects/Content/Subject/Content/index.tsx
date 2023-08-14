import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddGroup,
  AlertFailureMessage,
  AlertSuccessfullMessage,
  CreateSubject,
  Group,
  NoProfessorsFound,
  NoStudentsFound,
  Ok,
  PleaseEnterPointsPerPresence,
  PleaseEnterSubjectName,
  PointsPerPresence,
  Professors,
  RemoveGroup,
  SelectStudents,
  Subject,
  UpdateSubject,
} from "../../../../../../resources/Typography";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { RoleEnum } from "../../../../../../models/Enums";
import { IUser } from "../../../../../../models/User";
import { getAllExceptAdmin } from "../../../../../../services/UsersService";
import { ISubject } from "../../../../../../models/Subject";
import { SubjectName } from "../../../../../../resources/Typography/index";
import { ISubjectGroup } from "../../../../../../models/SubjectGroup";
import {
  createOrUpdateSubject,
  getSubject,
} from "../../../../../../services/SubjectsService";
import { IProfessorsGroups } from "../../../../../../models/ProfessorsGroups";
import { IStudentsGroups } from "../../../../../../models/StudentsGroups";
import { useNavigate, useSearchParams } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmationDialog from "../../../../../Common/ConfirmationDialog";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { ISubjectFormInput } from "../../../../../../modelHelpers/SubjectFormInput";
import { ISubjectGroupsFormInput } from "../../../../../../modelHelpers/SubjectGroupsFormInput";
import convertToRoman from "../../../../../../functionHelpers/ConvertToRoman";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function not(a: readonly IUser[], b: readonly IUser[]) {
  const not = a
    .map((user) => user.id)
    .filter((value) => b.map((user) => user.id).indexOf(value) === -1);

  return a.filter((value) => not.indexOf(value.id) !== -1);
}

function intersection(a: readonly IUser[], b: readonly IUser[]) {
  const intersect = a
    .map((user) => user.id)
    .filter((value) => b.map((user) => user.id).indexOf(value) !== -1);

  return a.filter((value) => intersect.indexOf(value.id) !== -1);
}

const Content = () => {
  const [queryParameters] = useSearchParams();

  const userInitialState: IUser[] = [
    {
      id: 0,
      email: "",
      firstname: "",
      lastname: "",
      index: null,
      year: null,
      role: RoleEnum.Default,
    },
  ];

  const subjectInitialState = {
    id: 0,
    subjectName: "",
    subjectGroups: [],
  };

  const [professors, setProfessors] = useState(userInitialState);
  const [students, setStudents] = useState(userInitialState);
  const [subject, setSubject] =
    useState<ISubjectFormInput>(subjectInitialState);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [subjectLoaded, setSubjectLoaded] = useState(false);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  const navigate = useNavigate();

  useEffect(() => {
    const subjectIdParam: string | null = queryParameters.get("subjectId");
    const subjectId = subjectIdParam != null ? parseInt(subjectIdParam) : -1;

    const fetchData = async () => {
      let subjectName: string = subject.subjectName;
      let id: number = subject.id;
      const newSubjectGroups: ISubjectGroupsFormInput[] = [];

      let professors: IUser[] = [];
      let students: IUser[] = [];

      if (subjectId != -1) {
        await getSubject(subjectId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            if (res.data.subjectGroups) {
              res.data.subjectGroups.forEach((group: any) => {
                const groupStudentsFormInput: IUser[] = [];
                if (group.students) {
                  group.students.forEach((element: any) => {
                    groupStudentsFormInput.push(element.student);
                  });
                }

                const groupProfessorsFormInput: IUser[] = [];
                if (group.professors) {
                  group.professors.forEach((element: any) => {
                    groupProfessorsFormInput.push(element.professor);
                  });
                }

                const groupFormInput: ISubjectGroupsFormInput = {
                  professors: groupProfessorsFormInput,
                  pointsPerPresence: group.pointsPerPresence,
                  students: {
                    checked: [],
                    left: [],
                    leftChecked: [],
                    right: groupStudentsFormInput,
                    rightChecked: [],
                  },
                };

                newSubjectGroups.push(groupFormInput);
              });
            }

            id = res.data.id;
            subjectName = res.data.name;

            setSubjectLoaded(true);
          } else {
            setAlertType("error");
            setAlertMessage(AlertFailureMessage);
            setOpenAlert(true);
          }
        });
      } else {
        setSubjectLoaded(true);
      }

      await getAllExceptAdmin().then((res) => {
        if (res && res.status === HttpStatusCode.Ok && res.data) {
          professors = res.data.professors;
          students = res.data.students;

          newSubjectGroups.forEach((element) => {
            element.students.left =
              element.students.right && element.students.right.length > 0
                ? not(students, element.students.right)
                : students;
          });

          setDataLoaded(true);
        } else {
          setAlertType("error");
          setAlertMessage(AlertFailureMessage);
          setOpenAlert(true);
        }
      });

      setSubject({
        id: id,
        subjectName: subjectName,
        subjectGroups: newSubjectGroups,
      });

      setProfessors(professors);
      setStudents(students);
    };

    fetchData();
  }, []);

  const addGroup = (event: any) => {
    event.preventDefault();
    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: [
        ...subject.subjectGroups,
        {
          professors: [],
          pointsPerPresence: 0,
          students: {
            checked: [],
            left: students,
            leftChecked: [],
            right: [],
            rightChecked: [],
          },
        },
      ],
    });
  };

  const removeGroup = (index: number) => {
    subject.subjectGroups.splice(index, 1);

    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: subject.subjectGroups,
    });
  };

  const handleSubjectNameChange = (event: any) => {
    setSubject({
      id: subject.id,
      subjectName: event.target.value,
      subjectGroups: subject.subjectGroups,
    });
  };

  const handleSubjectGroupChange = (event: any) => {
    let index = -1;
    if (event.target.id !== undefined) {
      index = parseInt(event.target.id);
    } else {
      const inputParams = event.target.name.split("#");
      index = inputParams[0];
      event.target.name = inputParams[1];
    }

    if (
      index != -1 &&
      ["professors", "pointsPerPresence"].includes(event.target.name)
    ) {
      const newSubjectGroups = [...subject.subjectGroups];

      switch (event.target.name) {
        case "professors":
          newSubjectGroups[index]["professors"] = event.target.value;
          break;
        case "pointsPerPresence":
          newSubjectGroups[index]["pointsPerPresence"] = event.target.value;
          break;
        default:
          break;
      }

      setSubject({
        id: subject.id,
        subjectName: subject.subjectName,
        subjectGroups: newSubjectGroups,
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const preparedSubjectGroups: ISubjectGroup[] = [];
    subject.subjectGroups.forEach((element, index) => {
      const preparedProfessors: IProfessorsGroups[] = [];

      [
        ...new Map(element.professors.map((item) => [item.id, item])).values(),
      ].forEach((p) => {
        preparedProfessors.push({
          professor: p,
        });
      });

      const preparedStudents: IStudentsGroups[] = [];
      element.students.right.forEach((s) => {
        preparedStudents.push({
          sumOfPresencePoints: 0,
          student: s,
        });
      });

      preparedSubjectGroups.push({
        groupNo: index + 1,
        pointsPerPresence: Math.abs(element.pointsPerPresence),
        professors: preparedProfessors,
        students: preparedStudents,
      });
    });

    const modelToPost: ISubject = {
      id: subject.id,
      name: subject.subjectName,
      subjectGroups: preparedSubjectGroups,
    };

    const res: any = await createOrUpdateSubject(modelToPost);
    if (
      res &&
      res.status &&
      res.status === HttpStatusCode.Created &&
      res.data &&
      res.data.id
    ) {
      // setAlertType("success");
      // setAlertMessage(AlertSuccessfullMessage);
      // setOpenAlert(true);

      setConfirmationDialogOpen(true);
    } else {
      setAlertType("error");
      setAlertMessage(AlertFailureMessage);
      setOpenAlert(true);
    }
  };

  const cleanChecked = (
    newSubjectGroups: ISubjectGroupsFormInput[],
    index: number,
    checked: IUser[]
  ) => {
    const newLeftChecked = intersection(
      checked,
      subject.subjectGroups[index].students.left
    );
    const newRightChecked = intersection(
      checked,
      subject.subjectGroups[index].students.right
    );

    newSubjectGroups[index].students.checked = checked;
    newSubjectGroups[index].students.leftChecked = newLeftChecked;
    newSubjectGroups[index].students.rightChecked = newRightChecked;
  };

  const handleChecked = (index: number, value: IUser) => {
    const newSubjectGroups = [...subject.subjectGroups];

    const currentIndex =
      subject.subjectGroups[index].students.checked.indexOf(value);
    const newChecked = [...subject.subjectGroups[index].students.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    cleanChecked(newSubjectGroups, index, newChecked);

    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: newSubjectGroups,
    });
  };

  const handleCheckedRight = (index: number) => {
    const newSubjectGroups = [...subject.subjectGroups];

    newSubjectGroups[index].students.right = newSubjectGroups[
      index
    ].students.right.concat(newSubjectGroups[index].students.leftChecked);
    newSubjectGroups[index].students.left = not(
      newSubjectGroups[index].students.left,
      newSubjectGroups[index].students.leftChecked
    );
    newSubjectGroups[index].students.checked = not(
      newSubjectGroups[index].students.checked,
      newSubjectGroups[index].students.leftChecked
    );

    cleanChecked(
      newSubjectGroups,
      index,
      newSubjectGroups[index].students.checked
    );

    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: newSubjectGroups,
    });
  };

  const handleCheckedLeft = (index: number) => {
    const newSubjectGroups = [...subject.subjectGroups];

    newSubjectGroups[index].students.left = newSubjectGroups[
      index
    ].students.left.concat(newSubjectGroups[index].students.rightChecked);
    newSubjectGroups[index].students.right = not(
      newSubjectGroups[index].students.right,
      newSubjectGroups[index].students.rightChecked
    );
    newSubjectGroups[index].students.checked = not(
      newSubjectGroups[index].students.checked,
      newSubjectGroups[index].students.rightChecked
    );

    cleanChecked(
      newSubjectGroups,
      index,
      newSubjectGroups[index].students.checked
    );

    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: newSubjectGroups,
    });
  };

  const customList = (index: number, items: readonly IUser[]) => (
    <Paper sx={{ width: 278, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: IUser) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <Box>
              <ListItem
                key={value.id}
                role="listitem"
                button
                onClick={() => {
                  handleChecked(index, value);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      subject.subjectGroups[index].students.checked.indexOf(
                        value
                      ) !== -1
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${value.index}/${value.year} ${value.firstname} ${value.lastname}`}
                />
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Paper>
  );

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const removeSelectedProfessor = (event: any, index: any, value: any) => {
    const newSubjectGroups = [...subject.subjectGroups];
    newSubjectGroups[index]["professors"].forEach((item, itemIdx) => {
      if (item.id === value.id) {
        newSubjectGroups[index]["professors"].splice(itemIdx, 1);
      }
    });

    setSubject({
      id: subject.id,
      subjectName: subject.subjectName,
      subjectGroups: newSubjectGroups,
    });
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleConfirmationDialogClose = async (value?: any) => {
    setConfirmationDialogOpen(false);
    navigate(-1);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">{Subject}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ minWidth: 340 }}>
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <FormControl fullWidth>
                  <FormGroup sx={{ mt: 2 }}>
                    <FormLabel>
                      {
                        // @ts-ignore
                        <TextFieldsIcon fontSize="xs" sx={{ mr: 0.5 }} />
                      }
                      {SubjectName}
                    </FormLabel>
                    <Stack>
                      <TextField
                        label={PleaseEnterSubjectName}
                        value={subject.subjectName}
                        onChange={handleSubjectNameChange}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 0.8 }}
                      ></TextField>
                    </Stack>
                  </FormGroup>
                  <FormGroup>
                    <Stack>
                      <Box sx={{ mt: 1, textAlign: "right" }}>
                        {/* <Button
                          onClick={handleCancelClick}
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{ maxWidth: "xs", mr: 1 }}
                        >
                          {Cancel}
                        </Button> */}
                        <Button
                          onClick={addGroup}
                          variant="contained"
                          size="small"
                          color="info"
                          sx={{ maxWidth: "xs", mr: 1 }}
                        >
                          {
                            // @ts-ignore
                            <AddIcon fontSize="xs" sx={{ mr: 0.5 }} />
                          }
                          {AddGroup}
                        </Button>
                        {subject.id > 0 ? (
                          <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            color="success"
                            sx={{ maxWidth: "xs", mr: 0.5 }}
                          >
                            {
                              // @ts-ignore
                              <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                            }
                            {UpdateSubject}
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            color="success"
                            sx={{ maxWidth: "xs", mr: 0.5 }}
                          >
                            {
                              // @ts-ignore
                              <CheckIcon fontSize="xs" sx={{ mr: 0.5 }} />
                            }
                            {CreateSubject}
                          </Button>
                        )}
                      </Box>
                    </Stack>
                  </FormGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7} sx={{ minWidth: 700 }}>
            <Stack>
              {subject.subjectGroups.map((subjectGroup, index) => {
                return (
                  <Card key={index} sx={{ mt: 1 }}>
                    <CardContent>
                      <Stack direction="row">
                        <Typography variant="h6">
                          {Group} {convertToRoman(index + 1)}
                        </Typography>
                      </Stack>
                      <Divider />
                      <FormControl fullWidth>
                        <Stack direction="row">
                          <FormGroup sx={{ mt: 2, mr: 2, minWidth: 440 }}>
                            <FormLabel>
                              {
                                // @ts-ignore
                                <SchoolIcon fontSize="xs" sx={{ mr: 0.5 }} />
                              }
                              {Professors}
                            </FormLabel>
                            <Select
                              id={index.toString()}
                              name={index.toString() + "#" + "professors"}
                              size="small"
                              multiple
                              value={subject.subjectGroups[index].professors}
                              onChange={handleSubjectGroupChange}
                              input={<OutlinedInput label="Chip" />}
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip
                                      id={value.id.toString()}
                                      key={value.id}
                                      label={
                                        value.firstname + " " + value.lastname
                                      }
                                      clickable
                                      deleteIcon={
                                        <CancelIcon
                                          onMouseDown={(event: any) =>
                                            event.stopPropagation()
                                          }
                                        />
                                      }
                                      onDelete={(e) =>
                                        removeSelectedProfessor(e, index, value)
                                      }
                                    />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                              sx={{ mt: 0.8 }}
                            >
                              {dataLoaded ? (
                                professors.map((professor) => (
                                  <MenuItem
                                    key={professor.id}
                                    value={professor}
                                  >
                                    {professor.firstname} {professor.lastname}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem disabled={true}>
                                  {NoProfessorsFound}
                                </MenuItem>
                              )}
                            </Select>
                          </FormGroup>
                          <FormGroup sx={{ mt: 2, minWidth: 10 }}>
                            <FormLabel>
                              {
                                // @ts-ignore
                                <GradeIcon fontSize="xs" sx={{ mr: 0.5 }} />
                              }
                              {PointsPerPresence}
                            </FormLabel>
                            <TextField
                              id={index.toString()}
                              label={PleaseEnterPointsPerPresence}
                              name="pointsPerPresence"
                              value={subjectGroup.pointsPerPresence}
                              onChange={handleSubjectGroupChange}
                              size="small"
                              variant="outlined"
                              type="number"
                              sx={{ mt: 0.8 }}
                            ></TextField>
                          </FormGroup>
                        </Stack>
                        <FormGroup sx={{ mt: 2 }}>
                          <FormLabel sx={{ mb: 1 }}>
                            {
                              // @ts-ignore
                              <PeopleAltIcon fontSize="xs" sx={{ mr: 0.5 }} />
                            }
                            {SelectStudents}
                          </FormLabel>
                          <Stack direction="row">
                            {dataLoaded ? (
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Grid item>
                                  {customList(
                                    index,
                                    subject.subjectGroups[index].students.left
                                  )}
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                  >
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        handleCheckedRight(index);
                                      }}
                                      disabled={
                                        subject.subjectGroups[index].students
                                          .leftChecked.length === 0
                                      }
                                      aria-label="move selected right"
                                    >
                                      &gt;
                                    </Button>
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        handleCheckedLeft(index);
                                      }}
                                      disabled={
                                        subject.subjectGroups[index].students
                                          .rightChecked.length === 0
                                      }
                                      aria-label="move selected left"
                                    >
                                      &lt;
                                    </Button>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  {customList(
                                    index,
                                    subject.subjectGroups[index].students.right
                                  )}
                                </Grid>
                              </Grid>
                            ) : (
                              <Typography>{NoStudentsFound}</Typography>
                            )}
                          </Stack>
                          <Box sx={{ mt: 1, textAlign: "right" }}>
                            <Button
                              onClick={() => removeGroup(index)}
                              variant="contained"
                              size="small"
                              color="warning"
                              sx={{ maxWidth: "xs" }}
                            >
                              {
                                // @ts-ignore
                                <CloseIcon fontSize="xs" sx={{ mr: 0.5 }} />
                              }
                              {RemoveGroup}
                            </Button>
                          </Box>
                        </FormGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </form>
      <ConfirmationDialog
        id="confirmation-subject-menu"
        keepMounted
        open={confirmationDialogOpen}
        title={AlertSuccessfullMessage}
        positiveAction={Ok}
        value={-1}
        onClose={handleConfirmationDialogClose}
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
    </Container>
  );
};

export default Content;
