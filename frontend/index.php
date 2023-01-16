<?php

$vapid_keys = json_decode(file_get_contents(__DIR__ . '/../config/vapid-keys.json'), true);
$server_address = 'http://localhost:' . getenv('BACKEND_PORT')

?>


<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Teste de Notificações Push</title>
</head>

<body>
  <h1>Teste de Notificações Push</h1>
  <button id='test-btn'>Mostrar notificação</button>
  <script>
    var vapidPublicKey = "<?= $vapid_keys['publicKey'] ?>"
    var serverAddress = "<?= $server_address ?>"
  </script>
  <script src="js/main.js" charset="utf-8"></script>
</body>

</html>
