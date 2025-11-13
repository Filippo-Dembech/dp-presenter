import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import PatternPage from "./pages/PatternPage";

const router = createBrowserRouter([
  { path: "/", element: <RootLayout />, children: [
    { index: true, element: <HomePage />},
          {
        path: ":category/:pattern",
        element: <PatternPage />,
      },
  ]}
])

export default function App() {
    return <RouterProvider router={router} />;
}
