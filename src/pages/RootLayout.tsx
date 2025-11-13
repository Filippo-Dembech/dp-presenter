import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

export default function RootLayout() {

    return (
        <div className="min-h-dvh">
            <Navbar />
            <main className="p-5">
                <Outlet />
            </main>
        </div>
    );
}
