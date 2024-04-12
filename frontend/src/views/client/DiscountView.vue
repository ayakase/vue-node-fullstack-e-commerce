<template>
    <div class="view-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                        chủ</a></li>
                <li class="breadcrumb-item">Khuyến mại</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="left-side-bar-container">
                <div class="filter-container">
                    <div
                        style="display: flex;align-items: center;justify-content: center; height: 3rem; font-size: 20px;font-weight: bold;background-color: #97CBB4;width: 100%;color: #045B48;">
                        Bộ lọc</div>
                    <div class="search-outer-container" style="width: 100%; padding: 0.5rem;">
                        <form class=" d-flex search-container" style="margin-top:.3rem;padding: 0;">
                            <input @keydown.enter.prevent="fetchTour()" v-model="searchText"
                                class="form-control me-2 search-box" type="search" placeholder="Tìm kiếm"
                                aria-label="Search">
                        </form>
                        <button @click="fetchTour()" style="margin-top:.3rem;" class=" btn btn-outline-success"><i
                                class="fas fa-search"></i></button>
                    </div>
                    <div class="checkBoxes" style="width: 100%;padding: 0.5rem;">
                        <div class="form-check">
                            <input v-model="hotFilter" class="form-check-input" type="checkbox" id="hotFilter">
                            <label class="form-check-label" for="hotFilter">
                                Tour hot
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-model="discountFilter" class="form-check-input" type="checkbox" id="discountFilter"
                                disabled>
                            <label class="form-check-label" for="discountFilter">
                                Khuyến mãi
                            </label>
                        </div>
                    </div>
                    <div class="" style="width: 100%; padding: 0.5rem;">
                        <label for="" class="form-label">Loại tour</label>
                        <select class="form-select mb-3" aria-label="Small select example" v-model="tourType">
                            <option value="" selected>Tất cả</option>
                            <option value="Ghép đoàn" selected>Ghép đoàn</option>
                            <option value="Đi riêng">Đi riêng</option>
                            <option value="Ghép đoàn / Đi riêng">Ghép đoàn/đi riêng</option>
                        </select>
                    </div>
                    <div class="" style="width: 100%; padding: 0.5rem;">
                        <label for="" class="form-label">Giá tour</label>
                        <select class="form-select mb-3" aria-label="Small select example" v-model="priceRange">
                            <option value="0" selected>Tất cả</option>
                            <option value="1" selected>Nhỏ hơn 2tr</option>
                            <option value="2">Từ 2tr đến 5tr</option>
                            <option value="3">Từ 5tr đến 8tr</option>
                            <option value="4">Trên 8tr</option>

                        </select>
                    </div>
                    <div style="width: 100%;padding-left: 0.5rem;">
                        <p>Số ngày</p>
                    </div>
                    <div class="" style="display: flex; align-items: center;gap: 0.5rem;padding: 0.5rem;width: 100%;">
                        <input v-model="minDay" min="1" max="20" class="form-control me-2" type="number">
                        <i class="fa-solid fa-arrow-right"></i>
                        <input v-model="maxDay" min="1" max="20" class="form-control me-2" type="number">
                    </div>
                    <button @click=" fetchTour()" style="color: white;" type="button" class="btn btn-success mt-4">Lọc
                        <i class="fa-solid fa-filter"></i></button>
                </div>
                <HotTours></HotTours>

            </div>
            <div class="tour-container">
                <div class="sort-container">
                    <p class="sort-text" style="font-size: larger;">Sắp xếp theo: &nbsp;<span
                            style="color: #1f8726;font-weight: bolder;">{{
                                orderLabel }}</span>
                    </p>
                    <div class="sort-types">
                        <div :class="{ 'sort-active': orderBy == 'recommend' }" class="sort-type" @click="recommend">
                            Hoàng
                            Hà
                            đề xuất</div>
                        <div :class="{ 'sort-active': orderBy == 'createdAt' }" class="sort-type" @click="newest">Mới
                            nhất</div>
                        <div :class="{ 'sort-active': orderBy == 'days' }" class="sort-type" @click="duration">Thời
                            lượng
                            tour</div>
                        <div :class="{ 'sort-active': orderBy == 'adult_price' }" class="sort-type" @click="price">Giá
                            tour</div>

                        <div v-if="sortOrder == 'DESC'" class="sort-type" @click="orderASC">Từ cao
                            đến thấp
                            &nbsp; <i class="fa-solid fa-arrow-down-wide-short"></i> </div>
                        <div v-else class="sort-type" @click="orderDESC">Từ thấp đến cao
                            &nbsp; <i class="fa-solid fa-arrow-up-wide-short"></i></div>

                    </div>
                </div>
                <TourList :tourList="tourList"></TourList>

                <v-pagination v-if="totalPage" @click="getTourbyPage" v-model="pageNumber" :length="parseInt(totalPage)"
                    :total-visible="5" prev-icon="fa-solid fa-chevron-left"
                    next-icon="fa-solid fa-chevron-right"></v-pagination>
            </div>
            <div class="right-side-bar-container">
                <CategoryList></CategoryList>
            </div>
        </div>
    </div>
