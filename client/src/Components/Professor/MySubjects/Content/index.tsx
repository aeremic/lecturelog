import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { MySubjects } from "../../../../resources/Typography";
import { useState } from "react";
import AssignedGroups from "./AssignedGroups";
import { IGroup } from "../../../../ModelHelpers/Group";

export const Content = () => {
  const [groups, setGroups] = useState([]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">{MySubjects}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 400 }}>
          <AssignedGroups groups={{ groups }} />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 400 }}>
          <Card sx={{ mt: 1 }}>
            <CardContent>active</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
