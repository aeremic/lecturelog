import { Container, Typography } from "@mui/material";
import { ManipulateSubject } from "./ManipulateSubject";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

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
      <ManipulateSubject userIdProp={userId} subjectIdProp={subjectId} />
    </Container>
  );
};
