
import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "./App.css"

import {Mine} from "./MainRoutes/Mine";
import {Coin} from "./MainRoutes/Coin";
import { Nav } from "./MainRoutes/Nav";
import {Friend} from "./MainRoutes/Friend";
import { Tasksec } from "./MainRoutes/Tasksec";

export function App() {


  return (
    <>
     <Router>
      <Nav />
        <Routes>
          <Route path="/" element={<Coin />}/>
          <Route path="/mine/*" element={<Mine />}/>
          <Route path="/friend" element={<Friend />}/>
          <Route path="/tasksec" element={<Tasksec />}/>
        </Routes>
     </Router>
    </>
  )
}

