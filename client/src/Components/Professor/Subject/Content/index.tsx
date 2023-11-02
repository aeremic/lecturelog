import { Container, Grid, Typography } from "@mui/material";
import { ManipulateSubject } from "./ManipulateSubject";
import { useTranslation } from "react-i18next";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import useCurrentUserIdentifier from "../../../../hooks/UseCurrentUserIdentifier";
import useQueryIdParameter from "../../../../hooks/UseQueryIdParameter";
import { AssignedStudents } from "./AssignedStudents";

export const Content = () => {
  const { t } = useTranslation();

  const userId = useCurrentUserIdentifier();
  const subjectId = useQueryIdParameter();

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
