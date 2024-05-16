<template>
    <div style="height:25rem;display: flex;justify-content: center;align-items: center;">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'TableLoading'
}
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid;
    border-color: #559953 #0000;
    animation: l1 .2s infinite;
}

@keyframes l1 {
    to {
        transform: rotate(.5turn)
    }
}
</style>