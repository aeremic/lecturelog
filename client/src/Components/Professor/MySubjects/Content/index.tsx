import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { MySubjects } from "../../../../resources/Typography";
import { useEffect, useState } from "react";
import AssignedGroups from "./AssignedGroups";
import { IGroup } from "../../../../modelHelpers/Group";
import { useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { getAssignedGroups } from "../../../../services/ProfessorsService";

export const Content = () => {
  const [queryParameters] = useSearchParams();
  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [groups, setGroups] = useState<IGroup[]>([]);
  const temp = true;

  useEffect(() => {
    const fetchData = async () => {
      if (userId != -1) {
        await getAssignedGroups(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setGroups(res.data);
          }
        });
      }
    };

    fetchData();
  }, []);

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
