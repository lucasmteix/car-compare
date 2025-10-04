# CarCompare

**CarCompare** é uma aplicação web para comparar especificações de diferentes modelos de carros. O objetivo é permitir que usuários visualizem informações como potência, torque, peso, tipo de tração, velocidade máxima e categoria, além de possibilitar futuras comparações e análises de consumo/gastos mensais.

## Backend

O backend é construído com **Node.js e Express** e fornece uma API simples para retornar informações de carros.  
Atualmente, os dados estão **hardcoded** (armazenados diretamente em um array em memória), mas futuramente serão integrados a um banco MySQL.

### Rotas disponíveis

- `GET /cars` → retorna a lista completa de carros.  
- `GET /cars/:id` → retorna os detalhes de um carro específico pelo `id`.