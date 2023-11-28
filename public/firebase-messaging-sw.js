importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAfxtPDL3nQKEKShSlCEWxmNfoIRSt3Pog",
    authDomain: "crudpwa-4440c.firebaseapp.com",
    databaseURL: "https://crudpwa-4440c-default-rtdb.firebaseio.com/",
    projectId: "crudpwa-4440c",
    storageBucket: "crudpwa-4440c.appspot.com",
    messagingSenderId: "908649241800",
    appId: "1:908649241800:web:8520f9a97dab2ebc19d9fd"
  };

 

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// Configura el service worker para recibir notificaciones en primer plano
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación recibida en el service worker:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});