Problema e objetivos

Qual objetivo mensurável principal? Ex.: aumentar conversões para um CTA, tempo de decisão, engajamento?

Nada

Sucesso é medido por quais métricas (CTR no CTA, tempo na página, conclusão de comparação, NPS)?

Nada

Usuários e contexto

Público-alvo: devs individuais, líderes técnicos, compras? País/idioma primário?

devs e líderes técnicos, mundo, inglês

Cenários: descoberta de ferramenta, escolha de plano, comparação rápida? Há fluxo pós-comparação (ex.: “Ir para site do provedor”)?

Somente comparação

Escopo funcional
As 6 colunas são fixas: GitHub Copilot, Cursor, Claude Code, Kiro, Codex, Windsurf? 

Sim

“Codex” é mesmo o OpenAI Codex (descontinuado) ou quis dizer Codeium/CodeWhisperer?

Codex CLI da OpenAI

Fonte dos dados de planos: usaremos um arquivo estático (há plans-data-reference.json) ou integração externa? Quem mantém a atualização?

Pode manter em um arquivo JSON hardcoded

O slider varia de US$0 a US$200 com qual passo (ex.: US$1/US$5)? Padrão inicial?

Padrão inicial é $0 e varia de $10 em $10

Regra de exibição: mostrar todos os planos com preço ≤ valor do slider? E planos com preço variável/por assento?

Mostra todos os planos com preço <= ao slider

Para planos grátis/freemium, exibimos mesmo em valores >0?

Se for grátis mostra no $0

O que compõe cada “plano” exibido: nome, preço, billing (mensal/anual), principais limites/benefícios, link externo, tags (ex.: “melhor custo-benefício”)?
Fora de escopo

OK, isso mesmo

Existe compra/checkout dentro do app? Login/estado do usuário? Comparação detalhada de features (checkbox por feature)?

Não

Conversão de moeda, impostos/IOF, cupons/educational pricing?

Sem imposto

Experiência e design

Diretrizes de UI: seguir design system existente (Tailwind no frontend)? Estilo de cards, estado hover, tooltips?

sim

Responsividade: suporte mínimo (mobile first?), breakpoint prioritário?

Web first, mobile second

Acessibilidade: navegação por teclado no slider e cartões, contraste, ARIA?

OK

Comportamentos: highlight de “melhor plano”, ordenação por preço, fixar cabeçalhos das 6 colunas?

Não precisa

Dados e conteúdo
Período de billing: normalizamos para mensal? Mostrar ambos (mensal/anual) se houver desconto anual?

sempre mensal

Campos obrigatórios por plano (ex.: trial, limites de tokens/repos, suporte, uso comercial)?

Sim

Como tratar preços “sob consulta” ou enterprise?

Sob consulta não precisa

Não funcionais

Performance: orçamento de tempo de carregamento (ex.: LCP < 2,5s)? Tamanho máximo do bundle?

Tanto faz

Analytics: eventos no slider (change/commit), cliques em planos/links, scroll?

Não precisa

SEO: indexável, metadados, conteúdo estático vs client-side?

Não precisa

Operação e governança

Frequência de atualização dos preços (mensal/trimestral)? Processo de revisão?

Não precisa se preocupar com isso

Avisos legais/disclaimers sobre variação de preço de terceiros?

Não precisa se preocupar com isso

Cronograma e restrições
Deadline, milestones, prioridade?

Imediato

Restrições técnicas: manter apenas no frontend sem backend? Navegadores suportados?

Frontend e backend usando os projetos existentes em @frontend e @backend

Aceitação

Critérios de aceite principais: cobertura das 6 ferramentas, exibição correta por faixa de preço, acessibilidade básica, analytics mínimos?

Tudo, menos analytics
