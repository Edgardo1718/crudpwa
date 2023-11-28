<script setup>
import TopNavbar from './components/TopNavbar.vue';
import MainList from './components/MainList.vue';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { useBluetooth } from '@vueuse/core'
import { useGeolocation } from '@vueuse/core'
import CameraUse from "./components/CameraUse.vue"
import Bluetooth from "./components/Bluetooth.vue"
import Geolocation from "./components/Geolocation.vue"
var currentTokenKey="";

const {
  isSupported,
  isConnected,
  device,
  requestDevice,
  server,
} = useBluetooth({
  acceptAllDevices: true,
})

const { coords, locatedAt, error, resume, pause } = useGeolocation()

const firebaseConfig = {
  apiKey: "AIzaSyAfxtPDL3nQKEKShSlCEWxmNfoIRSt3Pog",
  authDomain: "crudpwa-4440c.firebaseapp.com",
  databaseURL: "https://crudpwa-4440c-default-rtdb.firebaseio.com/",
  projectId: "crudpwa-4440c",
  storageBucket: "crudpwa-4440c.appspot.com",
  messagingSenderId: "908649241800",
  appId: "1:908649241800:web:8520f9a97dab2ebc19d9fd"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const recibirNotificacion = (payload) => {
  console.log('Notificación recibida:', payload.notification);
  Notification.requestPermission().then(perm => {
    if(perm==="granted" ){
      const notification=new Notification(payload.notification.title,
      {body: payload.notification.body,
      data: {hello:"world"},
    })
    notification.addEventListener("close", e =>{
      console.log(e)
    })
    }
  })
};

getToken(messaging)
  .then((currentToken) => {
    if (currentToken) {
      console.log('Token de registro:', currentToken);
      currentTokenKey=currentToken
  
    } else {
      console.log('No se pudo obtener el token de registro. Asegúrate de estar conectado a Internet.');
    }
  })
  .catch((err) => {
    console.error('Error al obtener el token de registro:', err);
  });

onMessage(messaging, (payload) => {
  console.log('Mensaje recibido mientras la aplicación está en primer plano:', payload);
  recibirNotificacion(payload);
  
});

function mostrarKey(){
  Notification.requestPermission().then(perm=>{
    alert(currentTokenKey)
  })
}

function notification(){
  Notification.requestPermission().then(perm => {
    if(perm==="granted" ){
      const notification=new Notification("Example notification",
      {body: "This is more text",
      data: {hello:"world"},
    })
    notification.addEventListener("close", e =>{
      console.log(e)
    })
    }
  })
}

</script>



<template>
  
  <MainList />
  
   
  <div class="flex flex-col items-center bg-gray-200">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">Test de notificaciones</h2>
    <button class="mb-10 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            @click="notification()">
      Enviar notificación localmente
    </button>
  </div>
  
  <CameraUse/>
  <Bluetooth/>
  <Geolocation/>
  
</template>
