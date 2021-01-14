//@ts-nocheck
import React from 'react';
import './App.css';
import { NavBar } from "./components";
import { Switch, Route } from "react-router-dom";
import { Menu, HomePage, Dashboard, Configuration } from './pages';

function App() {

  return (
    <div className="mainDiv">
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" exact component={Menu} />
        <Route path="/dashboard/:id/:category" exact component={Configuration} />
        <Route path="/dashboard/:id" exact component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;