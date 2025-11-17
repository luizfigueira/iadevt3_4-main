# PRD - Comparador de Planos de Ferramentas de IA para Desenvolvedores

## Visão Geral

O Comparador de Planos de IA é uma aplicação web interativa que permite desenvolvedores, tech leads e tomadores de decisão comparar visualmente os planos e preços das principais ferramentas de IA para desenvolvimento de código. A ferramenta resolve o problema de escolha entre múltiplas opções de ferramentas de IA dentro de restrições orçamentárias, permitindo que usuários arrastem um slider de preço ($0 a $200) e vejam instantaneamente quais planos de cada ferramenta se encaixam no orçamento selecionado.

O problema central abordado é a dificuldade de comparar simultaneamente os planos de diferentes ferramentas de IA em termos de custo, tornando complexa a decisão de qual ferramenta adotar ou renovar dentro de um orçamento específico.

## Objetivos

- **Facilitar Decisões de Compra**: Permitir que usuários identifiquem rapidamente quais ferramentas de IA cabem em seu orçamento
- **Comparação Visual Intuitiva**: Proporcionar uma experiência de comparação simples através de um slider interativo
- **Transparência de Preços**: Apresentar de forma clara os planos disponíveis e seus preços para 6 ferramentas principais do mercado
- **Acessibilidade Universal**: Funcionar perfeitamente em desktop e mobile, alcançando desenvolvedores em qualquer contexto

Nota: Esta primeira versão não incluirá métricas formais de sucesso ou analytics.

## Histórias de Usuário

### Desenvolvedor Individual Freelancer
Como **desenvolvedor freelancer** com orçamento limitado, eu quero **comparar rapidamente os planos gratuitos e de baixo custo das ferramentas de IA** para que **eu possa maximizar minha produtividade sem comprometer meu orçamento pessoal**.

### Tech Lead de Empresa
Como **tech lead responsável por aprovar ferramentas para a equipe**, eu quero **visualizar quais planos cabem no orçamento aprovado pela empresa** para que **eu possa tomar decisões informadas sobre qual ferramenta contratar para o time**.

### CTO/Tomador de Decisão
Como **CTO avaliando custos de ferramentas para uma equipe de 10 desenvolvedores**, eu quero **arrastar um slider e ver instantaneamente todas as opções disponíveis em diferentes faixas de preço** para que **eu possa avaliar o melhor custo-benefício antes de fechar contratos anuais**.

### Estudante/Desenvolvedor Iniciante
Como **estudante de programação começando a usar ferramentas de IA**, eu quero **identificar facilmente quais ferramentas oferecem planos gratuitos** para que **eu possa experimentar diferentes opções sem custo**.

## Funcionalidades Principais

### F1. Slider Interativo de Orçamento

**Descrição**: Um slider horizontal permite ao usuário selecionar valores entre $0 e $200, representando o orçamento mensal disponível.

**Por que é importante**: É o mecanismo central de interação que permite aos usuários explorar diferentes cenários de investimento de forma intuitiva e visual.

**Como funciona**:
- Slider posicionado de forma proeminente no topo da página
- Exibe o valor selecionado em dólares em tempo real
- Ao arrastar, atualiza instantaneamente a visualização dos planos disponíveis

**Requisitos Funcionais**:
1. O slider deve permitir seleção contínua de valores entre $0 e $200
2. O valor atual selecionado deve ser exibido de forma clara acima ou ao lado do slider
3. Deve ser responsivo ao toque em dispositivos móveis
4. A atualização da visualização de planos deve ser instantânea (sem delay perceptível)

### F2. Comparação em 6 Colunas

**Descrição**: Exibição lado a lado de 6 colunas, uma para cada ferramenta de IA (GitHub Copilot, Cursor, Claude/Anthropic, Kiro, Codex/OpenAI, Windsurf).

**Por que é importante**: Permite comparação visual direta entre todas as ferramentas simultaneamente, facilitando a tomada de decisão.

**Como funciona**:
- Cada coluna representa uma ferramenta específica
- Layout de grid responsivo (6 colunas em desktop, adaptável para menos colunas em mobile)
- Cada coluna exibe os planos que cabem no orçamento selecionado

**Requisitos Funcionais**:
1. Deve exibir exatamente 6 colunas para as ferramentas: Copilot, Cursor, Claude, Kiro, Codex, Windsurf
2. Cada coluna deve ter largura igual e espaçamento consistente
3. Em mobile, as colunas devem se reorganizar em grid de 2 ou 3 colunas, ou scroll horizontal
4. Cada coluna deve ter um cabeçalho claro com o nome e logo/ícone da ferramenta

