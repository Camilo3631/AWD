<template>
  <footer class="w-full bg-slate-900 text-gray-300 py-8 border-t border-gray-800">
    <div class="max-w-6xl mx-auto px-4 flex flex-col gap-6">

      <!-- Fila 1: Links internos a la izquierda + Botón CV con bordes redondos a la derecha -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
        <!-- Links internos -->
        <ul class="flex flex-col sm:flex-row gap-6 text-lg font-medium">
          <li class="cursor-pointer hover:text-white transition-colors">
            <NuxtLink to="/proyects">{{ $t('footer.projects') }}</NuxtLink>
          </li>
          <li class="cursor-pointer hover:text-white transition-colors">
            <NuxtLink to="/contact">{{ $t('footer.contact') }}</NuxtLink>
          </li>
        </ul>

        <!-- Botón CV compacto y redondeado -->
        <a href="/cv2.pdf" download
           class="bg-gray-300 hover:bg-gray-400 text-lg text-black font-semibold py-2 px-1.5 rounded-md transition-colors">
          {{ $t('footer.downloadCV') }}
        </a>
      </div>

      <!-- Fila 2: Redes sociales centradas -->
      <ul class="flex justify-center gap-4 mt-2">
        <li v-for="icon in socialIcons" :key="icon.name" class="cursor-pointer">
          <a :href="icon.link" target="_blank" class="text-gray-400 hover:text-blue-500 transition-colors">
            <UIcon :name="icon.name" class="w-6 h-6"/>
          </a>
        </li>
      </ul>

      <!-- Fila 3: Derechos centrados -->
      <p class="text-lg  mt-4 text-center">
        &copy; 2025 AWD {{ $t('footer.rights') }}
      </p>

    </div>
  </footer>
</template>

<script setup>
const socialIcons = [
  { name: 'uil-github-alt', link: 'https://github.com/Camilo3631' },
  { name: 'uil-linkedin-alt', link: 'https://www.linkedin.com/authwall?trk=gf&trkInfo=AQGDwM0brdfUdgAAAZrM8MMQSDujeVnAsiLfxPjtuWBUmwZ9DFr-cVIOt0YA0W07o6UXauJl0xjb3a5LwPPWwie2vY_Viy5lxgDcmKE8piCXMw_zEA3Pc4MOesHqMMPp_Cx3CD4=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fcamilo-acosta-400572231%2F' }
]
</script>
s