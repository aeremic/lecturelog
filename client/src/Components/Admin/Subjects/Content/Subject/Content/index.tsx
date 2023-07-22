import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Add,
  AddGroup,
  CreateSubject,
  Group,
  PleaseEnterPointsPerPresence,
  PleaseEnterSubjectName,
  PointsPerPresence,
  Professors,
  RemoveGroup,
  SelectStudents,
  Subject,
  SubjectName,
} from "../../../../../../resources/Typography";
import { useState } from "react";
import { HttpStatusCode } from "axios";
import { ISubject } from "../../../../../../Models/Subject";
import { ISubjectGroup } from "../../../../../../Models/SubjectGroup";
import { Id } from "../../../../../../resources/Typography/index";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Content = () => {
  const [subject, setSubject] = useState({
    subjectName: "",
    subjectGroups: [{ professors: [], pointsPerPresence: 0, students: [] }],
  });

  const addGroup = (event: any) => {
    event.preventDefault();
    setSubject({
      subjectName: subject.subjectName,
      subjectGroups: [
        ...subject.subjectGroups,
        { professors: [], pointsPerPresence: 0, students: [] },
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
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                              sx={{ mt: 0.8 }}
                            >
                              {names.map((name) => (
                                <MenuItem
                                  id={index.toString()}
                                  key={name}
                                  value={name}
                                >
                                  {name}
                                </MenuItem>
                              ))}
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
                          <FormLabel>{SelectStudents}</FormLabel>
                          <Stack direction="row">
                            <FormGroup>
                              {/* <Select
                              multiple
                              native
                              value={personName}
                              inputProps={{
                                id: "select-multiple-native",
                              }}
                              sx={{ minWidth: 280 }}
                            >
                              {names.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </Select> */}
                            </FormGroup>
                            <Stack sx={{ m: "auto" }}>
                              <FormGroup>
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{ maxHeight: 30 }}
                                >
                                  <KeyboardDoubleArrowRightIcon />
                                </Button>
                              </FormGroup>
                              <Divider sx={{ m: 1 }} />
                              <FormGroup>
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{ maxHeight: 30 }}
                                >
                                  <KeyboardDoubleArrowLeftIcon />
                                </Button>
                              </FormGroup>
                            </Stack>
                            <FormGroup>
                              {/* <Select
                              multiple
                              native
                              value={personName}
                              inputProps={{
                                id: "select-multiple-native",
                              }}
                              sx={{ minWidth: 280 }}
                            >
                              {names.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </Select> */}
                            </FormGroup>
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
