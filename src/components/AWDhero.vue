<template>
  <section class="hero-complet text-center flex flex-col justify-center items-center min-h-[50vh]">
    <div class="container mx-auto px-4 w-full">

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold flex justify-center items-center mt-5">
        <span ref="typewriter"></span>
        <span class="typewriter-cursor">&nbsp;</span>
      </h1>

      <p
        class="lead mb-2 italic mt-4 text-sm sm:text-base md:text-lg
               max-w-xl mx-auto text-center
               whitespace-normal md:whitespace-nowrap">
        {{ $t('heroText2') }}
      </p>

      <ul 
        class="grid 
               grid-cols-2
               sm:grid-cols-2
               md:grid-cols-5
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
        <li class="bg-gray-500 text-white px-3 py-2 rounded text-center w-full text-xl">Vue.js</li>
      </ul>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const typewriter = ref(null)

const text = computed(() => t('heroText1'))

const typingSpeed = 90
const pauseTime = 2000

let timeoutId = null

const typeWriterLoop = (el, text, speed, pause) => {
  let i = 0
  let isDeleting = false

  const type = () => {
    const currentText = text.value

    if (!isDeleting) {
      el.textContent = currentText.substring(0, i + 1)
      i++

      if (i === currentText.length) {
        isDeleting = true
        timeoutId = setTimeout(type, pause)
        return
      }
    } else {
      el.textContent = currentText.substring(0, i - 1)
      i--

      if (i === 0) {
        isDeleting = false
      }
    }

    timeoutId = setTimeout(type, isDeleting ? speed / 2 : speed)
  }

  type()
}

onMounted(() => {
  if (typewriter.value) {
    typeWriterLoop(typewriter.value, text, typingSpeed, pauseTime)
  }
})

onUnmounted(() => {
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