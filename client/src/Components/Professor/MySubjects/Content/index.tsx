import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IAssignedSubject } from "../../../../modelHelpers/AssignedSubject";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  connect,
  dispose,
  joinActiveSessions,
  listening,
  onStartSession,
  onStopSession,
} from "../../../../services/MessagingService";
import { ISessionData } from "../../../../modelHelpers/SessionData";
import { MessagingEvent } from "../../../../modelHelpers/Enums";
import ActiveSubjects from "./ActiveSubjects";
import AssignedSubject from "./AssignedSubjects";
import {
  getActiveAssignedSubjects,
  getAssignedSubjects,
} from "../../../../services/HttpService/ProfessorsService";
import { useTranslation } from "react-i18next";

export const Content = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("id");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const [assignedSubjects, setAssignedSubjects] = useState<IAssignedSubject[]>(
    []
  );
  const [activeSubjects, setActiveSubjects] = useState<IAssignedSubject[]>([]);

  const [SubjectsLoaded, setSubjectsLoaded] = useState<boolean>(false);

  const [lecturesChangeEvents, setLecturesChangeEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId != -1) {
        await getAssignedSubjects(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setAssignedSubjects(res.data);
          }
        });

        await getActiveAssignedSubjects(userId).then((res: any) => {
          if (res && res.status === HttpStatusCode.Ok && res.data) {
            setActiveSubjects(res.data);
          }
        });

        setSubjectsLoaded(true);
      }
    };

    fetchData();
  }, [userId, SubjectsLoaded, lecturesChangeEvents]);

  useEffect(() => {
    connect();
    joinActiveSessions(activeSubjects);

    function onLecturesChange(value: any) {
      setLecturesChangeEvents(lecturesChangeEvents.concat(value));
    }
    listening(MessagingEvent.LecturesChange, onLecturesChange);

    return () => {
      dispose(MessagingEvent.LecturesChange, onLecturesChange);
    };
  }, [lecturesChangeEvents, activeSubjects]);

  const handleStartSession = (subjectId: number) => {
    const sessionData: ISessionData = {
      userId: userId,
      subjectId: subjectId,
    };

    onStartSession(sessionData);
    navigate(`/professor/room?userId=${userId}&subjectId=${subjectId}`);
  };

  const handleStopSession = (subjectId: number) => {
    const sessionData: ISessionData = {
      userId: userId,
      subjectId: subjectId,
    };

    onStopSession(sessionData);
    setSubjectsLoaded(false);
  };

  const handleSubjectClick = (subjectId: number) => {
    navigate(`/professor/subject?userId=${userId}&subjectId=${subjectId}`);
  };

  const handleAddSubjectDialogClick = () => {
    navigate(`/professor/subject?userId=${userId}`);
  };

  const handleSessionClick = (subject: IAssignedSubject) => {
    if (subject.userId === userId) {
      navigate(
        `/professor/room?userId=${userId}&subjectId=${subject.subjectId}`
      );
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">
        <LibraryBooksIcon fontSize="small" sx={{ mr: 0.5 }} />
        {t("MySubjects")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <AssignedSubject
            subjectsProp={assignedSubjects}
            handleStartSession={handleStartSession}
            handleSubjectClick={handleSubjectClick}
            handleAddSubjectDialogClick={handleAddSubjectDialogClick}
          />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <ActiveSubjects
            userId={userId}
            subjectsProp={activeSubjects}
            handleStopSession={handleStopSession}
            handleSessionClick={handleSessionClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
