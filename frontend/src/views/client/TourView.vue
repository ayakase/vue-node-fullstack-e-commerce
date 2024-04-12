<script setup>
import PlaceModal from '../../components/PlaceModal.vue'
import AdvisoryModal from '../../components/AdvisoryModal.vue';
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
import LoadingComponent from '../../components/LoadingComponent.vue';
import { useRoute } from 'vue-router';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import DesktopSplide from '../../components/DesktopSplide.vue';
import MobileSplide from '../../components/MobileSplide.vue';
const showOverlay = ref(false);
const route = useRoute();
const tourDetail = ref()
const adultPrice = ref()
const teenagerPrice = ref()
const childPrice = ref()
const infantPrice = ref()
const tourTitle = ref()
const renderVideo = ref(false)
const tourId = ref()
const tiktokUrl = ref()
const tiktokId = ref()
const pageUrl = ref()
const imageArray = ref()

let sliderItem = ref()
const options = {
    rewind: true,
    perMove: 1,
    autoplay: true,
    type: 'loop',
    lazyLoad: 'nearby',
    focus: 'center',
};
const headOption = {
    drag: 'free',
    autoplay: true,
}
function getUrl() {
    pageUrl.value = window.location.href
    var textarea = document.createElement("textarea");
    textarea.value = pageUrl.value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
const hotTour = ref()
onMounted(() => {
    // console.log(route.params.slug)
    baseUrl.get("client/each-tour/" + route.params.slug).then((response) => {
        tourDetail.value = response.data[0]
        adultPrice.value = response.data[0].adult_price
        teenagerPrice.value = response.data[0].teenager_price
        childPrice.value = response.data[0].child_price
        infantPrice.value = response.data[0].infant_price
        tourId.value = response.data[0].id
        tiktokId.value = response.data[0].tik_tok_id
        tourTitle.value = response.data[0].title
        tiktokUrl.value = 'https://www.tiktok.com/embed/' + tiktokId.value
        imageArray.value = response.data[0].images.split(',')
    }).catch((error) => {
        console.error(error);
    });
    setTimeout(() => {
        renderVideo.value = true
    }, 1000);
    baseUrl.get('/client/carousel/hottour').then((response) => {
        hotTour.value = response.data.rows
    })
})
let tabSec1 = ref()
let tabSec2 = ref()

</script>
<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fa-solid fa-house"></i> <a href="/" class="home-breadcrumb">Trang
                    chủ</a></li>

            <!-- <li v-if="tourDetail" class="breadcrumb-item">{{ tourDetail.Category.name }} </li> -->
            <li v-if="tourDetail" class="breadcrumb-item">{{ tourDetail.title }} </li>

        </ol>
    </nav>
    <PlaceModal v-if="tourDetail" :tourId="tourId" :childPrice="childPrice" :adultPrice="adultPrice"
        :teenagerPrice="teenagerPrice" :infantPrice="infantPrice" :tourTitle="tourTitle">
    </PlaceModal>
    <AdvisoryModal v-if="tourDetail" :tourId="tourId" :tourTitle="tourTitle"></AdvisoryModal>
    <hr class="hr" />
    <div v-if="tourDetail" class="content-container-outer">
        <div class="main-content">
            <h2 class="tour-title">{{ tourDetail.title }}</h2>
            <Splide class="slide-container " v-if="imageArray && imageArray[0] != ''" :options=options aria-label="">
                <SplideSlide v-for=" slide  in  imageArray " :key="slide">
                    <a>
                        <v-img class="slide-image" :src="slide"></v-img>
                    </a>
                </SplideSlide>
            </Splide>

            <v-card class="first-section"
                v-if="(tourDetail.special != 'undefined' && tourDetail.bonus != 'undefined' && tourDetail.visa != 'undefined')">
                <v-tabs class="tab-slider" v-model="tabSec1" color="white" align-tabs="start">
                    <v-tab class="each-tab" value="one" v-if="tourDetail.special != 'undefined'">Điểm khác biệt</v-tab>
                    <p class="separator"></p>
                    <v-tab class="each-tab" value="two" v-if="tourDetail.bonus != 'undefined'">Dịch vụ đi kèm</v-tab>
                    <p class="separator"></p>

                    <v-tab class="each-tab" value="three" v-if="tourDetail.visa != 'undefined'">Visa</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-window v-model="tabSec1">
                        <v-window-item value="one" v-html="tourDetail.special">
                        </v-window-item>
                        <v-window-item value="two" v-html="tourDetail.bonus">
                        </v-window-item>

                        <v-window-item value="three" v-html="tourDetail.visa">

                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>

            <v-card class="second-section"
                v-if="(tourDetail.detail != 'undefined' && tourDetail.priceservice != 'undefined' && tourDetail.guide != 'undefined')">
                <v-tabs class="tab-slider" v-model="tabSec2" color="white" align-tabs="start">
                    <v-tab class="each-tab" value="one" v-if="tourDetail.detail != 'undefined'">Lịch trình chi
                        tiết</v-tab>
                    <p class="separator"></p>
                    <v-tab class="each-tab" value="two" v-if="tourDetail.priceservice != 'undefined'">Bảng giá và dịch
                        vụ</v-tab>
                    <p class="separator"></p>

                    <v-tab class="each-tab" value="three" v-if="tourDetail.guide != 'undefined'">Lưu ý và hướng
                        dẫn</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-window v-model="tabSec2">
                        <v-window-item value="one" v-html="tourDetail.detail">
                        </v-window-item>
                        <v-window-item value="two" v-html="tourDetail.priceservice">
                        </v-window-item>
                        <v-window-item value="three" v-html="tourDetail.guide">
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
            <div><button class="btn" @click="getUrl"
                    style="height: 3rem;width: 3rem;background-color:#86c5a9;font-size: large;color: white;">
                    <i class="fa-solid fa-link"></i>
                </button>
                <p v-if="pageUrl"> Đã copy link </p>
            </div>

        </div>
        <div class="side-bar">
            <div class="place-order" v-if="tourDetail">
                <h5> {{ tourDetail.title }}</h5>
                <p>Lịch trình: <span style="color: #ff6b00;"> {{ tourDetail.schedule }}</span></p>
                <p>Loại tour: <span style="color: #ff6b00;">{{ tourDetail.tourtype }}</span></p>
                <p>Thời gian <span style="color: #ff6b00;">{{ tourDetail.days }}N{{ tourDetail.days - 1 }}Đ</span></p>
                <p>Khởi hành: <span style="color: #ff6b00;">{{ tourDetail.departure }}</span></p>
                <p>Vận chuyển: <span style="color: #ff6b00;">{{ tourDetail.transportation }}</span></p>
                <div style="height: 5rem;"></div>
                <p>Gia goc <span style="color: #ff6b00;">{{ numeralFormat(tourDetail.original_price) }}</span></p>
                <p>Giá tour: <span style="color: #ff6b00;">{{ numeralFormat(tourDetail.adult_price) }}</span></p>
                <div class="action-button">
                    <button class="btn place-btn" data-bs-toggle="modal" data-bs-target="#placeModal">Đặt tour</button>
                    <button class="btn advise-btn" data-bs-toggle="modal" data-bs-target="#advisoryModal">Tư
                        vấn</button>
                </div>
            </div>
        </div>
    </div>
    <LoadingComponent v-else></LoadingComponent>
    <div>
        <h3 style="text-align: center;"> Tour hot</h3>
        <DesktopSplide :tourList="hotTour"></DesktopSplide>
        <MobileSplide :tourList="hotTour"></MobileSplide>
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

.content-container-outer {
    padding-top: 1rem;
    margin: auto;
    padding: auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    justify-content: flex-start
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
    min-width: 200px;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;
}

.hot-tour {
    background-color: #f1faf4;
    padding-top: 1rem;
}

.card-img-top {
    width: 90%;
    margin: auto;
    padding: auto;
}

.place-order {
    font-size: large;
    background-color: #DBEBE1;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 4rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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

.slide-container {
    margin-bottom: 2rem;
}

.slide-image {
    border-radius: 1rem;
    height: 50rem;
}

.tour-title {
    text-align: center;
    font-weight: bolder;
    font-size: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.separator {
    width: 4rem;
}

@media screen and (max-width: 1214px) {
    .content-container-outer {
        width: 100%;
        flex-wrap: wrap;
    }

    .main-content {
        width: 95%;
    }

    .side-bar {
        /* display: none; */
        width: 100%;
    }


    .slide-image {
        height: 20rem;
    }

    .content-container-outer {
        width: 100%;
    }

    .separator {
        width: 0.5rem;
    }

    .first-section,
    .second-section {
        padding: 0;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .each-tab {
        padding: 0.2rem;
        height: 2.5rem;
        font-size: small;
    }

    .tour-title {
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: larger;
    }

    .breadcrumb {
        padding: 0.2rem;
    }

    .breadcrumb-item {
        font-size: 1rem;

    }
}
</style>
