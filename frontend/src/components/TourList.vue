<template>
    <div class="tour-inner-container">
        <div v-if="tourList" v-for="tour in  props.tourList " :key="tour" class="tour-individual"
            @click="router.push({ path: '/' + tour.slug })">
            <div class="image-container">
                <v-img style="height: 100%;" cover class="thumbnail" :src=tour.thumbnail>
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template></v-img>
            </div>
            <div class="tour-detail-container">
                <div class="title"> {{
            tour.title }}</div>
                <div class="below-section" style="">
                    <div class="schedule"><b>Lịch trình: </b><span style="color: orange;">{{ tour.schedule
                            }}</span>
                    </div>
                    <div class="tourtype"><b>Loại tour: </b> <span style="color: green;">{{ tour.tourtype }}
                        </span>
                    </div>
                    <div class="tags" style="display: flex;flex-wrap: wrap;">
                        <div><b>Tags: &nbsp;</b></div>
                        <div>{{ tour.Location.Region.Category.name }}, &nbsp;</div>
                        <div>{{ tour.Location.Region.name }}, &nbsp;</div>
                        <div>{{ tour.Location.name }}</div>
                    </div>
                    <div class="days"><b>Thời gian: </b>{{ tour.days }}N{{ tour.days - 1 }}Đ</div>
                    <div class="departure"><b>Khởi hành: </b>{{ tour.departure }}</div>
                    <div class="transportation"><b>Vận chuyển: </b>{{ tour.transportation }}</div>
                </div>
                <div class="mobile-price">
                    <div class="mobile-hot-and-discount" style="display: flex; flex-direction: row; gap: 1rem;">
                        <div v-if="tour.isdiscount"><i style="color: #1f8726;"
                                class="fa-solid fa-tags fa-beat-fade "></i>
                        </div>
                        <div v-if="tour.ishottour"><i style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i>
                        </div>
                    </div>
                    <div class="mobile-price">
                        <div class="" v-if="tour.isdiscount"
                            style="text-decoration: line-through;font-size: 1.2rem;color: #1f8726;">
                            {{ numeralFormat(tour.original_price) }} VNĐ</div>
                        <span class="real-price" style="font-size: large; color: orangered;">
                            <b>{{
            numeralFormat(tour.adult_price)
        }} </b>
                            <span style="color: orangered; font-weight: 200;"> VNĐ</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="price">
                <div class="hot-and-discount">
                    <div v-if="tour.isdiscount"><i style="color: #1f8726;" class="fa-solid fa-tags fa-beat-fade "></i>
                    </div>
                    <div v-if="tour.ishottour"><i style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i>
                    </div>
                </div>
                <div class="price-container">
                    <div class="original-price" v-if="tour.isdiscount"
                        style="text-decoration: line-through;font-size: 1.2rem;color: #1f8726;">
                        {{ numeralFormat(tour.original_price) }} VNĐ</div>
                    <span class="real-price" style="font-size: x-large; color: orangered;">
                        <b>{{
            numeralFormat(tour.adult_price)
                            }} </b>
                        <span style="color: orangered; font-weight: 200;"> VNĐ</span>
                    </span>
                </div>
            </div>

        </div>
        <LoadingComponent v-else />
    </div>
</template>

<script setup>
const props = defineProps(['tourList'],)
import LoadingComponent from './LoadingComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
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

.tour-inner-container {
    width: 100%;
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
    cursor: pointer;
}

.tour-individual:hover {
    background-color: #bfead7;

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

.image-container {
    border-radius: 0.5rem;
    width: 20rem;
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

.hot-and-discount {
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 3.5rem;
}

.mobile-hot-and-discount {
    display: none;
}

.mobile-price {
    display: none;
}

@media screen and (max-width: 1136px) {

    .mobile-price {
        display: block;
    }

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
    .tourtype {
        display: none;
    }

    .departure {
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
        flex-direction: row;
        gap: 1rem;

    }

    .image-container {
        width: 400px;
    }

    .hot-and-discount {
        display: none;
    }

    .original-price {
        float: right;
    }

    .tour-detail-container {
        position: relative;
        width: 16rem;
    }

    .title {
        font-size: 1rem;
    }

    .price {
        display: none;
    }

    .price-container {
        display: none;
    }

    .tags {
        display: none !important;
    }

    .mobile-hot-and-discount {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
}
</style>