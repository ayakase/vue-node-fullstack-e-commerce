<template>
    <div class="china-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>
                <li class="breadcrumb-item">Dich vu</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="side-bar-container">
                <div class="hot-tour">
                    <h2 style="padding-left: 1rem;">Tour hot</h2>
                    <div v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })" class="card"
                        style="background: none;border: none;">
                        <img :src=tour.thumbnail class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ tour.title }}</h5>
                            <p>Giá: <span style="font-weight: bold; color: #ff6b00;">{{ numeralFormat(tour.adultprice)
                            }}</span>
                                VNĐ </p>
                            <hr class="hr" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="service-container">

                <div class="individual-service">
                    <div class="image-container" @click="router.push('/thue-xe')">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail" src='./src/assets/cars.jpg'>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <h4 class="service-name">Dich vu thue xe</h4>
                </div>
                <div class="individual-service">
                    <div class="image-container" @click="router.push('/dat-ve-may-bay')">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail"
                            src='./src/assets/plane-ticket.jpg'>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <h4 class="service-name">Dat ve may bay</h4>
                </div>
                <div class="individual-service">
                    <div class="image-container" @click="router.push('/dat-phong-khach-san')">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail" src='./src/assets/hotel.jpg'>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <h4 class="service-name">Dat phong khach san</h4>
                </div>
                <div class="individual-service">
                    <div class="image-container" @click="router.push('/dat-ve-cap-treo')">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail" src='./src/assets/cablecar.jpg'>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <h4 class="service-name">Dat ve cap treo Fansipan</h4>
                </div>
                <div class="individual-service">
                    <div class="image-container" @click="router.push('/dich-vu-ho-chieu')">
                        <!-- <img src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg"
                            style="width: 100%;" alt=""> -->
                        <v-img style="height: 100%;" cover :width="50" class="thumbnail" src='./src/assets/passport.jpg'>
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template></v-img>
                    </div>
                    <h4 class="service-name">Dich vu lam ho chieu</h4>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import baseUrl from '../../connect';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

let hotTour = ref()
const categoryList = ref()
onMounted(() => {
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

</script>
<style scoped>
.hot-tour {
    width: 16rem;
}

.china-container {
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

.title {
    font-size: 22px;
    font-weight: bold;
    color: #045B48;
    cursor: pointer;
}

.title:hover {
    color: #ff6b10;
}

.service-container {
    height: 35rem;
    width: 75%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.inner-container {
    display: flex;
    flex-direction: row;
}

.price {
    width: 12rem;
    text-align: end;
}

.service-section-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
}

.sort-container {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
}

.sort-type:active {
    background-color: #d1f7df;
}

.image-container {
    width: 18rem;
    height: 10rem;
    display: inline-block;
    cursor: pointer;
    overflow: hidden !important;
    border-radius: 0.5rem;
}

.thumbnail {
    width: 100% !important;
}

.thumbnail:hover {
    opacity: 0.6;
    filter: alpha(opacity=30);
}

.hot-tour {
    position: sticky;
    top: 0;
    height: 100%;
}

.individual-service {
    border-radius: 1rem;
    text-align: center;
    background-color: #d4e2d9;
    height: 15rem;
    padding: 1rem;
    transition: .3s ease-in-out;
}

.individual-service:hover {
    transform: scale(1.05);
}

.service-name:hover {
    cursor: pointer;
}
</style>