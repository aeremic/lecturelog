import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { MySubjects } from "../../../../resources/Typography";
import { useEffect, useState } from "react";
import AssignedGroups from "./AssignedGroups";
import { IGroup } from "../../../../modelHelpers/Group";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { getAssignedGroups } from "../../../../services/ProfessorsService";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { connect, onCreateLecture } from "../../../../services/Messaging";

export const Content = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [groups, setGroups] = useState<IGroup[]>([]);

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

  const handleStartSession = (groupId: number) => {
    connect();
    onCreateLecture(groupId);

    navigate(`/professor/room?userId=${userId}&groupId=${groupId}`);
  };

  const handleSubjectClick = (subjectId: number) => {
    console.log(subjectId);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">
        <LibraryBooksIcon fontSize="small" sx={{ mr: 0.5 }} />
        {MySubjects}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <AssignedGroups
            groupsProp={groups}
            handleStartSession={handleStartSession}
            handleSubjectClick={handleSubjectClick}
          />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <Card sx={{ mt: 1 }}>
            <CardContent>active</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
