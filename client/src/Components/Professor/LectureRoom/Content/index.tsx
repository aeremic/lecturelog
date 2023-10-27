import { Container, Grid, Typography } from "@mui/material";
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
import CodeGeneration from "./CodeGeneration";
import useCurrentUserIdentifier from "../../../../hooks/UseCurrentUserIdentifier";
import useCurrentUserRole from "../../../../hooks/UseCurrentUserRole";
import { RoleEnum } from "../../../../models/Enums";

const Content = () => {
  const { t } = useTranslation();

  const userId = useCurrentUserIdentifier();
  const userRole = useCurrentUserRole();
  const subjectId = useQueryIdParameter();

  useEffect(() => {
    if (userRole == RoleEnum.Professor) {
      const sessionData: ISessionMetadata = {
        userId: userId,
        subjectId: subjectId,
      };

      connect();
      joinActiveSession(sessionData);
    }
  });

  return (
    <Container sx={{ mt: 4 }}>
      {userRole == RoleEnum.Professor ? (
        <>
          <Typography variant="h5">
            <LiveTvIcon fontSize="small" sx={{ mr: 0.5 }} />
            {t("LiveLecture")}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ minWidth: 350 }}>
              <CodeGeneration />
            </Grid>
            <Grid item xs={6} sx={{ minWidth: 350 }}>
              <PresentStudents />
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Content;
