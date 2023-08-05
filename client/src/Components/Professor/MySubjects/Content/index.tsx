import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { MySubjects } from "../../../../resources/Typography";
import { useState } from "react";
import AssignedGroups from "./AssignedGroups";
import { IGroup } from "../../../../ModelHelpers/Group";

export const Content = () => {
  const [groups, setGroups] = useState<IGroup[]>([
    { id: 1, name: "Klijentske Web Tehnologije", groupNo: 1 },
    { id: 1, name: "Klijentske Web Tehnologije", groupNo: 2 },
    { id: 1, name: "Strukture podataka i algoritmi 1", groupNo: 1 },
  ]);
  const temp = true;
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">{MySubjects}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 340 }}>
          <AssignedGroups groupsProp={groups} tempProp={temp} />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 340 }}>
          <Card sx={{ mt: 1 }}>
            <CardContent>active</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