### F3. Exibição Progressiva de Planos

**Descrição**: À medida que o usuário arrasta o slider para valores maiores, mais planos aparecem em cada coluna. Ao voltar para valores menores, planos mais caros desaparecem.

**Por que é importante**: Proporciona feedback visual imediato do impacto do orçamento nas opções disponíveis, tornando a experiência intuitiva.

**Como funciona**:
- Em $0: Apenas planos gratuitos são exibidos
- Em $50: Planos até $50/mês são exibidos
- Em $200: Todos os planos disponíveis são exibidos
- Se uma ferramenta não tem plano dentro do orçamento, a coluna fica vazia

**Requisitos Funcionais**:
1. Planos devem aparecer/desaparecer dinamicamente conforme o slider se move
2. Apenas planos com preço menor ou igual ao valor selecionado devem ser visíveis
3. Colunas sem planos disponíveis devem exibir estado vazio (sem cards de plano)
4. Transições devem ser suaves (animações sutis ao aparecer/desaparecer)
5. Planos devem ser ordenados do mais barato ao mais caro dentro de cada coluna

### F4. Cards de Plano Informativos

**Descrição**: Cada plano é exibido como um card contendo informações essenciais: nome do plano, preço mensal, modelos de IA incluídos, volume (requisições/créditos/tokens), e pontos importantes.

**Por que é importante**: Fornece as informações necessárias para o usuário avaliar se o plano atende suas necessidades além do preço.

**Como funciona**:
- Cards visualmente destacados com design consistente
- Informações organizadas hierarquicamente
- Design inspirado nos componentes do GitHub

**Requisitos Funcionais**:
1. Cada card deve exibir obrigatoriamente: Nome do Plano, Preço Mensal ($)
2. Cada card deve exibir quando disponível: Modelos de IA, Volume (requisições/créditos/tokens), Pontos Importantes
3. Preço deve ser o elemento mais destacado visualmente
4. Cards devem ter altura variável baseada no conteúdo, ou altura mínima consistente
5. Design deve ser consistente entre todas as ferramentas

### F5. Interface Responsiva

**Descrição**: A interface se adapta perfeitamente a diferentes tamanhos de tela, de smartphones a monitores wide.

**Por que é importante**: Garante que desenvolvedores possam usar a ferramenta em qualquer dispositivo, seja no escritório ou em mobilidade.

**Como funciona**:
- Layout fluido que se reorganiza baseado na largura da tela
- Otimizações específicas para touch em mobile

**Requisitos Funcionais**:
1. Em desktop (>1200px): 6 colunas lado a lado
2. Em tablet (768px-1199px): 3 colunas em 2 linhas ou scroll horizontal
3. Em mobile (<768px): 2 colunas ou scroll horizontal
4. Slider deve ser facilmente manipulável em touch screens
5. Texto deve ser legível em todas as resoluções (tamanhos mínimos respeitados)


## Experiência do Usuário

### Personas de Usuário

**Persona 1: Lucas, Desenvolvedor Freelancer (27 anos)**
- Necessidades: Maximizar produtividade com baixo investimento
- Comportamento: Explora principalmente a faixa $0-$30
- Pain Points: Orçamento apertado, precisa justificar cada investimento

**Persona 2: Mariana, Tech Lead (34 anos)**
- Necessidades: Escolher ferramenta para equipe de 5 devs dentro do budget aprovado
- Comportamento: Compara faixas $50-$150 buscando melhor custo-benefício
- Pain Points: Precisa de aprovação financeira, busca justificar ROI

**Persona 3: Ricardo, CTO (42 anos)**
- Necessidades: Decisão estratégica para equipe grande
- Comportamento: Analisa toda a faixa de preços, foca em planos enterprise
- Pain Points: Precisa de visão completa antes de contratos anuais

### Fluxo Principal do Usuário

1. **Entrada**: Usuário acessa a página do comparador
2. **Orientação**: Vê slider em destaque e 6 colunas com planos (inicialmente em $0 ou valor default)
3. **Exploração**: Arrasta o slider explorando diferentes faixas de preço
4. **Análise**: Compara os planos que aparecem/desaparecem em cada ferramenta
5. **Decisão**: Identifica qual(is) ferramenta(s) oferece(m) melhor custo-benefício no seu orçamento
6. **Ação Externa**: Visita site da ferramenta escolhida para contratar (fora do escopo desta app)

### Considerações de UI/UX

