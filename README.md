# Notificações Push com Service Worker e Express
Exemplo de notificações push usando um Service Worker e a biblioteca [web-push](https://github.com/web-push-libs/web-push), com [Express](https://github.com/expressjs/express).
## Requerimentos
- `node`
- `php` (apenas para o servidor de testes do cliente e para setar a variável de ambiente na página inicial, o que poderia ser resolvido de outras maneiras...)
## Uso
- `cd backend; npm install`.
- Gere as chaves Vapid, com `/backend/node_modules/.bin/web-push generate-vapid-keys`, e insira as chaves em `/config/env`.
- Inicie o Express: `cd backend; npm start`.
- Inicie o servidor de testes do cliente: `cd frontend; php -S localhost:8080`.
