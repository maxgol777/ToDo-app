import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavDirection } from "../../hooks/useNavDirection";
import "../../styles/layout.css";

export const Layout = () => {
  useNavDirection();

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
