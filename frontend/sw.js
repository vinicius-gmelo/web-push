console.log('SW carregado');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Notificação recebida do servidor');
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
