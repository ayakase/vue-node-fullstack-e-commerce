<template>
    <div class="scroll-top">
        <button type="button" class="btn btn-success scroll-button" @click="scrollToTop"><i
                class="fa-solid fa-arrow-up"></i></button>
    </div>
</template>

<script>
export default {
    setup() {
        function scrollToTop() {
            window.scrollTo(0, this.top);
        }
        return { scrollToTop }
    }

}
</script>

<style scoped>
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 5.8rem;
}

.scroll-button {
    height: 3rem;
    width: 3rem;
    border-radius: 10rem;
    transition: transform 0.2s ease-in-out;
    z-index: 9999999999999999999 !important;
}

.scroll-button:hover {
    transform: scale(1.1);
}
</style>