import { Container, Grid, Typography } from "@mui/material";
import { MySubjects } from "../../../../resources/Typography";
import { useEffect, useState } from "react";
import AssignedGroups from "./AssignedGroups";
import { IGroup } from "../../../../modelHelpers/Group";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import {
  getActiveAssignedGroups,
  getAssignedGroups,
} from "../../../../services/ProfessorsService";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  connect,
  onStartSession,
  onStopSession,
  socket,
} from "../../../../services/Messaging";
import ActiveGroups from "./ActiveGroups";
import { ISessionData } from "../../../../modelHelpers/SessionData";

export const Content = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [assignedGroups, setAssignedGroups] = useState<IGroup[]>([]);
  const [activeGroups, setActiveGroups] = useState<IGroup[]>([]);

  const [groupsLoaded, setGroupsLoaded] = useState<boolean>(false);

  const [lecturesChangeEvents, setLecturesChangeEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId != -1) {
        await getAssignedGroups(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setAssignedGroups(res.data);
          }
        });

        await getActiveAssignedGroups(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setActiveGroups(res.data);
          }
        });

        setGroupsLoaded(true);
      }
    };

    fetchData();
  }, [userId, groupsLoaded, lecturesChangeEvents]);

  useEffect(() => {
    function onLecturesChange(value: any) {
      setLecturesChangeEvents(lecturesChangeEvents.concat(value));
    }

    socket.on("lecturesChange", onLecturesChange);

    return () => {
      socket.off("lecturesChange", onLecturesChange);
    };
  }, [lecturesChangeEvents]);

  const handleStartSession = (groupId: number) => {
    const sessionData: ISessionData = {
      userId: userId,
      groupId: groupId,
    };

    onStartSession(JSON.stringify(sessionData));
    navigate(`/professor/room?userId=${userId}&groupId=${groupId}`);
  };

  const handleStopSession = (groupId: number) => {
    const sessionData: ISessionData = {
      userId: userId,
      groupId: groupId,
    };

    onStopSession(JSON.stringify(sessionData));
    setGroupsLoaded(false);
  };

  const handleSubjectClick = (subjectId: number) => {
    console.log(subjectId);
  };

  const handleSessionClick = (group: IGroup) => {
    if (group.userId === userId) {
      navigate(`/professor/room?userId=${userId}&groupId=${group.groupId}`);
    }
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
            groupsProp={assignedGroups}
            handleStartSession={handleStartSession}
            handleSubjectClick={handleSubjectClick}
          />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <ActiveGroups
            userId={userId}
            groupsProp={activeGroups}
            handleStopSession={handleStopSession}
            handleSessionClick={handleSessionClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
