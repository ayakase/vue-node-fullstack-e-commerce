<template>
    <div class="post-view-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>
                <li class="breadcrumb-item">Cẩm nang / Danh sách bài đăng </li>
            </ol>
        </nav>
        <!-- <h2 style="color: #ff6b00;">Du lịch trong nước</h2> -->

        <div class="section-container">
            <div class="side-bar-container">
                <CategoryList></CategoryList>
            </div>
            <div>
                <section class="blog-area">
                    <div class="container">
                        <div class="post-container">
                            <div v-if="postList" v-for="post in  postList " :key="post" class="each-post">
                                <div class="single-blog blog-style-one">
                                    <div class="blog-image">
                                        <a><img @click="router.push('/bai-viet/' + post.slug)" class="post-thumbnail"
                                                style="cursor: pointer;" :src="post.thumbnail" alt="Blog" /></a>
                                    </div>
                                    <div class="blog-content">
                                        <h5 class="blog-title">
                                            <a style="cursor: pointer;" @click="router.push('/bai-viet/' + post.slug)">
                                                {{ post.title }}
                                            </a>
                                        </h5>
                                        <span><i class="lni lni-calendar"></i> {{
                                convertDate(post.createdAt) }}</span>
                                        <a style="cursor: pointer;" class="more"
                                            @click="router.push('/bai-viet/' + post.slug)">Chi tiết</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <v-pagination v-if="totalPage" @click="getTourbyPage" v-model="pageNumber" :length="totalPage"
                    :total-visible="5" prev-icon="fa-solid fa-chevron-left"
                    next-icon="fa-solid fa-chevron-right"></v-pagination>
            </div>
            <!-- <HotTours></HotTours> -->
        </div>
    </div>
</template>

<script setup>
import LoadingComponent from '../../components/LoadingComponent.vue';
import CategoryList from '../../components/CategoryList.vue';
import HotTours from '../../components/HotTours.vue';
import baseUrl from '../../connect';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// let posts = ref()
let totalPage = ref()
let pageNumber = ref(1)
let postList = ref()
let orderBy = ref("createdAt")
let orderLabel = ref("Mới nhất")
let sortOrder = ref("DESC")

let hotTour = ref()
const categoryList = ref()
onMounted(() => {
    fetchPost()
    baseUrl.get("/client/category/hot-sidebar")
        .then(response => {

            hotTour.value = response.data.rows
        }).catch((error) => {
            console.error(error);
        });
    // baseUrl.get("/client/category/side-bar-list/" + 1).then(response => {
    //     categoryList.value = response.data
    // })
})
function getTourbyPage() {
    fetchPost()
    window.scrollTo(0, 0);
}
function convertDate(dateTimeString) {
    const months = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const vietnameseDateTime = `Đăng ngày ${day} ${month} ${year}, lúc ${hours}:${minutes}:${seconds}`;

    return vietnameseDateTime;
}
function fetchPost() {
    postList.value = null;
    baseUrl.get("/client/post/" + 1 + "/" + orderBy.value + "/" + sortOrder.value + "/" + pageNumber.value)
        .then(response => {
            postList.value = response.data.rows
            console.log(postList.value)
            totalPage.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
</script>
<style scoped>
.post-view-container {
    padding-top: 2rem;
    width: 90%;
    margin: auto;
    padding: auto;
}

.section-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}

p {
    margin: 0 !important;
    padding: 0 !important;
}



.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}



.title {
    font-size: 22px;
    width: 100%;
    font-weight: bold;
    color: #045B48;
    cursor: pointer;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

}

.title:hover {
    color: #ff6b10;
}

.side-bar-container {
    width: 16rem;
}

.inner-container {
    display: flex;
    flex-direction: row;
}


.image-container {
    width: 100%;
    display: inline-block;
    cursor: pointer;
    overflow: hidden !important;
}

.thumbnail {
    width: 100% !important;
    transition: .3s ease-in-out;
}

.thumbnail:hover {
    opacity: 0.6;
    filter: alpha(opacity=30);
    transform: scale(1.3);
}

.hot-post {
    position: sticky;
    top: 0;
}

.card-title {
    font-size: large;
}

.card {
    transition: transform 0.1s ease-in-out;
}

.card:hover {
    background-color: #bce2d1;
    transform: scale(1.05);
}

.post-container {
    display: flex;
    flex-wrap: wrap;
}

.each-post {
    background-color: #F1FAF4;
    margin: 1rem;
    width: 20rem;
}


@media screen and (max-width: 1136px) {
    .side-bar-container {
        display: none;
    }

    .post-container {
        width: 100%;
    }

    .post-individual {
        width: 100%;
    }

    .image-container {
        width: 100%;
        border-radius: 0.4rem;
        /* height: 10rem; */
    }
}

/*===== BLOG STYLE ONE =====*/
.blog-style-one {}

.blog-style-one .blog-image {
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    position: relative;
}

.blog-style-one .blog-image .category {
    background-color: var(--primary);
    color: var(--white);
    font-size: 13px;
    position: absolute;
    border-radius: 30px;
}

.blog-style-one .blog-image img {
    width: 100%;
    -webkit-transition: all 0.2s ease-out 0s;
    -moz-transition: all 0.2s ease-out 0s;
    -ms-transition: all 0.2s ease-out 0s;
    -o-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
}

.blog-style-one .blog-image:hover img {
    -webkit-transform: rotate(1deg) scale(1.1);
    -moz-transform: rotate(1deg) scale(1.1);
    -ms-transform: rotate(1deg) scale(1.1);
    -o-transform: rotate(1deg) scale(1.1);
    transform: rotate(1deg) scale(1.1);
}

.blog-style-one .blog-content {
    padding: 10px;
    border: 1px solid var(--light-1);
    border-radius: 0 0 8px 8px;
    border-top: none;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
    .blog-style-one .blog-content {
        padding: 25px;
    }
}

@media (max-width: 767px) {
    .blog-style-one .blog-content {
        padding: 20px;
    }
}

.blog-style-one .blog-content .blog-title {
    display: block;
    margin-bottom: 10px;
}

.blog-style-one .blog-content .blog-title a {
    font-weight: 600;
    color: #045B48;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;
    line-height: 30px;
}

@media (max-width: 767px) {
    .blog-style-one .blog-content .blog-title a {
        line-height: 24px;
    }
}

.blog-style-one .blog-content .blog-title a:hover {
    color: var(--primary);
}

.blog-style-one .blog-content span {
    font-size: 14px;
    line-height: 20px;
    color: var(--dark-3);
    margin-top: 8px;
    margin-right: 12px;
    display: inline-block;
}

.blog-style-one .blog-content .text {
    color: var(--dark-3);
    margin-top: 16px;
}

.blog-style-one .blog-content .more {
    text-transform: uppercase;
    font-weight: 600;
    color: #045B48;
    margin-top: 30px;
    display: inline-block;
}

.blog-style-one .blog-content .more:hover {
    color: #ff6b10;
}

.post-thumbnail {
    height: 15rem;
    width: 10rem;
}

/*# sourceMappingURL=blog-01.css.map */
</style>