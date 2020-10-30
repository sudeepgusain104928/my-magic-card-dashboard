import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import languageContext from "./context/languageContext";
import themeContext from "./context/themeContext";
import "./App.css";
import RouteConfig from "./router/route";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");

  const muiTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      <themeContext.Provider value={{ theme, setTheme }}>
        <div>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <RouteConfig></RouteConfig>
          </ThemeProvider>
        </div>
      </themeContext.Provider>
    </languageContext.Provider>
  );
}

export default App;
