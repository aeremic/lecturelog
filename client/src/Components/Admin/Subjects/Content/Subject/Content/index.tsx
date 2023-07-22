import {
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddGroup,
  AlertFailureMessage,
  CreateSubject,
  Group,
  NoProfessorsFound,
  NoStudentsFound,
  PleaseEnterPointsPerPresence,
  PleaseEnterSubjectName,
  PointsPerPresence,
  Professors,
  RemoveGroup,
  SelectStudents,
  Subject,
  SubjectName,
} from "../../../../../../resources/Typography";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { RoleEnum } from "../../../../../../Models/Enums";
import { IUser } from "../../../../../../Models/User";
import { getAllExceptAdmin } from "../../../../../../services/UsersService";

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
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly IUser[], b: readonly IUser[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface IStudentFormInput {
  checked: IUser[];
  left: IUser[];
  leftChecked: IUser[];
  right: IUser[];
  rightChecked: IUser[];
}

interface ISubjectGroupsFormInput {
  professors: IUser[];
  pointsPerPresence: number;
  students: IStudentFormInput;
}

interface ISubjectFormInput {
  subjectName: string;
  subjectGroups: ISubjectGroupsFormInput[];
}

const Content = () => {
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

  const [professors, setProfessors] = useState(userInitialState);
  const [students, setStudents] = useState(userInitialState);
  const [subject, setSubject] = useState<ISubjectFormInput>({
    subjectName: "",
    subjectGroups: [
      {
        professors: [],
        pointsPerPresence: 0,
        students: {
          checked: [],
          left: [],
          leftChecked: [],
          right: [],
          rightChecked: [],
        },
      },
    ],
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>();

  useEffect(() => {
    getAllExceptAdmin().then((res) => {
      if (res && res.status === HttpStatusCode.Ok && res.data) {
        setProfessors(res.data.professors ?? []);
        setStudents(res.data.students ?? []);

        const newSubjectGroups = [...subject.subjectGroups];
        newSubjectGroups.forEach((element) => {
          element.students.right = students;
        });

        setSubject({
          subjectName: subject.subjectName,
          subjectGroups: newSubjectGroups,
        });

        setDataLoaded(true);
      } else {
        setAlertType("error");
        setAlertMessage(AlertFailureMessage);
        setOpenAlert(true);
      }
    });
  }, [dataLoaded]);

  const addGroup = (event: any) => {
    event.preventDefault();
    setSubject({
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
      subjectName: subject.subjectName,
      subjectGroups: subject.subjectGroups,
    });
  };

  const handleSubjectNameChange = (event: any) => {
    setSubject({
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
        subjectName: subject.subjectName,
        subjectGroups: newSubjectGroups,
      });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log(subject);
  };

  // const res: any = await createOrUpdateSubject(subject);
  // if (
  //   res &&
  //   res.status &&
  //   res.status === HttpStatusCode.Created &&
  //   res.data &&
  //   res.data.id
  // ) {
  // } else {
  // }
  //};

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

    const newLeftChecked = intersection(
      newChecked,
      subject.subjectGroups[index].students.left
    );
    const newRightChecked = intersection(
      newChecked,
      subject.subjectGroups[index].students.right
    );

    newSubjectGroups[index].students.checked = newChecked;
    newSubjectGroups[index].students.leftChecked = newLeftChecked;
    newSubjectGroups[index].students.rightChecked = newRightChecked;

    setSubject({
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

    setSubject({
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

    setSubject({
      subjectName: subject.subjectName,
      subjectGroups: newSubjectGroups,
    });
  };

  const customList = (index: number, items: readonly IUser[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
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
                  console.log(index, value);
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
                  primary={`List item ${value.id + 1}`}
                />
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Container sx={{ mt: 1 }}>
      <Typography variant="h5">{Subject}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ minWidth: 340 }}>
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <FormControl fullWidth>
                  <FormGroup sx={{ mt: 2 }}>
                    <FormLabel>{SubjectName}</FormLabel>
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
                        <Button
                          onClick={addGroup}
                          variant="contained"
                          color="info"
                          sx={{ maxWidth: "xs", mr: 1 }}
                        >
                          {AddGroup}
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          sx={{ maxWidth: "xs" }}
                        >
                          {CreateSubject}
                        </Button>
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
                        <Typography variant="h6">{Group}</Typography>
                      </Stack>
                      <Divider />
                      <FormControl fullWidth>
                        <Stack direction="row">
                          <FormGroup sx={{ mt: 2, mr: 2, minWidth: 440 }}>
                            <FormLabel>{Professors}</FormLabel>
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
                                      key={value.id}
                                      label={
                                        value.firstname + " " + value.lastname
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
                                    value={professor.id}
                                  >
                                    {professor.firstname} {professor.lastname}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem key={-1} value={-1} disabled={true}>
                                  {NoProfessorsFound}
                                </MenuItem>
                              )}
                            </Select>
                          </FormGroup>
                          <FormGroup sx={{ mt: 2, minWidth: 10 }}>
                            <FormLabel>{PointsPerPresence}</FormLabel>
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
                          <FormLabel sx={{ mb: 1 }}>{SelectStudents}</FormLabel>
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
                              color="error"
                              sx={{ maxWidth: "xs" }}
                            >
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
    </Container>
  );
};

export default Content;
