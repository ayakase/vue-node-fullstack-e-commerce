<template>
    <div class="slider-manage-container">
        <button @click="router.push('quan-ly-slider/them-slide')" style="margin-bottom: 2rem;" class="btn btn-success">
            Thêm Slider
        </button>
        <div class="slider-list">
            <div class="slider-item" v-for="(slide, index) in slideItem" :key="index">
                <div class="slider-item-img">
                    <v-img class="slider-img" :src="slide.image_src" alt="" style="width: 100%;"></v-img>
                </div>
                <div class="slider-content">
                    <p>ID: {{ slide.id }} </p>
                    <p>Tiêu đề: {{ slide.title }}</p>
                    <p>Liên kết: {{ slide.tour_url }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import baseUrl from '../../connect';
let router = useRouter()
let slideItem = ref()
onMounted(() => {
    baseUrl.get('/admin/slider').then((response) => {
        console.log(response.data.rows)
        slideItem.value = response.data.rows
    }).catch((error) => {
        console.log(error)
    })
})
</script>

<style scoped>
.slider-manage-container {
    margin-top: 2rem;
}

.slider-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}

.slider-item {
    width: 23rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.slider-content {
    margin-top: 0.5rem;
    width: 100%;

}

.slider-item-img {
    width: 20rem;
    height: 10rem;
    overflow: hidden;
}

.slider-img {
    border-radius: 1rem;
    object-fit: cover;
}
</style>