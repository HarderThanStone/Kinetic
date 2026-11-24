const modules = [
  "../usuarios.js",
  "../auth.js",
  "../authMiddleware.js",
  "../models/Atividade.js",
  "../models/Exercicios.js",
  "../models/Lembrete.js",
  "../models/Metas.js",
  "../models/Rotina.js",
  "../models/UsoTela.js",
  "../Rotas/perfil.js",
  "../utils/datas.js",
  "../utils/erros.js",
  "../utils/validar.js",
  "../utils/progresso.js",
];

for (const modulePath of modules) {
  await import(modulePath);
}

console.log(`OK: ${modules.length} módulos da API importados sem erros.`);