</template>

<script setup>
import baseUrl from '../../connect';
import { onMounted, ref, watch } from 'vue';
import TourList from '../../components/TourList.vue';
import HotTours from '../../components/HotTours.vue';
import CategoryList from '../../components/CategoryList.vue';
const totalPage = ref()
const pageNumber = ref(1)
const tourList = ref()
const orderBy = ref("createdAt")
const orderLabel = ref("Mới nhất")
const sortOrder = ref("DESC")
const searchText = ref("")
const hotFilter = ref(false)
const discountFilter = ref(true)
const tourType = ref("")
const minDay = ref(1)
const maxDay = ref(20)
const priceRange = ref(0)
watch(minDay, (newValue, oldValue) => {
    if (newValue < 1) {
        minDay.value = 1
    }
})
watch(maxDay, (newValue, oldValue) => {
    if (newValue < 1) {
        maxDay.value = 1
    }
})
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
    orderLabel.value = 'Mới nhất'
    sortOrder.value = 'DESC'
    fetchTour()

}
function recommend() {
    orderBy.value = 'recommend'
    orderLabel.value = 'Hoàng Hà đề xuất'
    sortOrder.value = 'DESC'
    fetchTour()

}
function price() {
    orderBy.value = 'adult_price'
    sortOrder.value = 'ASC'
    orderLabel.value = 'Giá tour'
    fetchTour()

}
function duration() {
    orderBy.value = 'days'
    sortOrder.value = 'DESC'
    orderLabel.value = 'Thời lượng tour'
    fetchTour()

}
onMounted(() => {
    fetchTour()

})
function getTourbyPage() {
    fetchTour()
    window.scrollTo(0, 0);
}
function fetchTour() {
    tourList.value = null;
    baseUrl.get("/client/discount/" + orderBy.value + "/" + sortOrder.value + "/" + pageNumber.value,
        {
            params: {
                keyword: searchText.value,
                isHot: hotFilter.value,
                isDiscount: discountFilter.value,
                tourType: tourType.value,
                minDay: minDay.value,
                maxDay: maxDay.value,
                priceRange: priceRange.value
            }
        })
        .then(response => {
            tourList.value = response.data.rows
            totalPage.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
</script>
<style scoped>
.view-container {
    padding-top: 2rem;
    width: 95%;
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

.sort-container {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.sort-types {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}

.sort-type {
    background-color: #DBEBE1;
    cursor: pointer;
    text-align: center;
    padding: 0.8rem;
    border-radius: 0.5rem;

}

.sort-type:hover {
    background-color: #a3e8be;
}

.sort-active {
    background-color: #a3e8be;
}

.tour-container {
    width: 63%;
}


.left-side-bar-container {
    /* height: 50rem; */
    width: 16vw;
}

.right-side-bar-container {
    width: 14vw;
}

@media screen and (max-width: 1136px) {

    .left-side-bar-container,
    .right-side-bar-container {
        display: none;
    }

    .tour-container {
        width: 100%;
    }

    .sort-text {
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

}


.search-outer-container {
    display: flex;
}

.filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 20rem; */
    background-color: #F1FAF4;
    /* height: 50%; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding-bottom: 1rem;

}
</style>