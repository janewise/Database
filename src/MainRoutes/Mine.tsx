import React, { useRef, useEffect, useReducer, useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Freemine } from "../SecRoutes/freeMine";
import { Refmine } from "../SecRoutes/refMine";
//
import "./SecNavcss/Minenav.css";

export function Mine() {

  return (
    <>
      <div className="overlay">
        <div className="container-fluid">

          <nav className="mine_nav">
            <ul>
              <li>
                <Link to="/mine/freemine" className="minelink">
                  Free
                </Link>
              </li>
              <li>
                <Link to="/mine/refmine" className="minelink">
                  Ref
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Navigate to="freemine" />} />
            <Route path="freemine" element={<Freemine />} />
            <Route path="refmine" element={<Refmine />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
