import { useState } from "react";
import { Link } from "react-router-dom";

export default function Subscription() {
  const token = localStorage.getItem("kinetic_token");
  const [notice, setNotice] = useState("");

  function handleUpgradeRequest() {
    setNotice(
      "Módulo de pagamento em fase acadêmica: o gerenciamento de assinatura será integrado em versões futuras da API.",
    );
  }

  return (
    <div className="container" style={{ paddingTop: "48px" }}>
      <span className="badge">Planos & Assinatura</span>
      <h1
        style={{
          fontSize: "2.1rem",
          fontWeight: 800,
          marginTop: "12px",
          marginBottom: "10px",
        }}
      >
        Escolha como cuidar da sua energia
      </h1>
      <p
        style={{
          color: "var(--text)",
          maxWidth: "680px",
          marginBottom: "32px",
        }}
      >
        O Kinetic oferece recursos essenciais gratuitos para combater o
        sedentarismo e controlar o tempo de tela, além de opções avançadas para
        acompanhamento completo.
      </p>

      {notice && (
        <div
          className="card"
          style={{
            backgroundColor: "var(--code-bg)",
            marginBottom: "28px",
            fontWeight: 600,
          }}
        >
          {notice}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "24px",
        }}
      >
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                Kinetic Essencial
              </h2>
              {token && <span className="badge">Plano Atual</span>}
            </div>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: "16px 0" }}>
              R$ 0{" "}
              <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                / mês
              </span>
            </p>
            <ul
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                color: "var(--text)",
              }}
            >
              <li>Registro básico de atividades físicas e exercícios</li>
              <li>Monitoramento diário de tempo de tela</li>
              <li>
                Recursos completos de acessibilidade (legendas, contraste e
                fonte)
              </li>
              <li>Acesso ao aplicativo mobile e painel web</li>
            </ul>
          </div>

          <div style={{ marginTop: "28px" }}>
            {token ? (
              <Link
                to="/dashboard"
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Voltar ao Meu Painel
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Criar Conta Gratuita
              </Link>
            )}
          </div>
        </div>

        <div
          className="card"
          style={{
            backgroundColor: "var(--code-bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Kinetic+</h2>
              <span
                className="badge"
                style={{ backgroundColor: "var(--accent)", color: "#FFF" }}
              >
                Completo
              </span>
            </div>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: "16px 0" }}>
              R$ 19,90{" "}
              <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                / mês
              </span>
            </p>
            <ul
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                color: "var(--text-h)",
              }}
            >
              <li>Tudo do plano Kinetic Essencial</li>
              <li>Rotinas personalizadas ilimitadas e metas semanais</li>
              <li>
                Relatórios detalhados de evolução física e equilíbrio digital
              </li>
              <li>Alertas inteligentes personalizados de pausa ativa</li>
            </ul>
          </div>

          <div style={{ marginTop: "28px" }}>
            <button
              type="button"
              onClick={handleUpgradeRequest}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Conhecer Kinetic+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
