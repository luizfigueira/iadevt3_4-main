## markdown

## status: completed # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>frontend/ui</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>high</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 2.0: Componentes Frontend e Lógica de Filtro

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Esta tarefa implementa toda a interface do usuário e lógica de filtro no frontend. Inclui a criação dos quatro componentes React principais (PlanCard, BudgetSlider, ToolColumn, PlansComparison) com suas respectivas funcionalidades de acessibilidade, responsividade e integração com a API backend. Todos os componentes devem seguir os padrões do projeto (JSX, Tailwind, acessibilidade WCAG 2.1 AA).

## Requisitos

<requirements>
- Criar componente PlanCard para exibir detalhes de um plano individual
- Criar componente BudgetSlider com range input ($0-$200, step $10) e acessibilidade completa
- Criar componente ToolColumn para agrupar planos por ferramenta
- Criar componente PlansComparison (orquestrador principal) com carregamento de dados e filtro
- Implementar filtro em tempo real ao mover slider
- Garantir acessibilidade: ARIA labels, navegação por teclado, leitores de tela
- Implementar responsividade: mobile (stack), tablet (2 colunas), desktop (6 colunas)
- Escrever testes unitários para todos os componentes
- Usar Tailwind CSS para estilização
- Seguir padrões de código do projeto (camelCase, PascalCase, max 300 linhas por componente)
</requirements>

## Subtarefas

- [x] 2.1 Criar componente PlanCard
  - [x] Criar arquivo `frontend/src/components/PlanCard.jsx`
  - [x] Receber prop `plan` com estrutura definida na techspec
  - [x] Exibir: nome do plano, preço formatado ("$X/mo"), billing ("monthly"), bullets (lista), link externo "Visit"
  - [x] Renderizar tags opcionais se presentes (badges)
  - [x] Link externo abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`)
  - [x] Implementar estados de foco visíveis para acessibilidade
  - [x] Estilizar com Tailwind (card layout, espaçamento adequado)
  - [x] Usar elemento semântico apropriado (`<article>`)
  - [x] Escrever testes unitários (`PlanCard.test.jsx`)

- [x] 2.2 Criar componente BudgetSlider
  - [x] Criar arquivo `frontend/src/components/BudgetSlider.jsx`
  - [x] Receber props: `budget` (number), `onBudgetChange` (function), `min` (0), `max` (200), `step` (10)
  - [x] Implementar `<input type="range">` nativo com Tailwind styling customizado
  - [x] Exibir valor atual formatado ("$X/mo") de forma proeminente
  - [x] Adicionar ARIA labels: `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
  - [x] Implementar navegação por teclado (setas incrementam/decrementam)
  - [x] Adicionar `role="slider"` e `aria-live` para leitores de tela
  - [x] Garantir contraste adequado e foco visível
  - [x] Testar cross-browser (Chrome, Firefox, Safari, Edge)
  - [x] Escrever testes unitários (`BudgetSlider.test.jsx`)

- [x] 2.3 Criar componente ToolColumn
  - [x] Criar arquivo `frontend/src/components/ToolColumn.jsx`
  - [x] Receber props: `toolName` (string), `plans` (array de Plan)
  - [x] Exibir nome da ferramenta como cabeçalho da coluna
  - [x] Renderizar múltiplos PlanCard components (um por plano)
  - [x] Ordenar planos por `priceUsdMonthly` antes de renderizar
  - [x] Implementar estado vazio quando `plans.length === 0` (mensagem apropriada)
  - [x] Layout responsivo: coluna completa em mobile, grid em desktop
  - [x] Escrever testes unitários (`ToolColumn.test.jsx`)

- [x] 2.4 Criar componente PlansComparison (orquestrador)
  - [x] Criar arquivo `frontend/src/components/PlansComparison.jsx`
  - [x] Implementar estado: `budget` (inicial 0), `plans` (array vazio), `error` (string | null), `loading` (boolean)
  - [x] Carregar dados na montagem: `useEffect` com `fetch('http://localhost:3000/api/plans')`
  - [x] Tratar erros de carregamento (exibir mensagem amigável)
  - [x] Implementar filtro usando `filterPlansByBudget()` e `groupPlansByTool()` (importar de utils)
  - [x] Usar `useMemo` para otimizar cálculo de filtro
  - [x] Renderizar BudgetSlider com callback `onBudgetChange`
  - [x] Renderizar 6 ToolColumn components (uma para cada tool: github-copilot, cursor, claude, kiro, codex-cli, windsurf)
  - [x] Layout responsivo: grid adaptativo (mobile: stack, tablet: 2 cols, desktop: 6 cols)
  - [x] Garantir que filtro atualiza imediatamente ao mover slider
  - [x] Validar lógica especial: planos gratuitos só aparecem quando budget === 0
  - [x] Escrever testes unitários (`PlansComparison.test.jsx`) com mock de fetch

