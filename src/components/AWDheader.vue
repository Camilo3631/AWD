<template>
  <header class="w-full bg-slate-900 text-gray-300 border-t border-gray-700 relative transition-colors duration-300">
    <div class="w-full p-4 flex items-center justify-between">
      <!-- Logo + navegación desktop -->
      <div class="flex items-center gap-8">
        <img src="/logo.png" alt="AWD" class="h-14 w-14" />
        <!-- Navegación desktop -->
        <nav class="hidden sm:block">
          <ul class="flex gap-6">
            <li>
              <NuxtLink to="/" class="hover:text-white transition-colors cursor-pointer">
                {{ $t('header.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/proyects" class="hover:text-white transition-colors cursor-pointer">
                {{ $t('header.poryects') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition-colors cursor-pointer">
                {{ $t('header.contac') }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Controles desktop -->
      <div class="hidden sm:flex items-center gap-4">
        <select
          v-model="currentLocale"
          @change="changeLanguage"
          class="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 text-white"
        >
          <option value="es">🇪🇸 Es</option>
          <option value="en">🇬🇧 En</option>
        </select>
        <AWDswitch v-model="isLight"/>
      </div>

      <!-- Botón menú móvil -->
      <button @click="menuOpen = !menuOpen" class="sm:hidden cursor-pointer z-50 flex flex-col justify-between w-6 h-6">
        <span class="block w-6 h-1 bg-white"></span>
        <span class="block w-6 h-1 bg-white"></span>
        <span class="block w-6 h-1 bg-white"></span>
      </button>
    </div>

    <!-- Menú móvil -->
    <nav v-show="menuOpen" class="sm:hidden absolute top-full left-0 w-44 bg-gray-700 transition-all duration-300 ease-in-out z-50">
      <ul class="flex flex-col gap-6 p-4 text-center">
        <li>
          <NuxtLink to="/" class="hover:text-white transition-colors cursor-pointer" @click="menuOpen = false">
            {{ $t('header.home') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/proyects" class="hover:text-white transition-colors cursor-pointer" @click="menuOpen = false">
            {{ $t('header.poryects') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="hover:text-white transition-colors cursor-pointer" @click="menuOpen = false">
            {{ $t('header.contac') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AWDswitch from './AWDswitch.vue'


const { setLocale } = useI18n()

const menuOpen = ref(false) // controla menú móvil
const isLight = ref(true)
const currentLocale = ref('es')

const changeLanguage = () => {
  setLocale(currentLocale.value)
  menuOpen.value = false // cierra menú móvil al cambiar idioma
}
</script>
 