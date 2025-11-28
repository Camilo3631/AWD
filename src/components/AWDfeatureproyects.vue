<template>
  <section class="w-full text-center flex flex-col justify-center items-center">
    <h1 class="text-center text-4xl">
      {{ $t('feature.proyects') }}
    </h1>

    <div class="grid grd-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

      <!-- proyect 1-->
      <div class="flex">
        <div class="flex flex-col p-6 boder rounded-lg shadow-md h-full text-center">
         <img :src="imgInvierno" alt="proyecto 1" class="rounded-lg mb-4 w-full h-auto mx-auto" />
          <h3 class="text-xl font-semibold mb-2">{{ $t('projects.invierno-title') }}</h3>
          <p class="mb-4 text-xl">{{ $t('proyects.invierno.description') }}</p>
           <div class="mt-4 flex justify-center gap-3">
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
                  ? 'boder-black text-black bg-white hover:bg-gray-100'
                  : 'boder-gray-700 text-white bg-black hover:bg-gray-800'
                ]"
                 >
                {{ t('projects.viewGit') }}
              </a>
           </div>
        </div>
      </div>

        <div class="flex">
        <div class="flex flex-col p-6 boder rounded-lg shadow-md h-full text-center">
         <img :src="imgkino" alt="proyecto 1" class="rounded-lg mb-4 w-full h-auto mx-auto" />
          <h3 class="text-xl font-semibold mb-2">{{ $t('projects.kino-title') }}</h3>
          <p class="mb-4 text-xl">{{ $t('proyects.kino.description') }}</p>
           <div class="mt-4 flex justify-center gap-3">
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
                  ? 'boder-black text-black bg-white hover:bg-gray-100'
                  : 'boder-gray-700 text-white bg-black hover:bg-gray-800'
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
import { useI18n } from 'vue-i18n'

import imgInvierno from '~/assets/e-comerce-642.jpg'
import imgkino from '~/assets/Kino-642.jpg'
const { t } = useI18n()

const isDay = ref(true) // o false, o tu lógica


</script>