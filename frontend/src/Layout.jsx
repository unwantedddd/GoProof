import React from "react";
import { Outlet } from "react-router";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;