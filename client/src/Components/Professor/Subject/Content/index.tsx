import { Container, Grid, Stack, Typography } from "@mui/material";
import { ManipulateSubject } from "./ManipulateSubject";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { AssignedStudents } from "./AssignedStudents/AssignedStudents";

export const Content = () => {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("userId");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const subjectIdParam: string | null = queryParameters.get("subjectId");
  const subjectId = subjectIdParam != null ? parseInt(subjectIdParam) : -1;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">
        <LibraryBooksIcon fontSize="small" sx={{ mr: 0.5 }} />
        {t("Subject")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4} sx={{ minWidth: 350 }}>
          <ManipulateSubject userIdProp={userId} subjectIdProp={subjectId} />
        </Grid>
        <Grid item xs={8} sx={{ minWidth: 350 }}>
          <AssignedStudents userIdProp={userId} subjectIdProp={subjectId} />
        </Grid>
      </Grid>
    </Container>
  );
};
