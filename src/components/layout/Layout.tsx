import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "../../styles/layout.css";

export const Layout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
