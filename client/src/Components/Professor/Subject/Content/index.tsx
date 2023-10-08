import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  PleaseEnterSubjectName,
  Subject,
  SubjectName,
} from "../../../../resources/Typography";
import { ISubjectFormInput } from "../../../../modelHelpers/SubjectFormInput";
import { ChangeEvent, FormEvent, useState } from "react";

const subjectInitialState = {
  id: 0,
  subjectName: "",
  subjectGroups: [],
};

export const Content = () => {
  const [subject, setSubject] =
    useState<ISubjectFormInput>(subjectInitialState);

  function handleSubjectNameChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    throw new Error("Function not implemented.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

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
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
