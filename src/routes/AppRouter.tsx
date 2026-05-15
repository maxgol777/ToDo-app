import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [{ index: true, Component: HomePage }],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
