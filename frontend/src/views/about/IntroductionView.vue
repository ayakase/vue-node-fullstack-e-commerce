<script setup>
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const target = ref(null)
const isVisible = useElementVisibility(target)
watch(isVisible, (newValue, oldValue) => {
    if (newValue === true && oldValue === false) {
        console.log("changed to true")
    }
})
</script>

<template>
    <div>
        <note class="mb-2">
            Info on the right bottom corner
        </note>
        <div ref="target">
            Target Element (scroll down)
        </div>
    </div>
</template>