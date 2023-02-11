import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

export default function DetailsComp() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <ProjectDetails />
    </Switch>
  );
}
