const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:teste@teste.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

app.post('/subscribe', (req, res) => {
  res.status(201).json({});

  const subscription = req.body;
  const payload = JSON.stringify({ title: 'Teste', body: 'Teste' });

  webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

const port = 5000;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
