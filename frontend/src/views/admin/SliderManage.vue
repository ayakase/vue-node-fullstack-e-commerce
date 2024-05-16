<template>
    <div class="slider-manage-container">
        <button @click="router.push('quan-ly-slider/them-slide')" style="margin-bottom: 2rem;" class="btn btn-success">
            Thêm Slider
        </button>
        <div class="slider-list">
            <!-- <div class="slider-item" v-for="(slide, index) in slideItem" :key="index">
                <div class="slider-item-img">
                    <button @click="deleteSlide(slide.id)" type="button" class="btn btn-danger delete-btn"><i
                            class="fa-solid fa-xmark"></i></button>
                    <v-img class="slider-img" :src="slide.image_src" alt="" style="width: 100%;"></v-img>
                </div>
                <div class="slider-content">
                    <p>ID: </p>
                    <p>Tiêu đề:</p>
                    <p></p>
                </div>
            </div> -->
            <v-card class="" style="width: 25rem;position: relative;" v-for="(slide, index) in slideItem" :key="index">
                <v-img class="align-end text-white" height="" :src="slide.image_src" cover>
                </v-img>
                <v-card-title> {{ slide.title }}</v-card-title>
                <v-card-subtitle class="">
                    ID: {{ slide.id }}
                </v-card-subtitle>
                <v-card-text>
                    <div>Liên kết: {{ slide.tour_url }}</div>
                </v-card-text>
                <button @click="deleteSlide(slide.id)" type="button" class="btn btn-danger delete-btn"><i
                        class="fa-solid fa-xmark"></i></button>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import baseUrl from '../../connect';
let router = useRouter()
let slideItem = ref()
function deleteSlide(id) {
    let text = "Bạn có chắc chắn muốn xóa slider " + id;
    if (confirm(text) == true) {
        baseUrl.delete('/admin/slider/' + id).then((response) => {
            getSlider()
        }).catch((error) => {
            console.error(error)
        })
    }
}
function getSlider() {
    baseUrl.get('/admin/slider').then((response) => {
        slideItem.value = response.data.rows
    }).catch((error) => {
        console.log(error)
    })
}
onMounted(() => {
    getSlider()
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
    position: relative;
}

.slider-img {

    border-radius: 1rem;
    object-fit: cover;
}

.delete-btn {
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    border-radius: 100%;
}
</style>