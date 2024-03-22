<template>
  <div class="home-container">
    <div class="mobile-slide">
      <Splide :options=headOption aria-label="">
        <SplideSlide v-for="slide in sliderItem" :key="slide">
          <a :href="slide.tour_url">
            <v-img class="mobile-slide-image" :src="slide.image_src"></v-img>
          </a>
        </SplideSlide>
      </Splide>
    </div>
    <div class="home-first-section" style="margin-bottom: 5rem;">
      <div class="travel-category">
        <div class="travel-category-item" @click="router.push('/danh-muc/du-lich-trong-nuoc')">
          <h5>Du lịch trong nước</h5> <i class="fa-solid fa-chevron-right"></i>

        </div>
        <div class="travel-category-item" @click="router.push('/dia-diem/du-lich-trung-quoc')">
          <h5>Du lịch Trung Quốc </h5><i class=" fa-solid fa-chevron-right"></i>
        </div>
        <div class="travel-category-item" @click="router.push('/danh-muc/du-lich-quoc-te')">
          <h5>Du lịch quốc tế </h5><i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="travel-category-item" @click="router.push('/cam-nang')">
          <h5>Cẩm nang </h5><i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="travel-category-item" @click="router.push('/tour-khuyen-mai')">
          <h5>Khuyến mãi</h5> <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div class="slide">
        <Splide :options=headOption aria-label="">
          <SplideSlide v-for="slide in sliderItem" :key="slide">
            <a :href="slide.tour_url">
              <v-img class="slide-image" style=" border-radius: 1rem;" :src="slide.image_src"></v-img>
            </a>
          </SplideSlide>
        </Splide>
      </div>
      <div class="extended-category">
        <div class="extent-item" @click="router.push({ path: '/tim-kiem/Hà Khẩu' })">
          <h5>Hà Khẩu</h5>
        </div>
        <div class="extent-item">
          <h5>DV Visa</h5>
        </div>
        <div class="extent-item">
          <h5>KS / Dịch vụ</h5>
        </div>
      </div>
    </div>
    <div v-if="hotTour" style="width: 100%;margin: auto;padding: auto;padding-bottom: 2rem;">
      <h2 class="section-title" @click="router.push('/tour-hot')">Hot Tour
        &nbsp; <i class="fa-solid fa-fire fa-bounce" style="color: #ff6600;"></i>&nbsp;
      </h2>

      <div class="carousel" style="width: 95%;margin: auto;">
        <Splide :options=options aria-label="Vue Splide Example">
          <SplideSlide class="slide-item" v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div class="mobile-carousel" style="width: 95%;margin: auto;">
        <Splide :options=mobileOptions aria-label="Vue Splide Example">
          <SplideSlide class="slide-item" v-for="tour in hotTour" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>

    <HeartLoading v-else> </HeartLoading>

    <div v-if="china"
      style="width: 100%;margin-top: 5rem;margin: auto;padding: auto;padding-bottom: 2rem;padding-top: 1rem;">
      <h2 class="section-title" @click="router.push('/dia-diem/du-lich-trung-quoc')">Du lịch Trung Quốc &nbsp; <i
          class="fa-solid fa-vihara"></i>&nbsp;

      </h2>
      <div class="carousel" style="width: 95%;margin: auto;">
        <Splide :options=options aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in china" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div class="mobile-carousel" style="width: 95%;margin: auto;">
        <Splide :options=mobileOptions aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in china" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
    <HeartLoading v-else> </HeartLoading>
    <div v-if="domestic"
      style="width: 100%;margin-top: 5rem;margin: auto;padding: auto;padding-bottom: 2rem;padding-top: 1rem;">
      <h2 class="section-title" @click="router.push('/danh-muc/du-lich-trong-nuoc')">Du lịch trong nước &nbsp; <i
          class="fa-solid fa-flag"></i>&nbsp;

      </h2>
      <div class="carousel" style="width: 95%;margin: auto;">
        <Splide :options=options aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in domestic" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div class="mobile-carousel" style="width: 95%;margin: auto;">
        <Splide :options=mobileOptions aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in domestic" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
    <HeartLoading v-else> </HeartLoading>

    <div v-if="foreign"
      style="width: 100%;margin-top: 5rem;margin: auto;padding: auto;padding-bottom: 2rem;padding-top: 1rem;">
      <h2 class="section-title" @click="router.push('/danh-muc/du-lich-quoc-te')">Du lịch quốc tế &nbsp; <i
          class="fa-solid fa-globe"></i>&nbsp;

      </h2>
      <div class="carousel" style="width: 95%;margin: auto;">
        <Splide :options=options aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in foreign" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div class="mobile-carousel" style="width: 95%;margin: auto;">
        <Splide :options=mobileOptions aria-label="Vue Splide Example">
          <SplideSlide v-for="tour in foreign" @click="router.push({ path: '/' + tour.slug })"
            style="cursor: pointer; background-color: #f1faf4;padding: 1rem;border-radius: 1rem;">
            <v-img style=" border-radius: 0.5rem; height: 12rem;width: 100%;" :src=tour.thumbnail>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
            <h5
              style="width: 90%;padding-top: 0.8rem; white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">
              {{ tour.title }}</h5>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
              <div>
                <h5 v-if="tour.isdiscount"><span style="color: orange;text-decoration: line-through;">{{
                  numeralFormat(tour.original_price)
                }} VNĐ</span></h5>
                <h5><span style="color: red;">{{ numeralFormat(tour.adult_price) }} VNĐ</span></h5>
              </div>
              <div style="display: flex;gap: 0.7rem;font-size: 1.5rem;">
                <i v-if="tour.ishottour" class="fa-solid fa-fire" style="color: #ff6600;"></i>
                <i v-if="tour.isdiscount" class="fa-solid fa-tags" style="color: #4fd858;"></i>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
    <div v-if="posts && posts.length > 0">
      <h2 class="section-title" @click="router.push('/cam-nang')">Cẩm
        nang &nbsp;<i class="fa-solid fa-book"></i>
      </h2>
      <div class="post-container">
        <div @click="router.push({ path: '/bai-viet/' + posts[0].slug })" class="post-1" v-if="posts[0].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[0].thumbnail alt="">
          <h1>{{ posts[0].title }}</h1>
        </div>
        <div @click="router.push({ path: '/bai-viet/' + posts[1].slug })" class="post-2" v-if="posts[1].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[1].thumbnail alt="">
          <h4>{{ posts[1].title }}</h4>
        </div>
        <div @click="router.push({ path: '/bai-viet/' + posts[2].slug })" class="post-3" v-if="posts[2].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[2].thumbnail alt="">
          <h4>{{ posts[2].title }}</h4>
        </div>
        <div @click="router.push({ path: '/bai-viet/' + posts[3].slug })" class="post-4" v-if="posts[3].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[3].thumbnail alt="">
          <h4>{{ posts[3].title }}</h4>
        </div>
        <div @click="router.push({ path: '/bai-viet/' + posts[4].slug })" class="post-5" v-if="posts[4].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[4].thumbnail alt="">
          <h4>{{ posts[4].title }}</h4>
        </div>
        <div @click="router.push({ path: '/bai-viet/' + posts[5].slug })" class="post-6" v-if="posts[5].thumbnail">
          <img style="height: 100%;width: 100%;object-fit: cover;" :src=posts[5].thumbnail alt="">
          <h4>{{ posts[5].title }}</h4>
        </div>
      </div>
    </div>
    <HeartLoading v-else> </HeartLoading>
  </div>
  <iframe class="map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2521232744994!2d103.96182131119717!3d22.49472183573427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd139cd20452db%3A0x1e087d472f4b71ce!2zMTE2IFPGoW4gxJDhuqFvLCBD4buRYyBM4bq_dSwgTMOgbyBDYWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699640028623!5m2!1svi!2s"
    width="100%" height="450" style="border:0;margin-top: 2rem;" allowfullscreen="" loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</template>

