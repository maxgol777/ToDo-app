import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TodoDetailPage } from "../pages/TodoDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "todos/:id", Component: TodoDetailPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
