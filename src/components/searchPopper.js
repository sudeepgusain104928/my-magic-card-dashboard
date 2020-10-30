import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchList from "./searchList";
import { useSelector } from "react-redux";
import { store } from "../redux/reducer";
import { setSearchPopup } from "../redux/searchBoxReducers/searchPopperReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 0,
    right: 10,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "inherit",
    width: "30vmax",
    minWidth: "30vw",
    zIndex: 1,
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ClickAway() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const reducerData = useSelector(({ searchPopup }) => searchPopup);

  useEffect(() => {
    if (reducerData === true) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [reducerData]);

  const handleClickAway = () => {
    setOpen(false);
    store.dispatch(setSearchPopup(false));
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        {open ? (
          <div className={classes.dropdown}>
            <SearchList className={classes.list}></SearchList>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
