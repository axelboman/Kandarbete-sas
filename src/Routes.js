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
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/wishvacation" exact component={WishVacation} props={childProps} />
    <AppliedRoute path="/myvacations" exact component={MyVacations} props={childProps} />
    <AppliedRoute path="/admin" exact component={Admin} props={childProps} />
    <AppliedRoute path="/admin/adminmanage" component={AdminManage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
