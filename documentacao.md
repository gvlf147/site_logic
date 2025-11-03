
Documentação de Desenvolvimento - Site Corporativo (Vite, React, TypeScript)

1. Visão Geral do Projeto

Objetivo: Desenvolver um site corporativo moderno, com foco em design limpo, experiência de usuário (UX) fluida e tecnologias atuais, servindo como cartão de visitas digital e ponto de contato para a empresa.

Tecnologias Principais:

    Build Tool/Bundler: Vite

    Framework: React

    Linguagem: TypeScript

    Estilização: (A ser definido, sugerimos Tailwind CSS ou CSS Modules com pré-processador como SASS, alinhado com o design moderno.)

    Cores Principais: Preto (#000000) e Roxo (A ser definido, ex: um tom vibrante como #510399ff - Roxo real, ou outro a ser especificado com os exemplos).

Liberdade Criativa: O desenvolvedor (Copilot) terá total liberdade criativa para implementar o design e a arquitetura, respeitando as cores base (Preto e Roxo) e as funcionalidades mínimas estabelecidas, visando o que há de "melhor e mais moderno" no desenvolvimento web atual.

2. Estrutura e Hierarquia de Páginas (MVP - Fase 1)

A estrutura inicial será baseada em rotas únicas acessíveis pelo menu de navegação, com a Landing Page sendo a Homepage.
Rota (URL Sugerida)	Nome da Página/Seção	Conteúdo Principal	Componentes Chave
/	Home (Landing Page)	Introdução, Destaque de Serviços, Prévia de Projetos, Sobre (resumo), Contato (resumo).	Header, Hero Section, Services Preview, Projects Showcase, Team Snippet, Footer.
/sobre	Sobre Nós	História, Missão, Visão, Valores da Empresa.	SectionText (com imagens/ícones).
/servicos	Serviços	Detalhamento completo dos serviços oferecidos.	Cards de Serviços, Blocos de Texto Explicativos.
/projetos	Portfólio / Galeria	Exibição completa dos projetos realizados.	Grid/Lista de Projetos com Filtros (se aplicável).
/orcamento	Solicitar Orçamento	Formulário de contato/orçamento atraente e eficiente.	Formulário Interativo, CTA (Call to Action) claro.

Estrutura de Navegação: O menu principal (Header) deverá conter links para: Home, Sobre, Serviços, Projetos, Orçamento.

3. Requisitos Funcionais Detalhados (MVP - Fase 1)

3.1. Landing Page (Home - /)

    Hero Section: Impactante, com título principal, subtítulo claro sobre a proposta de valor e um CTA principal (ex: "Ver Projetos" ou "Solicitar Orçamento"). Deve incorporar as cores Preto/Roxo de forma marcante.

    Destaque de Serviços: Uma seção que exibe um resumo dos 3-4 serviços mais importantes, com links para a página /servicos.

    Prévia de Projetos (Showcase): Exibição de 3-4 dos melhores projetos com uma chamada para a galeria completa (/projetos).

    Sobre (Snippet): Uma breve introdução à empresa (texto curto), com um CTA para a página /sobre.

    Time (Snippet): Apresentação visual do time (foto/avatar, nome, cargo) – um sneak peek que leva à seção completa na página /sobre ou uma seção dedicada na landing page.

    Contato (Snippet): Informações de contato essenciais e/ou um pequeno formulário rápido, com um CTA para a página /orcamento.

3.2. Páginas Secundárias

    Sobre Nós (/sobre): Conteúdo textual e visual completo sobre a empresa, brand story, missão, visão e valores.

    Serviços (/servicos): Lista detalhada dos serviços, cada um com uma descrição clara e, idealmente, uma seção de Perguntas Frequentes (FAQ) relacionada.

    Projetos (/projetos):

        Galeria visual (grid ou masonry layout).

        Cada item deve ter um Card com imagem de destaque, título e, opcionalmente, tags de tecnologia/serviço.

        Funcionalidade: Ao clicar, deve abrir um Modal ou levar para uma Página de Detalhes do Projeto (para maior impacto visual e descrição).

    Orçamento (/orcamento):

        Design Atraente: O formulário deve ser o ponto focal, com feedback visual claro no preenchimento (ex: validação em tempo real).

        Campos Sugeridos: Nome, E-mail, Telefone, Tipo de Serviço Desejado (dropdown/checkboxes), Descrição do Projeto.

3.3. Integrações Externas (Fase 1)

    JivoChat: Implementação do script de integração do JivoChat para suporte e atendimento em tempo real, visível em todas as páginas.

4. Requisitos de Design e UX/UI (Foco Moderno)

    Paleta de Cores: Uso do Preto como cor de fundo ou primária de contraste e o Roxo como cor de destaque (accent color) para CTAs, ícones, hover states e elementos importantes.

    Tipografia: Escolha de fontes modernas (sans-serif) que garantam boa legibilidade, especialmente em contraste com o fundo preto.

    Animações: Uso sutil de microinterações e animações (ex: scroll effects, fade-in de elementos, transições suaves) para dar a sensação de fluidez e modernidade, sem sobrecarregar a performance.

    Responsividade: O design deve ser Mobile-First, garantindo uma experiência perfeita em todos os tamanhos de tela.

    Performance: Otimização de imagens e lazy loading para garantir que o site carregue rapidamente, aproveitando a agilidade do Vite.

5. Plano de Evolução Futura (Fase 2 - Administração)

Esta seção deve ser documentada como um Escopo Futuro para desenvolvimento subsequente.

5.1. Área Administrativa (Backoffice)

Objetivo: Criar um painel seguro para gerenciamento de conteúdo, sem a necessidade de intervenção direta no código-fonte ou banco de dados.

Funcionalidades Chave do Admin:

    Autenticação Segura: Login/Logout com gerenciamento de sessões.

    Gerenciamento de Projetos (CRUD):

        Create (Criação): Formulário para cadastrar um novo projeto (Título, Descrição Detalhada, Imagens/Galeria, Tags/Categorias, Status - Rascunho/Publicado).

        Read (Visualização): Lista paginada de todos os projetos cadastrados.

        Update (Edição): Edição de todos os campos de um projeto existente.

        Delete (Exclusão): Remoção de um projeto.

    Gerenciamento de Conteúdo Estático: (Opcional inicial) Possibilidade de editar textos fixos em páginas como Sobre Nós ou textos de Call to Action importantes.

5.2. Tecnologias de Back-end e Banco de Dados (A Ser Definido)

A documentação deve prever a necessidade de um backend dedicado para a área administrativa, que será responsável por:

    Armazenar os dados dos projetos (CRUD).

    Gerenciar a autenticação dos administradores.

Sugestão: Para um MVP de backend que suporte o frontend React/TypeScript, pode-se considerar o uso de Node.js com Express ou Firebase/Supabase para prototipagem rápida e escalabilidade futura. A integração de dados será feita via APIs RESTful ou GraphQL consumidas pelo frontend React.