import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { store } from "../redux/reducer";
import { setDrawer } from "../redux/drawerReducer";
import Filters from "./filters";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      borderStyle: "solid",
      borderColor: "#bfbdbd",
      boxShadow: "2px 9px 20px grey",
    },
  },
  appBar: {
    position: "absolute",
    width: "100%",
    zIndex: "1400",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function FilterDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  const reducerData = useSelector(({ drawer }) => drawer);

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />
      <Filters></Filters>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={reducerData}
            onClose={() => {
              store.dispatch(setDrawer(!reducerData));
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
          <Toolbar />
        </Hidden>
      </nav>
    </div>
  );
}
