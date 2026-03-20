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

const toggle = async () => {
  isOn.value = !isOn.value
  if (isOn.value) {
    document.body.classList.add('light')
    document.body.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
    localStorage.setItem('theme', 'dark')
  }
}

watch(() => isOn.value, (val) => emit('update:modelValue', val))

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) isOn.value = saved === 'light'
  else isOn.value = new Date().getHours() >= 6 && new Date().getHours() < 18
})

// 🔹 Esto es clave para que TS vea isOn y toggle en tests
defineExpose({ isOn, toggle })
</script>