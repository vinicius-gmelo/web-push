const testBtn = document.getElementById('test-btn');

let pushSubscription;

const registerSW = () => {
  console.log('Registrando o SW...');
  return navigator.serviceWorker.register('/sw.js');
};

const subscribePush = (swRegistration) => {
  console.log('Inscrevendo o serviço de notificações...');
  return swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey,
  });
};

if ('serviceWorker' in navigator) {
  registerSW().then((registration) => {
    console.log('SW registrado');
    return subscribePush(registration);
  }).then((subscription) => {
    console.log('Serviço de notificações inscrito no SW');
    pushSubscription = subscription;
  });
}

testBtn.addEventListener('click', (e) => {
  fetch(
    'http://localhost:5000/subscribe',
    {
      method: 'POST',
      body: JSON.stringify(pushSubscription),
      headers: { 'content-type': 'application/json' },
    },
  )
    .then(
      (res) => {
        console.log('Notificação requisitada ao servidor');
      },
    )
    .catch(
      (err) => {
        console.error(err);
      },
    );
});
