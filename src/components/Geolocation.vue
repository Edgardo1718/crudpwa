<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

const { coords, locatedAt, error, resume, pause } = useGeolocation()
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-200">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4 ">Test de GPS</h2>
    <div class="max-w-md bg-white rounded-lg overflow-hidden shadow-lg mb-8">
      <div class="p-4">
        <pre class="whitespace-pre-wrap overflow-auto bg-gray-100 p-4 rounded-lg">
          {{
            JSON.stringify(
              {
                coords: {
                  accuracy: coords.accuracy,
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  altitude: coords.altitude,
                  altitudeAccuracy: coords.altitudeAccuracy,
                  heading: coords.heading,
                  speed: coords.speed,
                },
                locatedAt,
                error: error ? error.message : error,
              },
              null,
              2,
            )
          }}
        </pre>
      </div>
    </div>

    <div class="flex justify-center space-x-4">
      <button @click="pause" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
        Pause watch
      </button>
      <button @click="resume" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
        Start watch
      </button>
    </div>
  </div>
</template>
