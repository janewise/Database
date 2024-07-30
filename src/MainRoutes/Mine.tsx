import React from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import { Freemine } from "../SecRoutes/freeMine";
import { Refmine } from "../SecRoutes/refMine";
import "./SecNavcss/Minenav.css";

export function Mine() {
  return (
    <>
      <div className="overlay">
        <div className="container-fluid">
          <nav className="mine_nav">
            <ul>
              <li>
                <NavLink 
                  to="/mine/freemine" 
                  className={({ isActive }) => isActive ? "minelink active" : "minelink"}
                >
                  Free
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/mine/refmine" 
                  className={({ isActive }) => isActive ? "minelink active" : "minelink"}
                >
                  Ref
                </NavLink>
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
