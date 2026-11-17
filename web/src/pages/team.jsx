const MEMBERS = [
  {
    name: "João Pedro",
    role: "Scrum Master, Supervisor da equipe, Documentador e Prototipação (Figma)",
  },
  {
    name: "Gabriel Almeida",
    role: "PO, Desenvolvimento Web (Frontend) e Documentador",
  },
  {
    name: "Maria Clara",
    role: "Desenvolvimento Backend, API (Node.js / MongoDB), Prototipação (Figma) e Documentação",
  },
  {
    name: "Gabriel Crispim",
    role: "Design UI/UX, Prototipação (Figma) e Documentação",
  },
  {
    name: "Diego Arantes",
    role: "Design UI/UX & Prototipação (Figma) e Documentação",
  },
  {
    name: "Cássio França",
    role: "Prototipação (Figma) e Documentação",
  },
];

const TECHNOLOGIES = [
  { name: "React 19 + Vite", area: "Aplicação Web" },
  { name: "Node.js + Express", area: "API REST" },
  { name: "React Native + Expo", area: "Aplicativo Mobile" },
  { name: "MongoDB + Mongoose", area: "Banco de Dados" },
  { name: "JWT + Bcrypt", area: "Autenticação e Segurança" },
];

export default function Team() {
  return (
    <div className="container" style={{ paddingTop: "48px" }}>
      <span className="badge">Trabalho de Conclusão de Curso</span>
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          marginTop: "12px",
          marginBottom: "12px",
        }}
      >
        Sobre o Projeto & Equipe
      </h1>
      <p
        style={{
          color: "var(--text)",
          maxWidth: "760px",
          marginBottom: "36px",
          fontSize: "1.05rem",
        }}
      >
        O <strong>Kinetic</strong> nasceu no curso Técnico em Desenvolvimento de
        Sistemas com o propósito de unir tecnologia, acessibilidade e bem-estar
        para incentivar hábitos ativos e reduzir a dependência de telas.
      </p>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "16px" }}>
        Integrantes do Grupo
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "44px",
        }}
      >
        {MEMBERS.map((member) => (
          <div key={member.name} className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>
              {member.name}
            </h3>
            <p
              style={{
                color: "var(--text)",
                fontSize: "0.92rem",
                marginTop: "6px",
              }}
            >
              {member.role}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "16px" }}>
        Tecnologias Utilizadas
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
        }}
      >
        {TECHNOLOGIES.map((tech) => (
          <div
            key={tech.name}
            className="card"
            style={{ backgroundColor: "var(--code-bg)", padding: "18px" }}
          >
            <strong style={{ display: "block", fontSize: "1rem" }}>
              {tech.name}
            </strong>
            <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>
              {tech.area}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
