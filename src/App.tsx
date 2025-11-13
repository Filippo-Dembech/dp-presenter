import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  { path: "/", element: <RootLayout />, children: [
    { index: true, element: <HomePage />}
  ]}
])

export default function App() {
    return <RouterProvider router={router} />;
}
