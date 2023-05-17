import { Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Menu from "../Menu";

const TemporaryDrawer = () => {
  const [state, setState] = React.useState({
    isOpen: false,
  });

  const toggleDrawer = (open: boolean) => {
    setState({ ...state, isOpen: open });
  };

  return (
    <>
      <React.Fragment>
        <Button
          onClick={() => {
            toggleDrawer(true);
          }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </Button>
        <Drawer
          anchor="left"
          open={state.isOpen}
          onClose={() => {
            toggleDrawer(false);
          }}
        >
          <Menu />
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default TemporaryDrawer;
