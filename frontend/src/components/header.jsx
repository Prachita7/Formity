import logo from "../assets/logo.jpg";
import wcloud from "../assets/white_cloud.png";
import pcloud from "../assets/pink_cloud.png";
import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      {/* Left: Logo + Name */}
      <Link to="/" className="header-left">
        <img src={logo} alt="Formity logo" className="logo" />
        <span className="site-name">Formity</span>
      </Link>

      {/* Middle: Navigation */}
      <nav className="header-center">
        <Link to="/">Home</Link>
        <Link to="/templates">Templates</Link>
      </nav>

      {/* Right: Theme + Auth */}
      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Login */}
        <Link to="/login" className="cloud-login">
          <img src={wcloud} alt="login cloud" />
          <span>Login</span>
        </Link>

        {/* Sign Up */}
        <Link to="/signup" className="cloud-signup">
          <img src={pcloud} alt="signup cloud" />
          <span>Sign Up</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
