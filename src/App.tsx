import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import PatternPage from "./pages/PatternPage";
import PatternExamplePage from "./pages/PatternExamplePage";

const router = createHashRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: ":category/:pattern",
                element: <PatternPage />,
            },
            {
                path: ":category/:pattern/:exampleName",
                element: <PatternExamplePage />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
