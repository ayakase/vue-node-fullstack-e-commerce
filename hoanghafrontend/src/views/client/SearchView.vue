<template>
    <div class="search-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>
                <li class="breadcrumb-item">Tìm kiếm</li>
            </ol>
        </nav>
        <!-- <h2 style="color: #ff6b00;">Du lịch trong nước</h2> -->
        <h3> Hiển thị kết quả cho <span style="color: #ff6b00;">{{ searchText }}</span></h3>
        <div class="section-container">
            <div class="side-bar-container">
                <!-- <div v-if="categoryList" class="category-list">
                    <div
                        style="display: flex;align-items: center; height: 3rem; padding-left: 1rem; font-size: 20px;font-weight: bold;">
                        Địa điểm &nbsp; <span style="color:#ff6b00;">HOT</span> &nbsp; trong
                        nước</div>
                    <div v-if="categoryList.Regions" v-for="region in categoryList.Regions" :key="region">
                        <div class="region-list">{{ region.name }}</div>
                        <div v-if="region.Locations" v-for="location in region.Locations">
                            <div class="location-list">{{ location.name }}</div>
                        </div>
                    </div>
                </div> -->
                <div class="hot-tour">
                    <h2 v-if="hotTour" style="padding-left: 1rem;">Tour hot</h2>
                    <div v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })" class="card"
                        style="background: none;border: none;">
                        <img :src=tour.thumbnail class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ tour.title }}</h5>
                            <p>Giá: <span style="font-weight: bold; color: #ff6b00;">{{ numeralFormat(tour.adult_price)
                            }}</span>
                                VNĐ </p>
                            <hr class="hr" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="tour-container">
                <div class="sort-container">
                    <p class="sort-text">Sắp xếp theo: </p>
                    <div class="sort-types">
                        <div class="sort-type" @click="recommend">Hoàng Hà đề xuất</div>
                        <div class="sort-type" @click="newest">Mới nhất</div>
                        <div class="sort-type" @click="duration">Thời lượng tour</div>
                        <div class="sort-type" @click="price">Giá tour</div>

                        <div v-if="sortOrder == 'DESC'" class="sort-type" @click="orderASC">Từ cao đến thấp &nbsp; <i
                                class="fa-solid fa-arrow-down-wide-short"></i> </div>
                        <div v-else class="sort-type" @click="orderDESC">Từ thấp lên cao &nbsp; <i
                                class="fa-solid fa-arrow-up-wide-short"></i></div>

                    </div>
                </div>
                <div v-if="tourList" v-for="tour in  tourList " :key="tour" class="tour-individual">
                    <div class="image-container" @click="router.push({ path: '/' + tour.slug })">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail" :src=tour.thumbnail>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <div class="tour-detail-container">
                        <div class="title" @click="router.push({ path: '/' + tour.slug })"> {{
                            tour.title }}</div>
                        <div class="below-section" style="">
                            <div class="schedule"><b>Mức độ đề xuất: </b><span style="color: orange;">{{ tour.recommend
                            }}</span>
                            </div>
                            <div class="schedule"><b>Lịch trình: </b><span style="color: orange;">{{ tour.schedule }}</span>
                            </div>
                            <div class="tourtype"><b>Loại tour: </b> <span style="color: green;">{{ tour.tourtype }} </span>
                            </div>
                            <div class="days"><b>Thời gian: </b>{{ tour.days }}N{{ tour.days - 1 }}Đ</div>
                            <div class="departure"><b>Khởi hành: </b>{{ tour.departure }}</div>
                            <div class="transportation"><b>Vận chuyển: </b>{{ tour.transportation }}</div>
                        </div>
                    </div>
                    <div class="price"><span style="font-size: x-large; color: orangered;"><b>{{
                        numeralFormat(tour.adult_price)
                    }} </b></span>
                        <span style="color: orangered; font-weight: 100;"> VNĐ</span>
                    </div>
                </div>
                <LoadingComponent v-else />
                <v-pagination v-if="totalPage" @click="getTourbyPage" v-model="pageNumber" :length="totalPage"
                    :total-visible="5" prev-icon="fa-solid fa-chevron-left"
                    next-icon="fa-solid fa-chevron-right"></v-pagination>
                <div>{{ pageNumber }}</div>
            </div>

        </div>
    </div>
