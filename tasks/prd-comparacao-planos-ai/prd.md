# Documento de Requisitos de Produto (PRD)

## Visão Geral

Funcionalidade de comparação de planos das principais ferramentas de AI para desenvolvimento (GitHub Copilot, Cursor, Claude Code, Kiro, Codex CLI da OpenAI e Windsurf). Por meio de um slider de orçamento (US$0–US$200), o usuário arrasta para definir quanto quer gastar e, instantaneamente, vê em seis colunas os planos de cada ferramenta cujo preço mensal seja menor ou igual ao valor selecionado. O objetivo é permitir uma avaliação rápida e objetiva do que cabe no orçamento, sem navegação externa ou detalhes excessivos.

## Objetivos

- Tornar a seleção de plano mais rápida para devs e líderes técnicos, reduzindo o esforço de pesquisa.
- Exibir corretamente os planos compatíveis com o orçamento definido, para as 6 ferramentas suportadas.
- Garantir acessibilidade básica (slider e cartões navegáveis por teclado, labels e ARIA adequados).
- Entrega imediata usando os projetos existentes de frontend e backend do repositório, com dados estáticos.

## Histórias de Usuário

- Como desenvolvedor individual, quero arrastar um slider de preço para ver quais planos das 6 ferramentas cabem no meu orçamento mensal, para decidir rapidamente.
- Como líder técnico, quero verificar opções por faixa de preço (até US$200/mês) para montar recomendações de ferramentas compatíveis com nosso orçamento.
- Como usuário em descoberta, quero ver as opções gratuitas quando o orçamento é US$0 para experimentar sem custo.

## Funcionalidades Principais

- Slider de orçamento (US$0 a US$200) controlando o filtro de planos por preço mensal.
- Grade de seis colunas fixas: GitHub Copilot, Cursor, Claude Code, Kiro, Codex CLI (OpenAI) e Windsurf.
- Cartões de plano contendo nome, preço mensal (USD), billing mensal, principais limites/benefícios, e link externo para a ferramenta. Tags como “best value” são opcionais.
- Dados de planos carregados de um JSON estático versionado no repositório, com preços normalizados para mensal.

Requisitos funcionais

1. O slider deve variar de US$0 a US$200 inclusive, com passo de US$10 e valor inicial em US$0.
2. Ao alterar o slider, a interface deve atualizar imediatamente os planos exibidos em todas as 6 colunas.
3. A regra de filtro é: exibir todos os planos com preço mensal em USD menor ou igual ao valor atual do slider.
4. Planos gratuitos/freemium devem ser exibidos somente quando o slider estiver exatamente em US$0.
5. As 6 colunas são fixas e nomeadas: “GitHub Copilot”, “Cursor”, “Claude Code”, “Kiro”, “Codex CLI (OpenAI)”, “Windsurf”.
6. Cada cartão de plano deve exibir: nome do plano, preço em USD/mês (formato “$X/mo”), billing “monthly”, 2–5 bullets de limites/benefícios, e um link externo “Visit”.
7. O link “Visit” deve abrir o site/provedor do plano em nova aba/janela.
8. Os planos devem ser exibidos ordenados por preço crescente dentro de cada coluna.
9. A interface deve estar em inglês; a moeda é fixa em USD, sem conversões.
10. O componente de slider e os cartões devem ser acessíveis por teclado; o slider deve ter labels, valor atual exposto a leitores de tela e foco visível.
11. A página deve ser responsiva (web first): em larguras menores, as colunas podem empilhar ou permitir rolagem horizontal, preservando a legibilidade dos cartões.
12. A fonte de dados deve ser um arquivo JSON estático no repositório, com o seguinte mínimo por plano: `tool`, `planName`, `priceUsdMonthly` (number), `billing` = "monthly", `bullets` (string[]), `url` (string), `tags?` (string[] opcional).
13. A aplicação deve consumir esse JSON sem integrações externas; não há necessidade de autenticação ou estado do usuário.
14. Não deve haver compra/checkout, login, comparativo detalhado de feature por feature, nem cálculo de impostos.
15. Deve funcionar nos projetos existentes do repositório (`frontend` e `backend`), com a solução principal no frontend e dados estáticos.

## Experiência do Usuário

- Público-alvo: devs e líderes técnicos, uso global, interface em inglês.
- Fluxo principal: ajustar slider → ver, por coluna, os planos compatíveis até o valor selecionado → opcionalmente clicar no link externo do plano.
- UI/UX: uso de Tailwind no `frontend`, cards simples, tipografia clara, foco visível, contraste adequado. Sem destaque especial de “melhor plano” e sem cabeçalhos fixos obrigatórios.
- Acessibilidade: slider com rótulos e ARIA apropriados; cartões navegáveis por teclado; foco e leitura do valor atual do slider por leitores de tela.

## Restrições Técnicas de Alto Nível

- Dados: JSON estático versionado no repositório; preços normalizados para mensal (USD). Sem integrações externas.
- Arquitetura: implementação no `frontend`; o `backend` pode permanecer sem mudanças funcionais. Não requer persistência.
- Navegadores: suportar versões modernas de navegadores desktop (web first); mobile com comportamento degradado aceitável.
- Performance: sem metas específicas; manter carregamento leve e responsivo.

## Não-Objetivos (Fora de Escopo)

- Analytics (eventos de slider/cliques) e SEO avançado.
- Conversão de moeda, impostos, cupons, preços enterprise/sob consulta.
- Login/checkout, comparação detalhada de features por checkbox, NPS.

## Questões em Aberto

- Localização do JSON estático: confirmar diretório final (ex.: `frontend/public/plans.json`).
- Disponibilidade e estrutura oficial de planos do “Codex CLI (OpenAI)”: confirmar valores e exemplos de bullets.
