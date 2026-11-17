import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("kinetic_token");

  function handleLogout() {
    localStorage.removeItem("kinetic_token");
    localStorage.removeItem("kinetic_user");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link
          to="/"
          className="navbar-logo"
          aria-label="Kinetic Página Inicial"
        >
          <span>Kinetic</span>
        </Link>

        <nav className="navbar-links" aria-label="Navegação principal">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Início
          </NavLink>
          <NavLink
            to="/subscription"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Planos
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sobre a equipe
          </NavLink>
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Meu Painel
            </NavLink>
          )}
        </nav>

        <div className="navbar-actions">
          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Sair
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Entrar
              </Link>
              <Link to="/register" className="btn btn-primary">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
