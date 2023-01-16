#!/bin/sh

chmod +x config/ports
. config/ports

(
cd backend
npm install > /dev/null
)

mkdir -p config

VAPID_KEYS_JSON="$(backend/node_modules/.bin/web-push generate-vapid-keys --json)"
VAPID_KEYS_JSON_PATH=$(pwd)/config/vapid-keys.json


echo  "${VAPID_KEYS_JSON}" > config/vapid-keys.json

printf "\n'%s' criado.\n" "${VAPID_KEYS_JSON_PATH}"

(
cd backend

printf "\nBackend: 'http://localhost:%s'.\nLog: '%s'.\n" "${BACKEND_PORT}" "$(pwd)/server.log"

if ! node index.js >> backend-server.log 2>&1; then
  printf "\nErro ao iniciar o servidor do backend. '%s':\n%s\n" "$(pwd)/server.log" "$(tail backend-server.log)"
fi
) & 

(
cd frontend

printf "\nFrontend: 'http://localhost:%s'.\nLog: '%s'.\n" "${FRONTEND_PORT}" "$(pwd)/server.log"

if ! php -S localhost:"${FRONTEND_PORT}" >> frontend-server.log 2>&1; then
  printf "\nErro ao iniciar o servidor do frontend. '%s':\n%s\n" "$(pwd)/server.log" "$(tail frontend-server.log)"
fi
) &

wait