</template>

<script setup>
import LoadingComponent from '../../components/LoadingComponent.vue';
import baseUrl from '../../connect';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
watch(
    () => route.params.searchText,
    (newValue, oldValue) => {
        if (newValue !== '') {
            searchText.value = newValue
            fetchTour()
        } else {
        }
    }

)
// let posts = ref()
let totalPage = ref()
let pageNumber = ref(1)
let tourList = ref()
let orderBy = ref("createdAt")
let sortOrder = ref("DESC")
let searchText = ref(route.params.searchText)
function orderASC() {
    sortOrder.value = 'ASC'
    fetchTour()

}
function orderDESC() {
    sortOrder.value = 'DESC'
    fetchTour()

}
function newest() {
    orderBy.value = 'createdAt'
    sortOrder.value = 'DESC'
    fetchTour()

}
function recommend() {
    orderBy.value = 'recommend'
    sortOrder.value = 'DESC'
    fetchTour()

}
function price() {
    orderBy.value = 'adult_price'
    sortOrder.value = 'ASC'
    fetchTour()

}
function duration() {
    orderBy.value = 'days'
    sortOrder.value = 'DESC'
    fetchTour()

}
let hotTour = ref()
const categoryList = ref()
onMounted(() => {
    fetchTour()
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
    fetchTour()
}
function fetchTour() {
    tourList.value = null;
    baseUrl.get("/client/search/" + orderBy.value + "/" + sortOrder.value + "/" + pageNumber.value, { params: { keyword: searchText.value } })
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

.search-container {
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

.outer-container {
    padding-top: 2rem;
    width: 95%;
    margin: auto;
    padding: auto;
}

.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}

.tour-detail-container {
    width: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.title {
    font-size: 22px;
    width: 100%;
    font-weight: bold;
    color: #045B48;
    cursor: pointer;
}

.title:hover {
    color: #ff6b10;
}

.tour-container {
    width: 75%;
}

.tour-individual {
    width: 100%;
    height: 15rem;

    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-direction: row;
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

.price {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 12rem;
    text-align: end;
}

.tour-section-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
}

.sort-container {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.sort-types {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.sort-type {
    background-color: #DBEBE1;
    text-align: center;
    padding: 0.8rem;
    border-radius: 0.5rem;

}

.sort-type:focus {}

.sort-type:active {
    background-color: #d1f7df;
}

.image-container {
    width: 18rem;
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


.hot-and-discount {
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 3.5rem;

}

@media screen and (max-width: 1136px) {
    .side-bar-container {
        display: none;
    }

    .tour-container {
        width: 100%;
    }

    .sort-text {
        display: none;
    }

    .transportation,
    .schedule,
    .tourtype {
        display: none;
    }

    .sort-types {
        gap: 0.2rem;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .sort-type {
        font-size: small;
        width: 48%;
    }

    .tour-individual {
        flex-direction: column;
        gap: 0.2rem;
        height: 25rem;


    }

    .image-container {
        width: 100%;
        border-radius: 0.4rem;
        /* height: 10rem; */
    }

    .hot-and-discount {}

    .original-price {
        float: right;
    }

    .days {
        width: 10rem;
        font-size: 0.9rem;
    }

    .departure {
        width: 18rem;
        font-size: 0.9rem;

    }

    .below-section {
        width: 18rem;
    }

    .tour-detail-container {
        width: 18rem;
    }

    .title {
        font-size: 1rem;
    }

    .price {
        width: 100%;
    }

    .price-container {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;

    }
}

.card:hover {
    background-color: #bce2d1;
    transform: scale(1.05);
}
</style>