<script>
import HeartLoading from '../../components/HeartLoading.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import '@splidejs/vue-splide/css';
import baseUrl from '../../connect';

export default {
  components: {
    HeartLoading,
    Splide,
    SplideSlide,
  },
  setup() {
    let hotTour = ref()
    let china = ref()
    let domestic = ref()
    let foreign = ref()
    let posts = ref()
    let sliderItem = ref()
    const options = {
      rewind: true,
      gap: '2rem',
      perPage: 4,
      perMove: 1,
      autoplay: true,
      // focus: 'center',
    };
    const mobileOptions = {
      rewind: true,
      perPage: 1,
      perMove: 1,
      autoplay: true,
    };
    const headOption = {
      autoplay: true,
      perMove: 1,
      perPage: 1,
      focus: 'center',


    }
    const router = useRouter();
    onMounted(() => {
      baseUrl.get('/client/slide').then((response) => {
        sliderItem.value = response.data.rows
      }).catch((error) => {
        console.log(error)
      })
      baseUrl.get('/client/carousel/hottour').then((response) => {
        hotTour.value = response.data.rows
      })
      baseUrl.get('/client/carousel/post-grid').then((response) => {
        posts.value = response.data.rows
      })
      baseUrl.get('/client/carousel/china').then((response) => {
        china.value = response.data.rows
      })
      baseUrl.get('/client/carousel/domestic').then((response) => {

        domestic.value = response.data.rows
      })
      baseUrl.get('/client/carousel/foreign').then((response) => {

        foreign.value = response.data.rows
      })
    })
    return {
      router,
      options,
      hotTour,
      china,
      domestic,
      foreign,
      posts,
      sliderItem,
      headOption, mobileOptions
    }
  }
}
</script>

