import { Link } from "react-router-dom";

const MODULES = [
  {
    title: "Atividades Físicas",
    description:
      "Registre caminhadas, corridas, ciclismo e acompanhe seu gasto calórico diário.",
  },
  {
    title: "Exercícios Guiados",
    description:
      "Treinos adaptados ao seu nível, objetivos e restrições físicas com instruções claras.",
  },
  {
    title: "Rotinas Saudáveis",
    description:
      "Organize horários de treino, alongamento e pausas ativas ao longo da semana.",
  },
  {
    title: "Metas Personalizadas",
    description:
      "Defina objetivos reais de movimento e acompanhe sua evolução passo a passo.",
  },
  {
    title: "Tempo de Tela",
    description:
      "Monitore o uso excessivo do celular e receba alertas inteligentes para se movimentar.",
  },
];

export default function Home() {
  const token = localStorage.getItem("kinetic_token");

  return (
    <div>
      <section
        style={{
          backgroundColor: "var(--accent-bg)",
          borderBottom: "2px solid var(--border)",
          padding: "56px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div>
            <span className="badge">
              Protótipo • Saúde, Movimento & Equilíbrio Digital
            </span>
            <h1
              style={{
                fontSize: "clamp(2.1rem, 4vw, 3.1rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              Seu corpo, <br />
              sua energia.
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-h)",
                marginBottom: "28px",
                maxWidth: "520px",
              }}
            >
              O <strong>Kinetic</strong> ajuda você a vencer o sedentarismo e
              reduzir o tempo excessivo em frente às telas com rotinas
              acessíveis e metas feitas para a sua realidade.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {token ? (
                <Link to="/dashboard" className="btn btn-primary">
                  Acessar Meu Painel
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Começar agora
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Já tenho conta
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="card" style={{ backgroundColor: "var(--bg)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <strong>Resumo Diário Kinetic</strong>
              <span className="badge">App + Web</span>
            </div>
            <p
              style={{
                color: "var(--text)",
                fontSize: "0.95rem",
                marginBottom: "20px",
              }}
            >
              Conectado ao aplicativo mobile para acompanhar exercícios, metas e
              alertas de pausa ativa.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--social-bg)",
                  border: "2px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text)" }}>
                  Foco
                </span>
                <p style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                  Menos Tela
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--social-bg)",
                  border: "2px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text)" }}>
                  Inclusão
                </span>
                <p style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                  100% Acessível
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: "56px" }}>
        <div className="card" style={{ backgroundColor: "var(--code-bg)" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Por que o Kinetic foi criado?
          </h2>
          <p
            style={{
              color: "var(--text)",
              fontSize: "1.02rem",
              maxWidth: "820px",
            }}
          >
            Passamos cada vez mais horas sentados diante de celulares e
            computadores, o que aumenta o sedentarismo, a fadiga visual e o
            cansaço mental. O Kinetic une o acompanhamento de exercícios físicos
            ao controle consciente do tempo de tela, respeitando limitações
            físicas e necessidades de acessibilidade de cada pessoa.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: "56px" }}>
        <h2
          style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}
        >
          Funcionalidades do Ecossistema Kinetic
        </h2>
        <p style={{ color: "var(--text)", marginBottom: "28px" }}>
          Tudo o que você precisa para construir constância sem complicação.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {MODULES.map((item) => (
            <article key={item.title} className="card">
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--text)", fontSize: "0.95rem" }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
