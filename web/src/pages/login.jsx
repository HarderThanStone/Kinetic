import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Informe seu e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), senha: password }),
      });

      localStorage.setItem("kinetic_token", data.token);
      localStorage.setItem("kinetic_user", JSON.stringify(data.usuario));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "2px solid var(--border)",
    fontSize: "1rem",
    fontFamily: "inherit",
    marginTop: "6px",
    backgroundColor: "var(--social-bg)",
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "48px", maxWidth: "460px" }}
    >
      <div className="card">
        <span className="badge">Acesso</span>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            marginTop: "12px",
            marginBottom: "8px",
          }}
        >
          Entrar no Kinetic
        </h1>
        <p
          style={{
            color: "var(--text)",
            marginBottom: "24px",
            fontSize: "0.95rem",
          }}
        >
          Acesse sua conta para visualizar seu perfil e os módulos do projeto.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#FEE2E2",
              border: "2px solid #DC2626",
              color: "#991B1B",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            E-mail
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            Senha
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ marginTop: "8px", width: "100%" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "0.92rem",
            color: "var(--text)",
          }}
        >
          Ainda não tem conta?{" "}
          <Link
            to="/register"
            style={{ fontWeight: 800, textDecoration: "underline" }}
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
