<template>
    <section class="w-full text-center flex flex-col justify-center items-center">
      <h1 class="text-center text-4xl">
        {{ $t('feature.proyects') }}
      </h1> 

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

        <!-- proyect 1-->
        <div class="flex">
          <div class="flex flex-col p-6 border rounded-lg shadow-md text-center  min-h-[400px] mb-10 mt-12">
          <img :src="imgInvierno" alt="proyecto 1" class="rounded-lg mb-4 w-full h-auto mx-auto" />
            <h3 class="text-xl font-semibold mb-3">{{ $t('projects.invierno-title') }}</h3>
            <p class="mb-4 text-xl">{{ $t('proyects.invierno.description') }}</p>
            <div class="mt-auto flex justify-center items-center gap-3">
              <!-- Botón Live -->
              <a href="https://invierno-shop.vercel.app/" target="_blank" 
              :class="[
                'px-3 py-2 rounded-md transition text-xl',
                isDay 
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
                ]"
              >    
              {{ t('projects.viewLive') }}   
              </a>   
              <!-- Botón GitHub -->
              <a href="https://github.com/Camilo3631/invierno-shop" target="_blank"
              :class="[
                  'px-3 py-2 rounded-md transition text-xl',
                  isDay
                    ? 'border-black text-black bg-white hover:bg-gray-100'
                    : 'border-gray-700 text-white bg-black hover:bg-gray-800'
                  ]"
                  >
                  {{ t('projects.viewGit') }}
                </a>
            </div>
          </div>
        </div>

          <div class="flex">
          <div class="flex flex-col p-6 border rounded-lg shadow-md text-center min-h-[400px] mb-10 mt-12">
          <img :src="imgkino" alt="proyecto 2" class="rounded-lg mb-4 w-full h-auto mx-auto" />
            <h3 class="text-xl font-semibold mb-3">{{ $t('projects.kino-title') }}</h3>
            <p class="mb-4 text-xl">{{ $t('proyects.kino.description') }}</p>
            <div class="mt-auto flex justify-center items-center gap-3">
              <!-- Botón Live -->
              <a href="https://kino-live-start.vercel.app/" target="_blank" 
              :class="[
                'px-3 py-2 rounded-md transition text-xl',
                isDay 
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
                ]"
              >    
              {{ t('projects.viewLive') }}   
              </a>   
              <!-- Botón GitHub -->
              <a href="https://github.com/Camilo3631/KinoLiveStart" target="_blank"
              :class="[
                  'px-3 py-2 rounded-md transition text-xl',
                  isDay
                    ? 'border-black text-black bg-white hover:bg-gray-100'
                    : 'border-gray-700 text-white bg-black hover:bg-gray-800'
                  ]"
                  >
                  {{ t('projects.viewGit') }}
                </a>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

import imgInvierno from '@/assets/e-comerce-642.jpg'
import imgkino from '@/assets/Kino-642.jpg'

  const { t } = useI18n()
  const isDay = ref(true)

  // Observer declarado fuera para poder desconectarlo
  let observer = null

  onMounted(() => {
    // Verificar tema al cargar
    isDay.value = document.body.classList.contains('light')

    // Observar cambios en el <body>
    observer = new MutationObserver(() => {
      isDay.value = document.body.classList.contains('light')
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
  })

  onUnmounted(() => {
    // Limpiar observer al desmontar
    if (observer) observer.disconnect()

    
  })
</script>