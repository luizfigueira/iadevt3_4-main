## markdown

## status: completed # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>backend/infra/api</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 1.0: Backend e Preparação de Dados

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Esta tarefa estabelece a base de dados e infraestrutura backend necessária para a funcionalidade de comparação de planos. Inclui a transformação dos dados de referência em um formato JSON produção-ready, criação do endpoint de API para servir esses dados, e implementação das funções utilitárias de filtro e agrupamento que serão usadas pelo frontend.

## Requisitos

<requirements>
- Transformar `plans-data-reference.json` em `backend/src/data/plans.json` seguindo o schema definido na techspec
- Criar endpoint `GET /api/plans` no backend Express.js
- Implementar tratamento de erros adequado (500 para erros de leitura, 404 se arquivo não existir)
- Criar funções utilitárias `filterPlansByBudget()` e `groupPlansByTool()` em `frontend/src/utils/planFilters.js`
- Validar que todos os campos obrigatórios estão presentes nos dados transformados
- Adicionar URLs oficiais para cada ferramenta/plano
- Normalizar preços para mensal (USD)
- Garantir que planos gratuitos tenham `priceUsdMonthly: 0`
</requirements>

## Subtarefas

- [x] 1.1 Transformar dados de referência em formato produção
  - [x] Ler `plans-data-reference.json` da pasta atual
  - [x] Mapear estrutura: `id` → `tool`, `name` (tool) → contexto, `price` → `priceUsdMonthly`
  - [x] Combinar `models`, `volume`, `highlights` → `bullets` (2-5 strings formatadas)
  - [x] Adicionar URLs oficiais para cada ferramenta (verificar techspec para lista)
  - [x] Definir `billing: "monthly"` para todos os planos
  - [x] Mapear `name` (plan) → `planName`
  - [x] Criar array flat de planos (não aninhado por tool)
  - [x] Validar schema: `tool`, `planName`, `priceUsdMonthly`, `billing`, `bullets`, `url`, `tags?`
  - [x] Salvar em `backend/src/data/plans.json`

- [x] 1.2 Criar endpoint de API `/api/plans`
  - [x] Adicionar rota `GET /api/plans` em `backend/src/index.ts`
  - [x] Implementar leitura de `backend/src/data/plans.json` usando `fs.readFileSync` ou `fs.promises`
  - [x] Parse JSON e validar estrutura básica
  - [x] Retornar JSON com header `Content-Type: application/json`
  - [x] Adicionar tratamento de erro: 500 se arquivo não existe ou JSON inválido
  - [x] Adicionar logging básico (console.log para requisições)
  - [x] Testar endpoint manualmente com curl ou Postman

- [x] 1.3 Implementar funções utilitárias de filtro
  - [x] Criar arquivo `frontend/src/utils/planFilters.js`
  - [x] Implementar `filterPlansByBudget(allPlans, budget)`:
    - Se `budget === 0`: retornar apenas planos com `priceUsdMonthly === 0`
    - Se `budget > 0`: retornar planos com `priceUsdMonthly > 0 && priceUsdMonthly <= budget`
  - [x] Implementar `groupPlansByTool(plans)`:
    - Agrupar planos por `tool` (identificador)
    - Ordenar planos dentro de cada grupo por `priceUsdMonthly` (ascendente)
    - Retornar objeto `{ [tool]: Plan[] }`
  - [x] Garantir que funções são puras (sem side effects)
  - [x] Escrever testes unitários básicos (verificar lógica de filtro)

## Detalhes de Implementação

Referência completa em `techspec.md`:
- **Seção**: "Modelos de Dados" (linhas 88-134) - Schema e estrutura de dados esperada
- **Seção**: "Endpoints de API" (linhas 136-185) - Especificação do endpoint `/api/plans`
- **Seção**: "Filtering Logic" (linhas 111-134) - Lógica de filtro e agrupamento

**Schema de dados esperado**:
```javascript
{
  tool: "github-copilot" | "cursor" | "claude" | "kiro" | "codex-cli" | "windsurf",
  planName: string,
  priceUsdMonthly: number,
  billing: "monthly",
  bullets: string[], // 2-5 items
  url: string,
  tags?: string[] | null
}
```

**Endpoints esperados**:
- `GET /api/plans` → Retorna array de planos JSON
- Status 200: Sucesso
- Status 500: Erro ao ler arquivo ou parse JSON

## Critérios de Sucesso

- Arquivo `backend/src/data/plans.json` existe e contém array válido de planos
- Todos os 6 tools estão representados (github-copilot, cursor, claude, kiro, codex-cli, windsurf)
- Todos os planos têm campos obrigatórios preenchidos
- Endpoint `GET /api/plans` retorna 200 com JSON válido quando servidor está rodando
- Endpoint retorna 500 apropriado quando arquivo não existe
- Funções `filterPlansByBudget()` e `groupPlansByTool()` implementadas e testadas
- Funções utilitárias retornam resultados corretos para casos de teste (budget $0, budget $50, budget $200)
- Planos agrupados por tool e ordenados por preço dentro de cada grupo

## Arquivos relevantes

- `/tasks/prd-comparacao-planos-ai/plans-data-reference.json` - Dados de referência para transformação
- `/backend/src/data/plans.json` - Arquivo a ser criado com dados transformados
- `/backend/src/index.ts` - Arquivo a ser modificado para adicionar endpoint
- `/frontend/src/utils/planFilters.js` - Arquivo a ser criado com funções utilitárias
- `/frontend/src/utils/__tests__/planFilters.test.js` - Arquivo de testes a ser criado (opcional nesta tarefa)

