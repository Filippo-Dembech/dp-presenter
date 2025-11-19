import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { ScrollToTop } from "../ui/ScrollToTop";

export default function RootLayout() {

    return (
        <div className="min-h-dvh">
            <ScrollToTop />
            <Navbar />
            <main className="p-5">
                <Outlet />
            </main>
        </div>
    );
}
