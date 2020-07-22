# Serviço para gerar certificados

## O que é o projeto

Este projeto é um serviço feito em nodejs com a finalidade de gerar um certificado no formato pdf baseado em um template com informações dinâmicas como o "nome", "curso" e "data".

## O que foi utilizado

Para a realização deste serviço foi utilizado alguns recursos como:

1. Node.js como interpretador de javascript

2. Postman para realizar requisições http

3. Firebase para fazer o deploy do template

4. Heroku para fazer o deploy do serviço em si

## Pacotes do node utilizados

* Express: Utilizado para criar rotas

* Handlebars: Utilizado como compilador do template com a estrutura handlebars

* Axios: Utilizado para resgatar o código html do template hospedado no firebase

* Body-Parser: Utilizado para manipular os dados inseridos dinâmicamente

* Puppeteer: Utilizado para criar o pdf a partir de um código html

* Moment: Utilizado para resgatar a hora exata da emissão do certificado

* Express-Validator: Utilizado para validar os dados que serão inseridos dinamicamente

## Como utilizar o serviço

Para utilizar o serviço você precisará ter o postman instalado e precisará de um template. Pode usar o meu se quiser: https://template-certificado.web.app/certificado

![Alt text](/imagens/template.png?raw=true "Imagem do template")

Após isso, no postman você terá que fazer uma requisição post passando os dados requeridos no template. No caso do template que disponibilizei um exemplo é este:

![Alt text](/imagens/postman.png?raw=true "Imagem do postman")

A resposta da requisição pode ser baixada clicando na opção Save Response que o postman disponibiliza.

Após isso você já poderá abrir o seu pdf gerado :)

![Alt text](/imagens/pdf-gerado.png?raw=true "Imagem do postman")