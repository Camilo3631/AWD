<template>
    <section class="w-full text-center flex flex-col justify-center items-center p-6">
        <h1 class="text-4xl font-bold mb-8">{{ $t('Projects') }}</h1>
       
          <!-- Grid de proyectos --> 
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            <div v-for="project in paginatedProjects" :key="project.id" class="flex">
              <div class="flex flex-col p-6 border rounded-lg shadow-md text-center min-h-[400px] mb-10 mt-12 w-full">
                <img :src="project.image" :alt="project.name" class="rounded-lg mb-4 w-full h-auto mx-auto"/>
                <h3 class="text-xl font-semibold mb-3">{{ project.name }}</h3>
                <p  class="mb-4 text-xl">{{ project.description }}</p>

                <div class="mt-auto flex justify-center items-center gap-3">
                  <!-- Botón live -->
                   <a
                   :href="project.liveLink"
                   target="_blank"
                  :class="[
                   'px-3 py-2 rounded-md transition text-xl',
                    isDay ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-black hover:bg-gray-300'
                  ]"
                   >
                 {{ t('projects.viewLive') }}
                  </a>

                  <!-- Botón GitHub -->
                  <a 
                   :href="project.gitLink"
                   target="_blank"
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
   
             <!-- Paginación solo con números -->
            <div class="flex justify-center mt-8 space-x-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 rounded transition-transform duration-200',
                   currentPage === page
                   ? 'bg-red-600 text-white hover:bg-red-700'
                   : 'bg-gray-200 hover:bg-gray-300'
                  ]"
                  >
                 {{ page  }}
              </button>
           </div>
      </section>
</template>




<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isDay = ref(true)
const projects = ref([])

let observer = null

// Generar 30 proyectos de ejemplo
for (let i = 1; i <= 30; i++) {
  projects.value.push({
    id: i,
    name: `Proyecto ${i}`,
    description: `Descripción del proyecto ${i}`,
    liveLink: 'https://example.com',
    gitLink: 'https://github.com/usuario/proyecto' + i,
    image: `https://picsum.photos/400/200?random=${i}`,
  })
}

const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() => Math.ceil(projects.value.length / perPage))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return projects.value.slice(start, end)
})

function goToPage(page) {
  currentPage.value = page
}

// Detectar tema
onMounted(() => {
  isDay.value = document.body.classList.contains('light')
  observer = new MutationObserver(() => {
    isDay.value = document.body.classList.contains('light')
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>