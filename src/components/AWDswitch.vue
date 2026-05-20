<template>
  <div class="flex items-center space-x-2">
    <button 
      @click="toggle"
      class="w-16 h-8 rounded-full relative flex items-center justify-between px-1 transition-colors duration-300"
    >
      <!-- Mostrar sol o luna según isOn -->
      <span class="text-sm font-bold" v-if="isOn">☀️</span>
      <span class="text-sm font-bold" v-else>🌙</span>

      <!-- Circle -->
      <span 
        :class="[
             'absolute top-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300',
          isOn ? 'left-1' : 'right-1'
        ]"
      ></span>
    </button>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

defineProps({
  modelValue: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])

const isOn = ref(true)

const applyTheme =  (theme: 'light' | 'dark') => {
   document.body.classList.toggle('light', theme === 'light')
   document.body.classList.toggle('dark', theme === 'dark')
}


const toggle = () => {
     isOn.value = !isOn.value

     const theme = isOn.value ? 'light'  : 'dark'
     applyTheme(theme)
     localStorage.setItem('theme', theme)
}


watch(() => isOn.value, (val) => emit('update:modelValue', val))

onMounted(() => {
  const saved = localStorage.getItem('theme')

  const theme = 
    saved ||
    (new Date().getHours() >= 6 && new Date().getHours() < 18
     ? 'light'
     : 'dark')

     isOn.value = theme === 'light'

     applyTheme(theme as 'light' | 'dark')

})

defineExpose({ isOn, toggle })
</script>