<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'

const currentCamera = ref<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const video = ref<HTMLVideoElement>()
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
})

watchEffect(() => {
  if (video.value)
    video.value.srcObject = stream.value!
})
</script>

<template>
  
  <div class="flex flex-col items-center gap-4 text-center bg-gray-200">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Test de camara</h2>
  <div>
    <button @click="enabled = !enabled" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {{ enabled ? 'Stop' : 'Start' }}
    </button>
  </div>

  <div>
    <div
      v-for="camera of cameras"
      :key="camera.deviceId"
      class="px-2 py-1 cursor-pointer text-black hover:text-primary"
      :class="{ 'text-primary': currentCamera === camera.deviceId }"
      @click="currentCamera = camera.deviceId"
    >
      {{ camera.label }}
    </div>
  </div>

  <div>
    <video ref="video" muted autoplay controls class="h-auto sm:h-100 w-full sm:w-auto max-w-full" />
  </div>
</div>

</template>