<style >
.slide {
  width: 60%;
  height: 25rem;
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

.home-container {
  padding-top: 2rem;
  margin: auto;
  padding: auto;
  width: 85%;
}

.hot-sale-item {
  transition: transform 0.2s ease-in-out;
}





.home-first-section {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.travel-category {
  display: flex;
  width: 15rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-around;
  background-color: #d3ecd7;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.travel-category-item {
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: auto;
}

.travel-category-item p {
  font-size: larger;
  margin: 0;
}

.travel-category-item:first-child {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.travel-category-item:last-child {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.travel-category-item:hover {
  background-color: #bcecc4;
  cursor: pointer;
}

.extended-category {
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  max-height: 30rem;

}

.extent-item {
  width: 100%;
  border-radius: 1rem;
  height: 7rem;
  background-color: #d3ecd7;
  text-align: center;
  padding-top: 2.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: transform 0.2s ease-in-out;
}

.extent-item:hover {
  background-color: #bcecc4;
  cursor: pointer;
  transform: scale(1.05);
}

.extent-item p {
  font-size: larger;
  margin: auto;
  padding: auto;
  margin: 0;
}

.post-container {
  width: 90%;
  margin-bottom: 2rem;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-gap: 1px;
  grid-auto-flow: row;
}

.post-container>div {
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
}

.post-container>div>img {
  transition: all .2s ease-in-out;
  filter: brightness(90%);
  border-radius: 5px;


}

.post-container>div>img:hover {
  transform: scale(1.1);
  filter: brightness(50%);
  cursor: pointer;
}

.post-container>div>h1 {
  padding: 1rem;
  position: absolute;
  bottom: 0;
  color: white;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: rgb(96, 96, 96);
}

.post-container>div>h4 {
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  color: white;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: rgb(96, 96, 96);
}

.post-1 {
  grid-area: 1 / 1 / 3 / 3;
  overflow: hidden;
  height: 30rem;
}

.post-2 {
  grid-area: 1 / 3 / 2 / 4;
  height: 15rem;
}

.post-3 {
  grid-area: 2 / 3 / 3 / 4;
  height: 15rem;

}

.post-4 {
  grid-area: 3 / 1 / 4 / 2;
  height: 15rem;

}

.post-5 {
  grid-area: 3 / 2 / 4 / 3;
  height: 15rem;

}

.post-6 {
  grid-area: 3 / 3 / 4 / 4;
  height: 15rem;
}


.mobile-slide {
  display: none;
  width: 100%;
}

.mobile-slide-image {
  width: 100%;
  /* height: 10rem; */
}


.section-title {
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #045B48;
}

.section-title:hover {
  color: #ff6600;
  text-decoration: underline;
  cursor: pointer;
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