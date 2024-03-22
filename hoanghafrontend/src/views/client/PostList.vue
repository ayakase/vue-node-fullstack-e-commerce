<template>
    <div class="domestic-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>
                <li class="breadcrumb-item">Du lịch trong nước</li>
            </ol>
        </nav>
        <!-- <h2 style="color: #ff6b00;">Du lịch trong nước</h2> -->

        <div class="section-container">
            <div class="side-bar-container">
                <div v-if="categoryList" class="category-list">
                    <div
                        style="display: flex;align-items: center; height: 3rem; padding-left: 1rem; font-size: 20px;font-weight: bold;">
                        Địa điểm &nbsp; <span style="color:#ff6b00;">HOT</span> &nbsp; trong
                        nước</div>
                    <div v-if="categoryList.Regions" v-for="region in categoryList.Regions" :key="region">
                        <div class="region-list" @click="router.push({ path: '/khu-vuc/' + region.slug })">{{ region.name }}
                        </div>
                        <div v-if="region.Locations" v-for="location in region.Locations">
                            <div class="location-list" @click="router.push({ path: '/dia-diem/' + location.slug })">{{
                                location.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="hot-tour" v-if="hotTour">
                    <h2 style="padding-left: 1rem;">Tour hot &nbsp; <i style="color: orangered;"
                            class="fa-solid fa-fire fa-bounce"></i></h2>
                    <div v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })" class="card"
                        style="border: none;">
                        <img :src=tour.thumbnail class="card-img-top" style="height: 20rem;" alt="...">
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
            <div>
                <div class="tour-container">
                    <div v-if="tourList" v-for="tour in  tourList " :key="tour" class="tour-individual">
                        <div class="image-container" @click="router.push({ path: '/bai-viet/' + tour.slug })">
                            <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                            <v-img style="height: 10rem; width: 100%;" cover class="thumbnail" :src=tour.thumbnail>
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template></v-img>
                        </div>
                        <div class="title" @click="router.push({ path: '/bai-viet' + tour.slug })"> {{
                            tour.title }}</div>

                    </div>
                    <LoadingComponent v-else />
                </div>
                <v-pagination v-if="totalPage" @click="getTourbyPage" v-model="pageNumber" :length="totalPage"
                    :total-visible="5" prev-icon="fa-solid fa-chevron-left"
                    next-icon="fa-solid fa-chevron-right"></v-pagination>
            </div>
        </div>

    </div>
</template>

<script setup>
import LoadingComponent from '../../components/LoadingComponent.vue';
import baseUrl from '../../connect';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// let posts = ref()
let totalPage = ref()
let pageNumber = ref(1)
let tourList = ref()
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
    baseUrl.get("/client/category/side-bar-list/" + 1).then(response => {
        categoryList.value = response.data
    })
})
function getTourbyPage() {
    fetchPost()
    window.scrollTo(0, 0);
}
function fetchPost() {
    tourList.value = null;
    baseUrl.get("/client/post/" + 1 + "/" + orderBy.value + "/" + sortOrder.value + "/" + pageNumber.value)
        .then(response => {
            tourList.value = response.data.rows
            // response.data.rows[0].Regions.forEach(Region => {
            //     Region.Locations.forEach(Location => {
            //         Location.Tours.forEach(Tour => {
            //             console.log(Tour)
            //             tourList.value.push(Tour)
            //         })
            //     })
            // })
            // tourList.value = response.data.rows
            totalPage.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
</script>
<style scoped>
.hot-tour {
    margin-top: 1rem;
    width: 18rem;
    background-color: #F1FAF4;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.domestic-container {
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

.tour-container {
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 4rem;
    align-content: flex-start;
    margin: auto;
    padding: auto;
}

.tour-individual {
    width: 20rem;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: #F1FAF4;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: transform 0.2s linear;
}

.tour-individual:hover {
    transform: scale(1.05);
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

.hot-tour {
    position: sticky;
    top: 0;
}

.category-list {
    background-color: #97CBB4;
    /* padding-left: 2rem; */
    width: 18rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.region-list {
    height: 2rem;
    padding-left: 1rem;
    font-size: large;
    font-weight: bold;
    background-color: #F1FAF4;
    display: flex;
    align-items: center;
}

.location-list {
    height: 2rem;
    padding-left: 1rem;
    background-color: #F1FAF4;
    display: flex;
    align-items: center;
}

.region-list:hover {
    background-color: rgb(69, 169, 147);
    cursor: pointer;
    color: white;
}

.location-list:hover {
    background-color: rgb(69, 169, 147);
    cursor: pointer;
    color: white;

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




@media screen and (max-width: 1136px) {
    .side-bar-container {
        display: none;
    }

    .tour-container {
        width: 100%;
    }

    .tour-individual {
        width: 100%;
    }

    .image-container {
        width: 100%;
        border-radius: 0.4rem;
        /* height: 10rem; */
    }


}
</style>