<template>
    <div class="mobile-carousel" style="width: 95%;margin: auto;">
        <Splide :options=mobileOptions aria-label="Vue Splide Example">
            <SplideSlide v-for="item in props.itemList" @click="router.push({ path: '/' + item.slug })"
                style="cursor: pointer; background-color: rgba(240, 250, 243, 0.68);padding: 1rem;border-radius: 1rem;">
                <v-img cover style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=item.thumbnail>
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
                <h5
                    style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
                    {{ item.title }}</h5>
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <div>
                        <h5 v-if="item.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
            numeralFormat(item.original_price)
        }} VNĐ</span></h5>
                        <h5><span style="color: red;">{{ numeralFormat(item.adult_price) }} VNĐ</span></h5>
                    </div>
                    <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                        <i v-if="item.ishotitem" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                        <i v-if="item.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['itemList'],)
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

onMounted(() => {
})
const mobileOptions = {
    rewind: true,
    perPage: 1,
    perMove: 1,
    autoplay: true,
};
</script>

<style scoped>
.slide {
    width: 60%;
    height: 25rem;
}

img {
    width: 30%;
}

.slide-image {
    height: 25rem;
    object-fit: cover;

}

img {
    object-fit: cover !important;
}

.splide:not(.is-overflow) .splide__list {
    justify-content: center;
}


.mobile-slide {
    display: none;
    width: 100%;
}

.mobile-slide-image {
    width: 100%;
    /* height: 10rem; */
}

.mobile-carousel {
    display: none;
}


@media screen and (max-width: 1136px) {
    .mobile-slide {
        display: block;
    }

    .home-first-section {
        display: none;
    }

    .map {
        display: none;
    }

    .home-container {
        width: 100%;
        padding-top: 0;
    }

    .carousel {
        display: none;
    }

    .mobile-carousel {
        display: block;
    }
}
</style>