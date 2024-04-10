<template>
    <div class="hot-tour" v-if="hotTour">
        <div
            style="display: flex;align-items: center;justify-content: center; height: 3rem; font-size: 20px;font-weight: bold;background-color: #97CBB4;width: 100%;color: #045B48;">
            Tour hot &nbsp; <i style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i></div>
        <div style="padding: 0.5rem; display: flex;flex-direction: column;gap: 0.5rem;">
            <div v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })" class="card"
                style="border: none;">
                <img :src=tour.thumbnail class="card-img-top" style="" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ tour.title }}</h5>
                    <p>Giá: <span style="font-weight: bold; color: #ff6b00;">{{ numeralFormat(tour.adult_price)
                            }}</span>
                        VNĐ </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import baseUrl from '../connect';
const hotTour = ref()

onMounted(() => {
    baseUrl.get("/client/hottour/hot-sidebar")
        .then(response => {
            hotTour.value = response.data.rows
        }).catch((error) => {
            console.error(error);
        });
})
</script>

<style scoped>
.hot-tour {
    margin-top: 1rem;
    /* width: 100; */
    background-color: #F1FAF4;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.card-img-top {
    height: 12rem;
}
</style>