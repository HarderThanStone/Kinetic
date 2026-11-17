import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";

const DASHBOARD_MODULES = [
  {
    title: "Atividades Físicas",
    status: "Sincronizado via App Mobile",
    detail: "Caminhadas, corridas e treinos registrados diretamente no aplicativo.",
  },
  {
    title: "Exercícios",
    status: "Módulo Mobile",
    detail: "Séries guiadas com adaptação para restrições físicas e acessibilidade.",
  },
  {
    title: "Rotinas",
    status: "Módulo Mobile",
    detail: "Planejamento semanal de movimento e pausas ativas durante o dia.",
  },
  {
    title: "Metas",
    status: "Módulo Mobile",
    detail: "Acompanhamento de objetivos diários e semanais definidos no app.",
  },
  {
    title: "Uso de Tela",
    status: "Configuração Ativa na API",
    detail: "Monitoramento de tempo de uso e alertas de pausa configurados no perfil.",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiRequest("/perfil");
        setProfile(data);
      } catch (err) {
        setError(err.message);
        localStorage.removeItem("kinetic_token");
        localStorage.removeItem("kinetic_user");
        setTimeout(() => navigate("/login"), 1800);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "56px" }}>
        <p style={{ fontWeight: 700 }}>Carregando informações do seu perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: "56px" }}>
        <div className="card" style={{ backgroundColor: "#FEE2E2", borderColor: "#DC2626" }}>
          <p style={{ fontWeight: 700, color: "#991B1B" }}>{error}</p>
          <p style={{ fontSize: "0.9rem", marginTop: "6px" }}>Redirecionando para o login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <div
        className="card"
        style={{
          backgroundColor: "var(--accent-bg)",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <span className="badge" style={{ backgroundColor: "var(--social-bg)" }}>
            Área do Usuário • Conectado à API
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "10px" }}>
            Olá, {profile?.nome}!
          </h1>
          <p style={{ color: "var(--text-h)", marginTop: "4px" }}>
            {profile?.email} • {profile?.idade} anos • Tel: {profile?.telefone}
          </p>
        </div>

        <Link to="/subscription" className="btn btn-secondary">
          Gerenciar Assinatura
        </Link>
      </div>

      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "14px" }}>
        Configurações da Conta (Banco de Dados)
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div className="card">
          <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>Limite Diário de Tela</span>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "4px" }}>
            {profile?.configuracoes?.limiteDeTelaDiario ?? 240} min
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>Intervalo de Pausa</span>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "4px" }}>
            A cada {profile?.configuracoes?.intervaloPausaMin ?? 50} min
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>Notificações</span>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "4px" }}>
            {profile?.configuracoes?.notificacoes ? "Ativadas" : "Desativadas"}
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>Legendas / Acessibilidade</span>
          <p style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "4px" }}>
            {profile?.acessibilidade?.legendas ? "Ativas" : "Padrão"}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
          Módulos do Ecossistema Kinetic
        </h2>
        <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>
          * Visão demonstrativa: registros detalhados são realizados pelo app mobile.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {DASHBOARD_MODULES.map((mod) => (
          <article key={mod.title} className="card">
            <span className="badge" style={{ fontSize: "0.78rem" }}>
              {mod.status}
            </span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "12px", marginBottom: "6px" }}>
              {mod.title}
            </h3>
            <p style={{ color: "var(--text)", fontSize: "0.92rem" }}>{mod.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
