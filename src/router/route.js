import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/home";
import Navbar from "../components/navBar";
import CardPage from "../components/cardPage/cardPage";
import SearchPopper from "../components/searchPopper";
function RouteConfig() {
  return (
    <div>
      <Router>
        <Navbar />
        <SearchPopper></SearchPopper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={CardPage} />
          <Route path="*" component={() => <h2>404 Not Found</h2>} />
        </Switch>
      </Router>
    </div>
  );
}

export default RouteConfig;
