
# VesteME - Loja Virtual e-commerce

### RESUMO/JUSTIFICATIVA

Você já pensou em como o comércio eletronico mudou as formas tradicionais de compra e venda atualmente? Um desenvolvimento que impressiona até os varejistas mais modernos do mercado e está levando os consumidores a cada vez mais passar do varejo tradicional para o comércio virtual.

O crescimento contínuo da internet Internet pôde moldar esses novos hábitos de compra online. Como todos sabemos, o e-commerce está crescendo muito mais rápido do que o varejo tradicional, visto que o cliente é apresentado a uma ampla gama de produtos com apenas alguns cliques, se sentindo motivado a fazer uma compra com base em seus interesses, predominando a simples navegação na ferramenta. 

Portanto, o presente documento visa criar uma loja online(VesteME) muito agradável, simples e confiável com todas as vantagens que um e-commerce pode oferecer,  considerando principalmente a nova situação provocada pela pandemia do coronavírus.

### OBJETIVOS

- Desenvolver uma loja online que forneça serviços de pesquisa e compra de produtos, consulta e/ou edição dos dados pessoais, consulta de frete, login no sistema, consulta de pedidos, rastreamento de transportes e a efetuação de pagamentos na compra.

## FUNCIONALIDADES

- [x] Apresentar os requisitos funcionais
- [x] Apresentar os requisitos não-funcionais
- [x] Indicar os membros da equipe
- [x] Exibir repositório e dicas que são comuns

### REQUISITOS FUNCIONAIS

- [ ] O sistema deve permitir o cadastro de um cliente.
- [ ] O sistema deve autenticar usuários.
- [ ] O sistema deve manter informações sobre os produtos.
- [ ] O sistema deve permitir que o cliente realize um pedido.
- [ ] O sistema deve permitir a alteração dos dados de um cliente.
- [ ] O sistema deve disponibilizar a efetuação de pagamento.
- [ ] O sistema deve disponibilizar o rastreamento do pedido enviado para os correios.
- [ ] O sistema deve permitir o cadastro de promoções.
- [ ] O sistema deve permitir ao cliente a consulta do frete.
- [ ] O sistema deve permitir a busca de pedidos
- [ ] Busca de produtos.
- [ ] Cancelamento de compra.

### REQUISITOS NÃO FUNCIONAIS

- Utilizar .NET CORE 3.1+
- Utilizar [EF Core](https://docs.microsoft.com/pt-br/ef/core/) para manipução de dados
- Possuir, pelo menos três, relacionamentos 1:1 (um para um)
- Possuir, pelo menos três, relacionamentos 1:N (um para muitos)
- Possuir, pelo menos um, relacionamento M:N (muito para muitos)
- Fazer um programa, em C# com Entity Framework, para realizar carga inicial dos dados
- Utilizar campos de data, numéricos e textuais


## DER DO SISTEMA

![DER](assets/DER.png)

## Membros da equipe (Até 3 pessoas. Identificar o líder)

- Maciel Conceição (líder)
- Caio Almeida
- Vinícius Oliveira

## Dicas, repositórios e materiais úteis

- https://github.com/CBSIIFSLagarto/2021_1_web2
- Documentação sobre [Diretrizes de design de estrutura] 
- [A collection of awesome **.NET CORE** libraries, tools, frameworks, and software](https://github.com/thangchung/awesome-dotnet-core)
- [A collection of awesome **.NET** libraries, tools, frameworks, and software](https://github.com/quozd/awesome-dotnet) - Referência, pois é para .NET e não .NET CORE
- Banco de dados
  - [Sqlserver e docker: um guia instantâneo](sqlserver_e_docker.md)
  - *Migrations*
    - [Visão geral](https://docs.microsoft.com/pt-br/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)
    - [Exemplo: aplicação de uma *migration*](https://docs.microsoft.com/pt-br/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-3.1)
  - Carga de dados iniciais (*seed data*)
    - [Data seeding]
    - [migrations/seeding](https://www.learnentityframeworkcore.com/migrations/seeding)
- Globalização
  - [Usar (",") como separador decimal](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420)
  - [Vários idiomas](https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/localization?view=aspnetcore-5.0)
- Tela
  - [Como filtrar por categoria](https://docs.microsoft.com/pt-br/aspnet/core/tutorials/first-mvc-app/search?view=aspnetcore-5.0)
  - [Gerenciamento de estado e sessão](https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/app-state?view=aspnetcore-5.0)

### Gerenciar seu trabalho no GitHub

O github contém várias ferramentas que permitem o gerenciamento projeto, promovendo entre outros recursos a rastreabilidade e o gerenciamento das atividades. Saiba mais nos links abaixo.

- [Gerenciar seu trabalho no GitHub](https://docs.github.com/pt/free-pro-team@latest/github/managing-your-work-on-github)
- [Closing issues using keywords](https://docs.github.com/en/enterprise/2.16/user/github/managing-your-work-on-github/closing-issues-using-keywords)
- [Vinculando uma pull request a um problema](https://docs.github.com/pt/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)
- [GitHub: How can I close the two issues with commit message?](https://stackoverflow.com/questions/60027222/github-how-can-i-close-the-two-issues-with-commit-message) 

## Prazo

Data | Descrição
:---:|:---
10/06/2021 | Definição do projeto a ser executado
??/??/???? | [Modelo implementado](https://docs.microsoft.com/pt-br/ef/core/modeling/) no EF Core
??/??/???? | Aplicação que permite a [carga incial/teste][Data seeding] do modelo implementado com EF Core
??/??/???? | Entrega de [protótipos](prototipos/prototipos.md) das principais telas do sistema proposto (e que atendam aos itens descritos no REQUISITOS NÃO FUNCIONAIS)

## Project status
Este projeto é um template para a definição da avaliação da disciplina programação web 2, do período de 2021.1 (aulas remotas), do IFS


[Diretrizes de design de estrutura]: https://docs.microsoft.com/pt-br/dotnet/standard/design-guidelines/
[Data seeding]: https://docs.microsoft.com/en-us/ef/core/modeling/data-seeding
