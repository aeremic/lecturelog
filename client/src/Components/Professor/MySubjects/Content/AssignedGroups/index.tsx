import {
  Card,
  CardContent,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IGroup } from "../../../../../ModelHelpers/Group";

const AssignedGroups = (groups: IGroup[]) => {
  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 290 }} size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                  },
                }}
              >
                <TableCell>
                  <FormatListNumberedIcon
                    fontSize="xs"
                    sx={{ mt: 1, ml: 0.5 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextFieldsIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                  {Name}
                </TableCell>
                <TableCell align="center">
                  <EditIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                  {Action}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleSubjectClick(subject.id)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{subject.id}</TableCell>
                  <TableCell align="center">{subject.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDialogClick(subject.id);
                      }}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AssignedGroups;
