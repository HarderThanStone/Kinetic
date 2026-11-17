import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.age || !form.password) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const numericAge = Number(form.age);
    if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 100) {
      setError("Informe uma idade válida entre 1 e 100 anos.");
      return;
    }

    if (form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await apiRequest("/auth/cadastro", {
        method: "POST",
        body: JSON.stringify({
          nome: form.name.trim(),
          email: form.email.trim(),
          telefone: form.phone.trim(),
          idade: numericAge,
          senha: form.password,
        }),
      });

      setSuccess("Conta criada com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate("/login"), 1500);
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
    <div className="container" style={{ paddingTop: "48px", maxWidth: "500px" }}>
      <div className="card">
        <span className="badge">Nova Conta</span>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "12px", marginBottom: "8px" }}>
          Criar conta no Kinetic
        </h1>
        <p style={{ color: "var(--text)", marginBottom: "24px", fontSize: "0.95rem" }}>
          Preencha seus dados para começar a acompanhar sua saúde e tempo de tela.
        </p>

        {error && (
          <div style={{ backgroundColor: "#FEE2E2", border: "2px solid #DC2626", color: "#991B1B", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontWeight: 600 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: "#DCFCE7", border: "2px solid #16A34A", color: "#166534", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontWeight: 600 }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            Nome completo
            <input
              type="text"
              name="name"
              placeholder="Ex: Maria Silva"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            E-mail
            <input
              type="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
            <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
              Telefone
              <input
                type="tel"
                name="phone"
                placeholder="11999999999"
                value={form.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>

            <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
              Idade
              <input
                type="number"
                name="age"
                placeholder="18"
                min="1"
                max="100"
                value={form.age}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
          </div>

          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            Senha (mínimo 8 caracteres)
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={{ fontWeight: 700, fontSize: "0.92rem" }}>
            Confirmar senha
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={form.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: "8px", width: "100%" }}>
            {loading ? "Cadastrando..." : "Criar minha conta"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.92rem", color: "var(--text)" }}>
          Já possui uma conta?{" "}
          <Link to="/login" style={{ fontWeight: 800, textDecoration: "underline" }}>
            Entrar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
