import { NavLink } from "react-router";
import "../../styles/header.css";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `app-nav-link${isActive ? " app-nav-link-active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `app-nav-link${isActive ? " app-nav-link-active" : ""}`}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
