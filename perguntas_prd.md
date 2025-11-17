1. Problema e Objetivos

Qual o principal problema que esta ferramenta resolve para o usuário? É ajudar desenvolvedores a escolher a melhor ferramenta de IA dentro do orçamento disponível?

Sim

Há métricas de sucesso definidas? (ex: taxa de conversão, tempo de decisão do usuário, etc.)

Não precisa de métricas

2. Usuários e Contexto

Quem são os usuários principais? Desenvolvedores individuais, tech leads, ou tomadores de decisão em empresas?

Todos esses

Os usuários precisam comparar recursos específicos além do preço, ou o foco é principalmente o valor/custo?

Somente o preço

3. Dados e Conteúdo

De onde virão os dados dos planos? Serão hardcoded, vindo de uma API, ou atualizados manualmente?

Serão hardcoded, faça uma pesquisa na web para identificar os principais planos e preços e mantenha em um arquivo JSON

As 6 ferramentas (Copilot, Cursor, Claude Code, Kiro, Codex, Windsurf) têm quantos planos cada? Todos têm plano gratuito?

Você precisa descobrir isso...

Quais informações de cada plano devem ser exibidas nas colunas? (nome, preço, recursos principais, limitações?)

Basicamente o nome, preço, principais modelos, volume de requisições/créditos/tokens (o que tiver disponível), pontos importantes

4. Comportamento do Slider

Quando o usuário seleciona um valor (ex: $50), deve mostrar:
Apenas planos que custam exatamente $50?

Não, faça progressivamente, ou seja, se tiver no $0 mostra somente os gratuitos, se tiver no $100 mostra tudo que cabe em $100 de orçamento e assim por diante

Se uma ferramenta não tem plano no valor selecionado, a coluna fica vazia ou mostra o plano mais próximo?

Fica vazio

5. Experiência e Design

Existe algum design de referência ou wireframe?

Se inspire no layout do GitHub (pegada meio dev)

A interface será responsiva para mobile? Como funcionará em telas menores?

Sim, será responsiva

Precisa de filtros adicionais além do preço? (ex: filtrar por recursos específicos)

Não

Deve ter opção de salvar/exportar a comparação?

Não

6. Escopo e Restrições

Esta funcionalidade será uma página standalone ou integrada em uma aplicação maior?

Será standalone, vai utilizar a estrutura já existentes nas pastas @frontend e @backend

Há alguma tecnologia ou biblioteca específica que deve/não deve ser usada?

Utilize os projetos existentes em @frontend e @backend

Qual o prazo esperado para esta funcionalidade?

Imediato

O que definitivamente NÃO está no escopo desta primeira versão?

Coisas que não foram citadas não devem ser implementadas

7. Integração

Precisa de backend para armazenar/servir os dados dos planos?

Sim, inclusive o projeto já está disponível e deve ser usado @backend

Haverá analytics para rastrear uso do slider e escolhas dos usuários?

Não
