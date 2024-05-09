<script setup>
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
import { useRoute } from 'vue-router';
import HotTours from '../../components/HotTours.vue';
const route = useRoute();
const hotTour = ref()
let postDetail = ref()
onMounted(() => {
    baseUrl.get("client/each-post/" + route.params.slug).then(response => {
        postDetail.value = response.data[0]
    }).catch((error) => {
        console.error(error);
    });
    // baseUrl.get("/client/category/hot-sidebar")
    //     .then(response => {

    //         hotTour.value = response.data.rows
    //     }).catch((error) => {
    //         console.error(error);
    //     });
})

</script>
<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                    chủ</a></li>

            <li class="breadcrumb-item">Bài viết</li>
            <li v-if="postDetail" class="breadcrumb-item">{{ postDetail.title }} </li>

        </ol>
    </nav>
    <!-- :title="gameTitle" :description="gameDescription" :download="downloadUrl" -->
    <hr class="hr" />
    <div v-if="postDetail" class="content-container-outer">

        <div class="main-content">
            <h1 style="margin-bottom: 5rem;"> {{ postDetail.title }}</h1>
            <div v-html="postDetail.content"></div>
        </div>
        <div class="side-bar">
            <HotTours></HotTours>
        </div>
    </div>
    <LoadingComponent v-else></LoadingComponent>
    <div>
    </div>
</template>
<style scoped>
.breadcrumb {
    margin-top: 1rem;
}

.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    /* margin-top: 0rem; */
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}

.content-container-outer {
    padding-top: 1rem;
    margin: auto;
    padding: auto;
    width: 90%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
}

.hr {
    width: 100%;
}

.main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.choose-plan {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 1rem;
}

.choose-btn {
    background-color: #a4d4be;
}

.choose-btn:hover {
    background-color: #86c5a9;
}

.side-bar {
    width: 25rem;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;
}

@media screen and (max-width: 1136px) {
    /* .side-bar {
        display: none;
    } */
}
</style>
