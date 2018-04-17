import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";
import WishVacation from "./components/WishVacation";
import MyVacations from "./components/MyVacations";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/wishvacation" exact component={WishVacation} props={childProps} />
    <AppliedRoute path="/myvacations" exact component={MyVacations} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
