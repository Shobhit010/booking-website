import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import axios from "axios";

export default function Layout() {
    return(
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}