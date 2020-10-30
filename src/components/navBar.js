import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { store } from "../redux/reducer";
import { setDrawer } from "../redux/drawerReducer";
import { setSearchName } from "../redux/filtersReducer";
import { setSearchString } from "../redux/searchBoxReducers/searchStringReducers";
import { setSearchPopup } from "../redux/searchBoxReducers/searchPopperReducer";
import { useSelector } from "react-redux";
import TranslateIcon from "@material-ui/icons/Translate";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Menu from "@material-ui/core/Menu";
import languageContext from "../context/languageContext";
import themeContext from "../context/themeContext";
import { Link } from "react-router-dom";

var config = require("../configFiles/config.js");
var text = require("../configFiles/navBarTranslation.js");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  appBar: {
    position: "relative",
    width: "100%",
    zIndex: "1400",
  },
  langButtons: {
    width: "100%",
    fontSize: "1.5rem",
    margin: "0.5vmax auto",
    backgroundColor: "inherit",
    borderStyle: "none",
    "&:hover": {
      color: "lightGray",
      borderStyle: "none",
    },

    "&:focus": {
      color: "lightGray",
      borderStyle: "none",
      outline: "none",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexGrow: 1,
  },
  buttonsInnerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonTranslate: {
    width: "3.5rem",
    height: "2rem",
  },
  buttonTheme: {
    width: "3.5rem",
    height: "2rem",
  },
  title: {
    flexGrow: 0.05,
    display: "none",
    fontSize: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexgrow: 1,
    marginLeft: 0,
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  languageMenu: {
    marginTop: "3.3rem",
    width: "30vmax",
  },
  inputRoot: {
    color: "inherit",
  },
  searchInput: {
    width: "30vw",
    maxWidth: "100%",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20vw",
      "&:focus": {
        width: "20vw",
      },
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const reducerData = useSelector(({ drawer, searchPopup, searchString }) => {
    return { drawer, searchPopup, searchString };
  });

  const [anchorLanguageMenu, setAnchorLanguageMenu] = useState(null);
  const { language, setLanguage } = React.useContext(languageContext);
  const { theme, setTheme } = React.useContext(themeContext);

  const handleClickLanguageButton = (event) => {
    setAnchorLanguageMenu(event.currentTarget);
  };

  const handleCloseLanguageButton = () => {
    setAnchorLanguageMenu(null);
  };

  const handleClickLangSelector = (e) => {
    setAnchorLanguageMenu(null);
    //store.dispatch(setLanguage("chinese"))

    setLanguage(e.target.value.toLowerCase());
  };

  const handleDrawerToggle = () => {
    store.dispatch(setDrawer(!reducerData.drawer));
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.link} to="/">
              {config.siteMetadata.title}
            </Link>
          </Typography>
          <div className={classes.buttonsContainer}>
            <div className={classes.buttonsInnerContainer}>
              <TranslateIcon
                className={classes.buttonTranslate}
                aria-haspopup="true"
                onClick={handleClickLanguageButton}
              />
              <InvertColorsIcon
                className={classes.buttonTheme}
                onClick={() => {
                  theme === "light" ? setTheme("dark") : setTheme("light");
                }}
              />
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <div>
                <InputBase
                  className={classes.searchInput}
                  fullWidth
                  placeholder={`${text.search[language]}`}
                  value={reducerData.searchString}
                  onChange={(e) => {
                    store.dispatch(setSearchString(e.target.value));
                    store.dispatch(setSearchPopup(true));
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      store.dispatch(
                        setSearchName({ searchName: reducerData.searchString })
                      );
                    }
                  }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        className={classes.languageMenu}
        id="simple-menu"
        anchorEl={anchorLanguageMenu}
        keepMounted
        open={Boolean(anchorLanguageMenu)}
        onClose={handleCloseLanguageButton}
      >
        <button
          className={classes.langButtons}
          value="english"
          onClick={handleClickLangSelector}
        >
          {text.languageText["english"]}
        </button>
        <button
          className={classes.langButtons}
          value="french"
          onClick={handleClickLangSelector}
        >
          {text.languageText["french"]}
        </button>
        <button
          className={classes.langButtons}
          value="chinese simplified"
          onClick={handleClickLangSelector}
        >
          {text.languageText["chinese simplified"]}
        </button>
      </Menu>
    </div>
  );
}
