## Bem vindo ao repositório Trybe-Futebol-Clube! ⚽️

Este foi um projeto desenvolvido na Trybe, O TFC (Trybe Futebol Clube) é um site informativo sobre partidas e classificações de futebol!

O Front-end desse projeto ja foi provido pela Trybe, minha responsabilidade era desenvolver uma API fazendo testes de integração (E2E) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto construi o Back-end dockerizado utilizando modelagem de dados através do Sequelize.

Para desenvolver o Back-end optei por usar o paradigma da orientação a objeto (POO).

# 💡 Tecnologias utilizadas
<ul>
  <li>Docker</li>
  <li>Node</li>
  <li>Express</li>
  <li>TypeScript</li>
  <li>Mysql2</li>
  <li>Bcryptjs</li>
  <li>Chai</li>
  <li>Sequelize</li>
  <li>Jsonwebtoken</li>
</ul>


# Execute localmente:

Clone o projeto:

```
git clone git@github.com:SH-Kepler/Trybe-Futebol-Clube.git
```
Vá para o diretório do projeto:

```
cd Trybe-Futebol-Clube
```
Entre no Vs Code para verificar os arquivos usando o atalho no terminal:

```
code .
```
Abra O terminal e execute os comandos:
```
npm run compose:up -- --build
```
*Ou caso queria executar em modo de desenvolvimento
```
npm run compose:up:dev -- --build
 ```

### Depois de rodar os comandos, pode acessar a rota: http://localhost:3000/login para vizualizar o funcionamento da aplicação

<hr>

## Para fazer login utilize:

* email: user@user.com
* password: secret_user
