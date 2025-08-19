import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./UserLayout.css";

function UserLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="main-body">
        <Sidebar className='main-sidebar'/>
        <main className="main-content">
          <Outlet />   
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
