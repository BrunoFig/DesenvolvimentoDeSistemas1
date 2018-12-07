# Aplicação Chega Mais!
Este repositório contém uma aplicação Web referente ao trabalho da disciplina de Metodologia de Desenvolvimento de Sistemas 1, para esse projeto foi decidido utilizar o conjunto `MEAN` de tecnologias ([MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/pt-br/), [AngularJS](https://angularjs.org/) e [Node.js](https://nodejs.org/en/)). O nome da aplicação é `Chega Mais!` que foi baseada no aplicativo [Airbnb](https://airbnb.com.br), onde o objetivo é criar uma aplicação semelhante porém com foco no ambiente universitário/acadêmico.

![Image of MEAN Stack](https://cdn-images-1.medium.com/max/1037/1*kkXbE9GlS73U7x1iXHP_vQ.png)

>Airbnb é um serviço online comunitário para as pessoas anunciarem, descobrirem e reservarem acomodações e meios de hospedagem. Ele permite aos indivíduos alugar o todo ou parte de sua própria casa, como uma forma de acomodação extra. O site fornece uma plataforma de busca e reservas entre a pessoa que oferece a acomodação e o turista que busca pela locação. Abrange mais de 500 mil anúncios em mais de 35.000 cidades e 192 países. Desde sua criação em Novembro de 2008 até Junho de 2012, mais de 10 milhões de reservas foram agendadas via Airbnb.
Fonte: [Airbnb Wikipedia](https://pt.wikipedia.org/wiki/Airbnb).

<br><br>

## Tecnologias e Frameworks

Abaixo está a lista de Tecnologias e Frameworks utilizados no projeto:

1. Frontend: [AngularJS](https://angularjs.org/).
2. Backend: [Node.js](https://nodejs.org/en/).
3. Extensão Node.js: [Express.js](https://expressjs.com/pt-br/).
4. Banco de Dados: [MongoDB](https://www.mongodb.com/).
4. Controle de Versão: [Git](https://git-scm.com/).
5. Hospedagem do Código Fonte: [GitHub](https://github.com/).
6. Testes de Requisições HTTP: [Postman](https://www.getpostman.com/).
7. Plataforma Cloud: [Heroku](https://www.heroku.com/).

<br><br>

## Estudo Sobre o Airbnb

Para o desenvolvimento da aplicação foi realizado um estudo sobre o [Airbnb](https://airbnb.com.br), seu modelo de negócios, as estruturas utilizadas por ele e seus casos de uso. O modelo de negócios da aplicação estudada pode ser resumida na facilitação da interação entre indivíduos que tem possuem uma acomodação disponível e aqueles de desejam uma de forma fácil, rápida e sem burocracia, esse plano é representado na imagem abaixo:

![Plano de Negócios Airbnb](https://bmtoolbox.net/wp-content/uploads/2016/06/airbnb.jpg)

Com a pesquisa realiza, foram encontrados materiais que serviram de auxílio para o planejamento e desenvolvimento do nosso projeto. Esses materiais foram um diagrama das classes utilizadas pela aplicação (similar a um diagrama UML) e um fluxograma da execução, todos estão representados abaixo respectivamente:

Diagrama de Classes:
![Diagrama de Classes](https://api.genmymodel.com/projects/_Hzs8UNK4EeaJwt5yAqWnTg/diagrams/_Hzs8UtK4EeaJwt5yAqWnTg/png?download=true)

FLuxograma:
![Fluxograma](http://pautasso.info/talks/2015/SOAMED/img/bnb-bpmn-choreo.svg)

<br><br>

## Estrutura do Projeto

O projeto está estruturado de modo que a aplicação frontend se encontra no diretório `app` enquanto os arquivos do diretório raiz fazem parte do backend. Para o backend foi criado uma API REST que irá fazer a integração do frontend com o banco de dados atraves de requisições HTTP, apesar de ser um projeto separado ela se encontra no diretório `api` para unificar os códigos fonte em um único lugar.

A aplicação frontend será desenvolvida em `AngularJS` e possui a seguinte estrutura de diretórios:

1. `css`: Diretório para os arquivos `.css` que adicionam estilos às páginas Web.
2. `js`: Diretório que contém os códigos em `Javascript` e, portanto, as funcionalidades da aplicação. Este diretório possui subdiretórios que organizam os códigos de acordo com seus componentes de `AngularJS`.
    * `controllers`.
    * `directives`. 
    * `services`.
3. `lib`: Diretório dedicado para as bibliotecas utilizadas na aplicação.
4. `view`: Diretório com os arquivos `HTML` da aplicação, ou seja, a estrutura das páginas Web.

No caso do backend o único diretório que há é o `node_modules`, que contém os módulos e pacotes utilizados no backend (ignorado ao se realizar commits e pushs).


>**NOTA:** É importante lembrar que está estrutura pode ser alterada no decorrer do projeto.

<br><br>

## Projeto

### "Classes"

A aplicação conta com 8 "classes", ou 8 coleções (MongoDB), sendo elas:

1. `Users`: o registro dos usuários da aplicação.
2. `Hosts`: o registro das residências disponívies para acomodação.
3. `Reservations`: o registro das reservas das acomodações, tanto das publicadas quanto das já ocupadas.
4. `Categories`: o registro das categorias das residências (casa, apartamento, alojamento, etc).
5. `Host Types`: o registro dos tipos de alocação (cama de solteiro, cama de casal, sofa cama, camping, etc).
6. `Items`: o registro dos itens de uma residência (televisão, número de banheiros, video games, wi-fi, piscina, etc).
7. `Cities`: o registro das cidades em que a aplicação está disponível.
8. `States` o registro dos estados em que a aplicação está disponível.

### Rodando o Projeto localmente

Para testar a aplicação localmente é necessário executar dois projetos simultaneamente, a API de integração com o banco de dados localizada no diretório `api` e o frontend que é o resto do repositório. Para executar cada um dos projetos, basta utilizar os seguintes comandos:

    npm install
    npm start

<br><br>

## Links Importantes


* [Tutorial AngularJS](https://www.youtube.com/playlist?list=PLQCmSnNFVYnTD5p2fR4EXmtlR6jQJMbPb).
* [Tutorial Node.js - Express Framework](https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm).
* [Tutorial MongoDB](https://mongodbwise.wordpress.com/2014/05/22/mongodb-guia-rapido/).
* [Mongoose Documentation](https://mongoosejs.com/docs/index.html).
* [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/).
* [Vídeo Git Flow](https://www.youtube.com/watch?v=0L1zx7l6JSc).
* Extra: [Tutorial Wab App (Node.js, Express & MongoDB)](https://closebrace.com/tutorials/2017-03-02/creating-a-simple-restful-web-app-with-nodejs-express-and-mongodb).