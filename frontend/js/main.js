const testBtn = document.getElementById('test-btn');

let pushSubscription;

const registerSW = () => navigator.serviceWorker.register('sw.js', { scope: '/' });

const subscribePush = (reg) => reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey,
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    (async () => {

      let sw, reg;

      try {
        reg = await registerSW();
      } catch (err) {
        console.error(err);
      }

      if (!reg) return;

      if (reg.installing) {
        sw = reg.installing;
      } else if (reg.waiting) {
        sw = reg.waiting;
      } else if (reg.active) {
        sw = reg.active;
      }

      if (sw.state == "activated") {
        try {
          pushSubscription = await subscribePush(reg);
        } catch (err) {
          console.error(err);
        }
      }

      if (sw) {
        console.log('SW: ' + sw.state);
        sw.addEventListener("statechange", async (e) => {
          console.log('SW: ' + e.target.state);
          if (e.target.state == "activated") {
            try {
              pushSubscription = await subscribePush(reg);
            } catch (err) {
              console.error(err);
            }
          }
        })
      }

    })()
  });
}

testBtn.addEventListener('click', (e) => {
  if (pushSubscription) fetch(
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
