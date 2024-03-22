<script setup >
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
import { useRoute } from 'vue-router';
const route = useRoute();
const hotTour = ref()
let postDetail = ref()
onMounted(() => {
    baseUrl.get("client/each-post/" + route.params.slug).then(response => {
        postDetail.value = response.data[0]
    }).catch((error) => {
        console.error(error);
    });
    baseUrl.get("/client/category/hot-sidebar")
        .then(response => {

            hotTour.value = response.data.rows
        }).catch((error) => {
            console.error(error);
        });
})

</script>
<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                    chủ</a></li>

            <li class="breadcrumb-item">Cam nang</li>
            <li v-if="postDetail" class="breadcrumb-item">{{ postDetail.title }} </li>

        </ol>
    </nav>
    <!-- :title="gameTitle" :description="gameDescription" :download="downloadUrl" -->
    <hr class="hr" />
    <div v-if="postDetail" class="content-container-outer">

        <div class="main-content">
            <h2 style="margin-bottom: 2rem;"> {{ postDetail.title }}</h2>
            <div v-html="postDetail.content"></div>
        </div>
        <div class="side-bar">
            <div class="hot-tour" v-if="hotTour">
                <h2 style="padding-left: 1rem;">Tour hot &nbsp; <i style="color: orangered;"
                        class="fa-solid fa-fire fa-bounce"></i></h2>
                <div v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })" class="card"
                    style="border: none;">
                    <img :src=tour.thumbnail class="card-img-top" style="height: 10rem;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ tour.title }}</h5>
                        <p>Giá: <span style="font-weight: bold; color: #ff6b00;">{{ numeralFormat(tour.adult_price)
                        }}</span>
                            VNĐ </p>
                        <!-- <hr class="hr" /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingComponent v-else></LoadingComponent>
    <div>
    </div>
</template>
<style scoped>
.breadcrumb {
    margin-top: 2rem;
    padding-left: 5rem;
}

.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}

.content-container-outer {
    padding-top: 1rem;
    margin: auto;
    padding: auto;
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
}

.first-section {
    background-color: #DBEBE1;
    padding: 2rem;
    box-sizing: border-box;
}

.second-section {
    margin-top: 4rem;
    background-color: #DBEBE1;
    padding: 2rem;
    box-sizing: border-box;
}

.tab-slider {
    width: 100%;
}

.each-tab {
    background-color: #97CBB4;
    padding: left 1rem;
    padding-right: 1rem;
}

.hr {
    width: 100%;
}

.main-content {
    width: 75%;
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
    position: sticky;
    top: 0rem;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;
}


.card-img-top {
    width: 90%;
    margin: auto;
    padding: auto;
}

.place-order {
    /* height: 20rem; */
    background-color: #DBEBE1;
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid rgb(138, 138, 138);
    margin-bottom: 4rem;
}

.action-button {
    display: flex;
    justify-content: space-around;
}

.place-btn {
    background-color: #97CBB4;
    width: 6rem;
}

.place-btn:hover {
    background-color: #7fb89e;
    width: 6rem;
}

.advise-btn {
    background-color: #FF6B00;
    width: 6rem;
    color: white;
}

.iframe_container {
    left: 0;
    /* width: 100%; */
    height: 50rem;
    position: relative;

}

.iframe {
    top: 0;
    left: 0;
    /* width: 100%; */
    height: 100%;
    position: absolute;
    border: 0;
}

.gallery {
    --s: 150px;
    /* control the size */
    --g: 10px;
    /* control the gap */
    --f: 1.5;
    /* control the scale factor */

    display: grid;
    gap: var(--g);
    width: calc(3*var(--s) + 2*var(--g));
    aspect-ratio: 1;
    grid-template-columns: repeat(3, auto);
}

.gallery>img {
    width: 0;
    height: 0;
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    cursor: pointer;
    filter: grayscale(80%);
    transition: .35s linear;
}

.gallery img:hover {
    filter: grayscale(0);
    width: calc(var(--s)*var(--f));
    height: calc(var(--s)*var(--f));
}

.hot-tour {
    margin-top: 1rem;
    width: 100%;
    background-color: #F1FAF4;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.card:hover {
    background-color: #bce2d1;
    transform: scale(1.05);
}
</style>
