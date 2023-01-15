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
    var vapidPublicKey = "<?php echo getenv('VAPID_PUBLIC_KEY'); ?>"
  </script>
  <script src="js/main.js" charset="utf-8"></script>
</body>

</html>
