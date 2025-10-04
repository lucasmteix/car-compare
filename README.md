# CarCompare

**CarCompare** é uma aplicação web para comparar especificações de diferentes modelos de carros. O objetivo é permitir que usuários visualizem informações como potência, torque, peso, tipo de tração, velocidade máxima e categoria, além de possibilitar futuras comparações e análises de consumo/gastos mensais.

## Backend

O backend é construído com **Node.js e Express** e fornece uma API simples para retornar informações de carros.  
Atualmente, os dados estão **hardcoded** (armazenados diretamente em um array em memória), mas futuramente serão integrados a um banco MySQL.

### Rotas disponíveis

- `GET /cars` → retorna a lista completa de carros.  
- `GET /cars/:id` → retorna os detalhes de um carro específico pelo `id`.

## Frontend (Docker Temporário)

O frontend é construído com **React** utilizando **Create React App (CRA)**.  
Atualmente, existe uma forma temporária de rodar apenas o frontend usando Docker, **sem precisar instalar Node, npm ou dependências localmente**.  
Futuramente, todo o projeto será executado com **Docker Compose**, integrando frontend, backend e banco de dados.

### Como rodar o frontend via Docker

1. Navegue até a pasta `frontend`:

```bash
cd frontend
```

2. Construa a imagem Docker

```bash
docker build -t car-catalog-frontend .
```

3. Excute o container:

```bash
docker run -p 3000:80 car-catalog-frontend
```

4. Abra o navegador e acesse:

http://localhost:3000

>⚠️ Observação: Esta é uma solução temporária para testar o frontend
> isoladamente. Mais tarde, toda a aplicação será executada com Docker Compose para rodar frontend, backend e banco MySQL integrados.