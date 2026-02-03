<template>
  <section class="hero-complet text-center flex flex-col justify-center items-center min-h-[50vh]">
    <div class="container mx-auto px-4 w-full">

      <!-- Typewriter -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold flex justify-center items-center mt-5">
        <span ref="typewriter"></span>
        <span class="typewriter-cursor ml-2">&nbsp;</span>
      </h1>

      <!-- Subtítulo -->

       <p
        class="lead mb-2 italic mt-4 text-sm sm:text-base md:text-lg
               max-w-xl mx-auto text-center
               whitespace-normal md:whitespace-nowrap">
        {{ $t('heroText2') }}
      </p>

   <!-- Skills con layout corregido -->
      <ul 
        class="grid 
               grid-cols-2        /* móvil */
               sm:grid-cols-2    /* tablet */
               md:grid-cols-5     /* PC → 5 columnas → 2 filas perfectas */
               gap-2 sm:gap-3 md:gap-4
               justify-items-center 
               mb-1 mt-4 w-full">

        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">HTML</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">CSS</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">JavaScript</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Bootstrap</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Tailwind CSS</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Git</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Web Components</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Consumo de API RESTfull</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">SPA</li>
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Testing</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const typewriter = ref(null)

const texts = [ t('heroText1') ]
const typingSpeed = 100
const pauseBetweenTexts = 1500

let timeoutId = []

const  typeWriterLoop = (el, texts, speed, pause) => {
  let textIndex = 0

  const typeText = (text, i = 0) => {
    if (i < text.length) {
      el.textContent += text[i]
      timeoutId = setTimeout(() => typeText(text, i + 1), speed)
    } else {
     timeoutId = setTimeout(() => deleteText(text), pause)
    }
  }

  const  deleteText = (text, i = text.length - 1) => {
    if (i >= 0) {
      el.textContent = text.substring(0, i)
       timeoutId = setTimeout(() => deleteText(text, i - 1), speed / 2)
    } else {
      textIndex = (textIndex + 1) % texts.length
      typeText(texts[textIndex])
    }
  }

  typeText(texts[textIndex])
}

onMounted(() => {
  if (typewriter.value) {
    typeWriterLoop(typewriter.value, texts, typingSpeed, pauseBetweenTexts)
  }
})

onUnmounted(() => {
  // Limpiar todos los timeouts
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style scoped>
.typewriter-cursor {
  display: inline-block;
  width: 1ch;
  vertical-align: bottom;
  animation: blink 0.9s steps(1) infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>





