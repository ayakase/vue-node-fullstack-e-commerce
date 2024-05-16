<script setup>
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
import { useRoute } from 'vue-router';
import HotTours from '../../components/HotTours.vue';
import CategoryList from '../../components/CategoryList.vue';
const route = useRoute();
const hotTour = ref()
let postDetail = ref()
import DesktopSplide from '../../components/DesktopSplide.vue';
import MobileSplide from '../../components/MobileSplide.vue';
let postArray = ref()
onMounted(() => {
    baseUrl.get("client/each-post/" + route.params.slug).then(response => {
        postDetail.value = response.data[0]
    }).catch((error) => {
        console.error(error);
    });
    baseUrl.get('/client/carousel/posts').then((response) => {
        postArray.value = response.data.rows
    })
})

</script>
<template>
    <div class="post-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>

                <li class="breadcrumb-item">Bài viết</li>
                <li v-if="postDetail" class="breadcrumb-item">{{ postDetail.title }} </li>

            </ol>
        </nav>
        <hr class="hr" />
        <div v-if="postDetail" class="content-container-outer">
            <div class="left-side-bar">
                <CategoryList style="position: sticky;top: 5rem;"></CategoryList>
            </div>
            <div class="main-content">
                <h1 style="margin-bottom: 5rem;"> {{ postDetail.title }}</h1>
                <div v-html="postDetail.content"></div>

            </div>
            <div class="right-side-bar">
                <HotTours style="position: sticky;top: 5rem;"></HotTours>
            </div>
        </div>
        <DesktopSplide :itemList="postArray"></DesktopSplide>
        <MobileSplide :itemList="postArray"></MobileSplide>
        <!-- <LoadingComponent v-else></LoadingComponent> -->
        <div>
        </div>
    </div>
</template>
<style scoped>
.post-container {
    width: 90%;
    margin: auto;

}



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
    /* width: ; */
    /* overflow: hidden; */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
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

.left-side-bar,
.right-side-bar {
    width: 25rem;
    box-sizing: border-box;
    /* height: 100vh; */
    padding: 1rem;
    /* position: sticky;
    top: 0; */
    border-radius: 1rem;
}

@media screen and (max-width: 1136px) {

    /* .right-side-bar {
        display: none;
    } */
    .left-side-bar,
    .right-side-bar {
        display: none;
    }

    .main-content {
        width: 100%;
    }

    :deep(img) {
        width: 100%;
        object-fit: contain;
    }
}
</style>
