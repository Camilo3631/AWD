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

<script setup>
import { ref, watch, onMounted } from 'vue'

// Props y emisión
defineProps({
    modelValue: {
        type: Boolean,
        default: true  
    }
})
const emit = defineEmits(['update:modelValue'])

// Estado del toggle: true = día, false = noche
const isOn = ref(true)

// Función para cambiar tema
const toggle = () => {
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

// Observa cambios y emite a v-model
watch(() => isOn.value, (val) => emit('update:modelValue', val))

// Inicializar estado según localStorage o hora actual
onMounted(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
        if (saved === 'dark') {
            isOn.value = false
            document.body.classList.add('dark')
            document.body.classList.remove('light')
        } else {
            isOn.value = true
            document.body.classList.add('light')
            document.body.classList.remove('dark')
        }
    } else {
        // Si no hay valor guardado, usar hora actual
        const hour = new Date().getHours()
        if (hour >= 6 && hour < 18) { // Día: 6AM a 6PM
            isOn.value = true
            document.body.classList.add('light')
            document.body.classList.remove('dark')
        } else { // Noche
            isOn.value = false
            document.body.classList.add('dark')
            document.body.classList.remove('light')
        }
    }
})
</script>


