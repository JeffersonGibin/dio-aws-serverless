# DIO-AWS Serverless


## Desafio

O desafio proposto pela DIO foi replicar a solução implementada pelo especialista durante as aulas, que consiste em um CRUD que salva informações no AWS DynamoDB usando AWS Lambda.


## Solução:

Foi desenvolvido uma API to-do list, onde é possível cadastrar tarefas, listar tarefas, buscar tarefas por status e alterar status de uma tarefa. A seguir você pode encontrar o contrato da API para conseguir realizar os testes.


Host: http://localhost:3000/dev

- Cadastra as tarefas: 
 - **POST**: /task
   - **Payload:** `{ "title": "Tarefa 1", "description": "Descrição da tarefa 1" }`

- Busca todas as tarefas cadastradas: 
  - **GET**: /tasks

- Busca tarefas por status: (PENDING, IN_PROGRESS ou COMPLETED)
  - **GET**: /tasks/{status}

- Altera o status de uma tarefa
- **PUT:** /task/{id}
  - **Payload:** `{ "status": "IN_PROGRESS" }`


## Tecnologias
- AWS Lambda
- AWS DynamoDB
- Node.js
- Serverless Framework
