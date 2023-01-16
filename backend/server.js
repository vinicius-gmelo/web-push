const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

const vapidKeys = require('../config/vapid-keys.json');

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:teste@teste.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.post('/subscribe', (req, res) => {
  res.status(201).json({});

  const subscription = req.body;
  const payload = JSON.stringify({ title: 'Teste', body: 'Teste' });

  webpush.sendNotification(subscription, payload).catch((err) => console.error(`${new Date().toUTCString()}: ${err}`));
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = process.env.BACKEND_PORT;

app.listen(port, () => console.log(`${new Date().toUTCString()}: Servidor iniciado na porta ${port}`));
