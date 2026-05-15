import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <small>&copy; {new Date().getFullYear()} ToDo App</small>
      </div>
    </footer>
  );
};
