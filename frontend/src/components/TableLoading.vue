<template>
    <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'TableLoading'
}
</script>

<style scoped>
.lds-facebook {
    /* display: inline-block; */
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30rem;
}

.lds-facebook div {
    left: 8px;
    width: 16px;
    background: #198754;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
}

@keyframes lds-facebook {
    0% {
        top: 8px;
        height: 64px;
    }

    50%,
    100% {
        top: 24px;
        height: 32px;
    }
}
</style>