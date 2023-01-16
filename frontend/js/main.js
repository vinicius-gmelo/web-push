const testBtn = document.getElementById('test-btn');

let pushSubscription;

const registerSW = () => navigator.serviceWorker.register('/sw.js');

const subscribePush = (reg) => reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey,
});

if ('serviceWorker' in navigator) {
  registerSW().then((reg) => {
    if (reg.installing) {
      sw = reg.installing;
    } else if (reg.waiting) {
      sw = reg.waiting;
    } else if (reg.active) {
      sw = reg.active;
    }
    if (sw) {
      console.log('SW: ' + sw.state);
      sw.addEventListener("statechange", (e) => {
        console.log('SW: ' + e.target.state);
        if (e.target.state == "activated") return subscribePush(reg);
      });
    }
  }).then((subs) => {
    pushSubscription = subs;
  });
}

testBtn.addEventListener('click', (e) => {
  fetch(
    `${serverAddress}/subscribe`,
    {
      method: 'POST',
      body: JSON.stringify(pushSubscription),
      headers: { 'content-type': 'application/json' },
    },
  )
    .catch(
      (err) => {
        console.error(err);
      },
    );
});
