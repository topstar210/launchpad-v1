import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MainLayout from "./layouts/main";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailsComp from "./pages/DetailsComp";
import AdminProjects from "./pages/admin/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer pauseOnFocusLoss={false} />
        <MainLayout>
          <Switch>
            <Route path="/project">
              <DetailsComp />
            </Route>
            <Route path="/admin">
              <AdminProjects />
            </Route>
            <Redirect
              from="/"
              to="/project/0x35Ce161FDD993d498cb3853A8e7162DE73D71c66"
            />
          </Switch>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
