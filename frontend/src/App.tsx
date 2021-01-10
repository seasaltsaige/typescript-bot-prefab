//@ts-nocheck
import React from 'react';
import './App.css';
import { NavBar } from "./components";
import { Switch, Route } from "react-router-dom";
import { Dashboard, HomePage } from './pages';

function App() {
  return (
    <div className="mainDiv">
      <NavBar />
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/dashboard" exact={false} component={Dashboard} />
        <Route path="/dashboard/:id" exact={true} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;