- **Design Inspiração**: Estilo GitHub (clean, focado em conteúdo, tipografia clara)
- **Paleta de Cores**: Tons neutros (cinzas) com destaques em azul/verde para elementos interativos
- **Tipografia**: Fonte sans-serif legível (system fonts ou similar ao GitHub)
- **Feedback Visual**: Animações sutis ao aparecer/desaparecer planos
- **Estados Vazios**: Mensagem clara quando coluna não tem planos no orçamento ("Nenhum plano disponível nesta faixa de preço")
- **Loading State**: Indicador de carregamento enquanto dados são buscados do backend

### Requisitos de Acessibilidade

- Contraste de texto suficiente (WCAG AA mínimo)
- Slider operável via teclado (setas para incrementar/decrementar)
- Labels descritivos para leitores de tela
- Tamanhos de toque adequados em mobile (mínimo 44x44px)

## Restrições Técnicas de Alto Nível

### Armazenamento de Dados

- Dados dos planos das 6 ferramentas devem ser armazenados em arquivo JSON no backend
- O arquivo JSON deve conter informações pesquisadas sobre planos reais das ferramentas (nome, preço, modelos, volume, pontos importantes)
- Dados são estáticos (hardcoded), sem conexão com APIs externas das ferramentas

### Performance

- Tempo de resposta da API: <100ms para retornar dados dos planos
- Atualização do UI ao mover slider: <50ms (imperceptível ao usuário)
- Primeira renderização: <2s em conexão 3G

### Compatibilidade

- Navegadores modernos: Chrome, Firefox, Safari, Edge (últimas 2 versões)
- Não há requisito de suporte para IE11

### Privacidade e Segurança

- Nenhum dado de usuário é coletado ou armazenado
- Não há autenticação ou autorização necessária
- API é pública e somente leitura

## Não-Objetivos (Fora de Escopo)

### Funcionalidades Excluídas da Versão 1

1. **Analytics e Rastreamento**: Não haverá coleta de dados sobre uso do slider ou escolhas dos usuários
2. **Filtros Avançados**: Não haverá filtros por recursos específicos (modelos de IA, linguagens suportadas, integrações)
3. **Comparação de Recursos Detalhada**: Foco exclusivo em preço; recursos são informativos mas não comparáveis lado a lado
4. **Export/Salvamento**: Não haverá funcionalidade de salvar, exportar ou compartilhar comparações
5. **Autenticação de Usuário**: Aplicação completamente pública, sem contas de usuário
6. **Links de Afiliados**: Não haverá links de afiliados ou rastreamento de conversão
7. **Atualização Automática de Preços**: Preços são hardcoded; atualizações requerem edição manual do JSON
8. **Comparação Personalizada**: Usuário não pode adicionar/remover ferramentas da comparação
9. **Calculadora de TCO**: Não haverá cálculo de custo total para equipes (multiplicar por número de licenças)
10. **Reviews ou Ratings**: Não haverá avaliações de usuários ou ratings das ferramentas

### Limites e Limitações

- **Atualidade dos Dados**: Preços podem ficar desatualizados; responsabilidade de manter JSON atualizado é manual
- **Número de Ferramentas**: Fixado em 6 ferramentas; adicionar mais requer mudanças no código
- **Profundidade de Informação**: Informações sobre planos são limitadas ao que cabe nos cards; detalhes completos estão nos sites oficiais
- **Sem Recomendações**: Sistema não sugere qual ferramenta é "melhor"; apenas apresenta informações

## Questões em Aberto

### Design Visual

- Logos/ícones das ferramentas: usar logos oficiais requer verificação de direitos de uso; alternativa seria usar iniciais ou ícones genéricos

Temos direito de usar, pode usar

- Cores dos cards: usar cores da marca de cada ferramenta ou manter neutro para todas?

Pode usar cores da marca

### Comportamento do Slider

- Incremento do slider: deve ser contínuo ($1 a $1) ou em incrementos maiores ($5 em $5)?

Pode ser de 5 em 5

- Valor inicial padrão: slider deve iniciar em $0, $20 (típico plano individual), ou permitir que usuário defina?

Inicia em $0

### Informações dos Planos

- Formato de "Volume": algumas ferramentas usam tokens, outras requisições, outras "unlimited" - como padronizar apresentação?
- "Pontos Importantes": quais critérios usar para selecionar 2-3 pontos mais relevantes de cada plano?

### Responsividade Mobile

- Em mobile, preferência por scroll horizontal (todas as 6 colunas visíveis) ou grid vertical (2 colunas, 3 linhas)?

mobile pode deixar uma embaixo da outra