- [x] 2.5 Otimizações e validações finais
  - [x] Adicionar `React.memo` em PlanCard se necessário (performance)
  - [x] Validar que todos os componentes seguem padrões de código do projeto
  - [x] Verificar limites de linhas (max 300 por componente)
  - [x] Testar acessibilidade manualmente com teclado e leitor de tela
  - [x] Validar responsividade em diferentes breakpoints (640px, 1024px, 1400px)
  - [x] Garantir que código está em inglês (componentes, variáveis, comentários)

## Detalhes de Implementação

Referência completa em `techspec.md`:
- **Seção**: "Arquitetura do Sistema" (linhas 9-32) - Visão geral dos componentes e data flow
- **Seção**: "Interfaces Principais" (linhas 35-86) - Props e estruturas de dados dos componentes
- **Seção**: "Considerações Técnicas" → "Decisões Principais" (linhas 435-470) - Decisões arquiteturais
- **Seção**: "Conformidade com Padrões" (linhas 532-571) - Padrões de código React e projeto

**Componentes e Props**:
- `PlanCard({ plan })` - Exibe card individual
- `BudgetSlider({ budget, onBudgetChange, min, max, step })` - Slider controlado
- `ToolColumn({ toolName, plans })` - Coluna de ferramenta
- `PlansComparison()` - Componente sem props, orquestrador

**Data Flow**:
1. PlansComparison carrega dados via fetch
2. Usuário move slider → budget state atualiza
3. PlansComparison filtra planos usando utils
4. Planos filtrados agrupados por tool
5. ToolColumn renderiza PlanCard para cada plano

**Responsividade**:
- Mobile (< 640px): Stack vertical, cards full width
- Tablet (640px - 1024px): 2 colunas lado a lado
- Desktop (> 1024px): 6 colunas em grid responsivo

## Critérios de Sucesso

- Todos os 4 componentes criados e funcionando corretamente
- PlanCard exibe todas as informações do plano corretamente
- BudgetSlider funciona com valores $0-$200, step $10, atualiza em tempo real
- ToolColumn exibe planos ordenados por preço e estado vazio quando apropriado
- PlansComparison carrega dados da API e filtra corretamente
- Filtro funciona: planos gratuitos só aparecem em budget $0
- Filtro funciona: planos pagos aparecem quando price <= budget
- Interface responsiva funciona em mobile, tablet e desktop
- Acessibilidade: navegação por teclado funciona, ARIA labels presentes, leitores de tela compatíveis
- Testes unitários escritos para todos os componentes (cobertura >80%)
- Código segue padrões do projeto (JSX, Tailwind, camelCase/PascalCase, max 300 linhas)
- Sem erros de lint ou console no navegador

## Arquivos relevantes

- `/frontend/src/components/PlanCard.jsx` - Componente a ser criado
- `/frontend/src/components/BudgetSlider.jsx` - Componente a ser criado
- `/frontend/src/components/ToolColumn.jsx` - Componente a ser criado
- `/frontend/src/components/PlansComparison.jsx` - Componente a ser criado
- `/frontend/src/components/__tests__/PlanCard.test.jsx` - Testes a serem criados
- `/frontend/src/components/__tests__/BudgetSlider.test.jsx` - Testes a serem criados
- `/frontend/src/components/__tests__/ToolColumn.test.jsx` - Testes a serem criados
- `/frontend/src/components/__tests__/PlansComparison.test.jsx` - Testes a serem criados
- `/frontend/src/utils/planFilters.js` - Funções utilitárias (já criadas na tarefa 1.0)
- `/frontend/src/components/ui/button.jsx` - Componente opcional para reutilização
- `/frontend/src/lib/utils.js` - Utilitários existentes (cn function)
- `/frontend/tailwind.config.js` - Configuração Tailwind existente

