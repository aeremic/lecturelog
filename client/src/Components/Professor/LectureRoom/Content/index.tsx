import { Container, Grid, Typography } from "@mui/material";
import ProfessorCodeGeneration from "./ProfessorCodeGeneration";
import PresentStudents from "./PresentStudents";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useEffect } from "react";
import {
  connect,
  joinActiveSession,
} from "../../../../services/MessagingService";
import { useTranslation } from "react-i18next";
import useQueryIdParameter from "../../../../hooks/UseQueryIdParameter";
import { ISessionMetadata } from "../../../../models/ISessionMetadata";

const Content = () => {
  const { t } = useTranslation();

  const subjectId = useQueryIdParameter();

  useEffect(() => {
    const sessionData: ISessionMetadata = {
      subjectId: subjectId,
    };

    connect();
    joinActiveSession(sessionData);
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">
        <LiveTvIcon fontSize="small" sx={{ mr: 0.5 }} />
        {t("LiveLecture")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <ProfessorCodeGeneration />
        </Grid>
        <Grid item xs={6} sx={{ minWidth: 350 }}>
          <PresentStudents />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
