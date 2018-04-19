import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";
import WishVacation from "./components/WishVacation";
import MyVacations from "./components/MyVacations";
import Admin from "./components/Admin";
import AdminManage from "./components/AdminManage";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute exact path="/"  component={Login} props={childProps} />
    <AppliedRoute exact path="/login" component={Login} props={childProps} />
    <AppliedRoute exact path="/wishvacation" component={WishVacation} props={childProps} />
    <AppliedRoute exact path="/myvacations" component={MyVacations} props={childProps} />
    <AppliedRoute exact path="/admin" component={Admin} props={childProps} />
    <AppliedRoute exact path="/adminmanage" component={AdminManage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
