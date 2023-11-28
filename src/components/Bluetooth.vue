<script setup lang="ts">
import { useBluetooth } from '@vueuse/core'
const {
  isConnected,
  isSupported,
  device,
  requestDevice,
  error,
} = useBluetooth({
  acceptAllDevices: true,
})
</script>

<template>
    
    <div class="container mx-auto p-4 bg-gray-200">
        
      <div class="max-w-lg mx-auto bg-gray-200">
        
        <div class="text-center mb-4 bg-gray-200">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">Test de bluetooth</h2>
          <p :class="isSupported ? 'text-green-600' : 'text-red-600'">
            {{ isSupported ? 'Bluetooth soportado' : 'Tu navegador no soporta bluetooth' }}
          </p>
        </div>
  
        <div v-if="isSupported" class="text-center bg-gray-200">
          <button @click="requestDevice()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Ver lista de dispositivos bluetooth
          </button>
        </div>
  
        <div v-if="device" class="mt-4 bg-gray-200">
          <div class="bg-gray-100 rounded-md p-3">
            <p class="font-semibold">Device Name:</p>
            <p>{{ device.name }}</p>
          </div>
          <div v-if="isConnected" class="bg-green-500 text-white p-3 rounded-md">
      <p>Connected</p>
    </div>

    <div v-if="!isConnected" class="bg-orange-800 text-white p-3 rounded-md bg-gray-200">
      <p>Not Connected</p>
    </div>
        </div>
  
      </div>
    </div>
  </template>