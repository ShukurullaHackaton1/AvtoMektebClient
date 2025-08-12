import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {/* React Router 6 da Outlet ishlatish kerak, children emas */}
        <Outlet />
        {/* Agar children prop orqali kelgan bo'lsa, uni ham render qilish */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
