<template>

    <div class="mobile-nav-container">
        <div style="position: relative;" class="mobile-nav">
            <div class="logo-container" @click="router.push('/')"><img src="../assets/logo.png" alt=""
                    class="mobile-logo">
            </div>
            <button class="btn mobile-btn" @click="toggleNav"><i class="fa-solid fa-bars"></i></button>
        </div>
        <Transition name="slide-fade">
            <div class="nav-category" v-if="showNav">
                <RouterLink class="mobile-nav-item" to="/" aria-current="page" href="#">Trang chủ</RouterLink>
                <hr>
                <RouterLink class="mobile-nav-item" to="/about/chinh-sach-va-quy-dinh" aria-current="page" href="#">
                    Về
                    chúng tôi
                </RouterLink>
                <hr>
                <RouterLink class="mobile-nav-item" to="/tour-hot" aria-current="page" href="#">Tour Hot &nbsp;<i
                        style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i>
                </RouterLink>
                <hr>
                <div style="display: flex;justify-content: space-between;">
                    <RouterLink style="width: 18rem;" class="mobile-nav-item" to="/danh-muc/du-lich-trong-nuoc"
                        aria-current="page" href="#">
                        Du lịch
                        trong
                        nước
                        &nbsp; <i class="fa-solid fa-flag"></i>
                    </RouterLink>
                    <div class="arrow-toggle" @click="toggleDomestic"><i v-if="!showDomestic"
                            class="fa-solid fa-chevron-down"></i><i v-if="showDomestic"
                            class="fa-solid fa-chevron-up"></i></div>
                </div>
                <hr>
                <div v-if="domesticMenu && showDomestic" v-for="region in domesticMenu.Regions">
                    <div class="mobile-nav-item" style="font-weight: bold;"
                        @click="router.push({ path: '/khu-vuc/' + region.slug })">
                        {{ region.name }}
                    </div>
                    <div v-for="location in region.Locations" class="mobile-nav-item">
                        <div @click="router.push({ path: '/dia-diem/' + location.slug })">
                            &nbsp;&nbsp;&nbsp;{{ location.name }}</div>
                    </div>
                </div>
                <div style="display: flex;justify-content: space-between;">
                    <RouterLink style="width: 18rem;" class="mobile-nav-item" to="/danh-muc/du-lich-trong-nuoc"
                        aria-current="page" href="#">
                        Du lịch
                        quốc tế
                        &nbsp; <i class="fa-solid fa-flag"></i>
                    </RouterLink>
                    <div class="arrow-toggle" @click="toggleForeign"><i v-if="!showForeign"
                            class="fa-solid fa-chevron-down"></i>
                        <i v-if="showForeign" class="fa-solid fa-chevron-up"></i>
                    </div>
                </div>
                <hr>
                <div v-if="domesticMenu && showForeign" v-for="region in foreignMenu.Regions">
                    <div class="mobile-nav-item" style="font-weight: bold;"
                        @click="router.push({ path: '/khu-vuc/' + region.slug })">
                        {{ region.name }}
                    </div>
                    <div v-for="location in region.Locations" class="mobile-nav-item">
                        <div @click="router.push({ path: '/dia-diem/' + location.slug })">
                            &nbsp;&nbsp;&nbsp;{{ location.name }}</div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
    <div class="black-layout" v-if="showNav" @click="toggleNav">

    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from 'vue';
import baseUrl from '../connect';
import { useRouter } from 'vue-router';
const router = useRouter();
const showNav = ref(false)
const showDomestic = ref(false)
const showForeign = ref(false)
function toggleNav() {
    showNav.value = !showNav.value
}
function toggleDomestic(event) {
    showNav.value = true
    showDomestic.value = !showDomestic.value
}
function toggleForeign(event) {
    showNav.value = true
    showForeign.value = !showForeign.value
}
const domesticMenu = ref()
const foreignMenu = ref()
const props = defineProps(['menuData'])
onMounted(() => {
    // loginStore.checkLogin()
    domesticMenu.value = props.menuData[0]
    foreignMenu.value = props.menuData[1]
    // notify()
})
// let chatBoxValue = ref(false)
// let showChatbox = () => {
//   if (chatBoxValue.value == false) {
//     chatBoxValue.value = true;
//   } else if (chatBoxValue.value == true) {
//     chatBoxValue.value = false;
//   }
// }

</script>
<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.header-container {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-47%, -70%);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

.company-name {
    color: #045B48;
    font-size: 5em;
    font-weight: bold;
}

.vl {
    width: 1rem;
    border-left: 1px solid #045B48;
}

.subtext-1 {
    color: #045B48;
    font-size: larger;
    padding-left: 1rem;
    padding-bottom: 1.3rem;
}

.stamp {
    /* display: none; */
    position: absolute;
    top: 1rem;
    left: 1rem;
}

.call-icon {
    width: 2.2rem;
    padding-bottom: 0.2rem;
}

nav {
    padding: 0.35rem;
    padding-left: 3rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
}

.custom-bg {
    background-color: #cefecaa8;
    ;
}

.banner {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.nav-link {
    color: #045B48 !important;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    font-size: medium;
    font-weight: 500;
    transition: border-bottom 0.2s linear color 0.2s linear;
    border-bottom: 1px solid transparent;
}

.dropdown-menu {
    /* margin-top: 1rem; */
    background-color: #dbebe1;
    width: 15rem;
}

.nav-link:hover {
    border-right: 5px solid #ff6600;
    color: white;
}

.search-box {
    background: none;
    margin-left: 1rem;
    border: #0aa886 1px solid;
}

.search-container {
    margin-left: 2rem;
}

.hotline {
    position: absolute;
    right: 5rem;
}

@media screen and (max-width: 1214px) {
    .company-name {
        font-size: 3em;
    }
}

@media screen and (max-width: 860px) {
    .company-name {
        font-size: 2em;
    }
}

@media screen and (max-width: 992px) {
    .header-container {
        display: none;
    }

    .banner {
        display: none;
    }
}


.home-breadcrumb {
    text-decoration: none !important;
}

.admin-button {
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.logout-button {
    position: absolute;
    right: 6.5rem;
    top: 1rem;
}

* {
    box-sizing: border-box;
}

ul.nav-menu {
    text-decoration: none !important;
    z-index: 99999999999999;
    margin: 0;
    padding: 0;
    float: left;
    margin-right: 100px;
}

.region-item:hover {
    background-color: #0aa886;
}

.region-menu:hover {
    background-color: #0aa886;
    cursor: pointer;
}

.location-menu:hover {
    background-color: #0aa886;
    cursor: pointer;

}

ul.nav-menu li {
    /* display: block; */
    margin: 0;
    padding: 0;
    text-decoration: none !important;
    list-style: none;
    line-height: 50px;
}

ul.nav-menu li:hover {
    /* background-color: #cefeca; */
    position: relative;
}

ul.nav-menu li a {
    text-decoration: none !important;

    /* text-decoration: none; */
    color: #000000;
    /* text-transform: uppercase; */
    padding: 10px 25px;
}

ul.nav-menu li p {
    text-decoration: none !important;

    /* text-decoration: none; */
    color: #000000;
    /* text-transform: uppercase; */
    padding-right: 2rem;
    padding-left: 2rem;
}

.drop-one {
    font-weight: 500;
    margin: 0;
    padding: 0;
    width: 250px;
    position: absolute;
    top: 50px;
    left: 0;
    display: none;
    background: #dbebe1;
}

ul.nav-menu li:hover>.drop-one {
    display: block;
}

.drop-two {
    margin: 0;
    padding: 0;
    width: max-content;
    position: absolute;
    top: 0;
    left: 100%;
    background: #dbebe1;
    display: none;
}

.drop-one li:hover>.drop-two {
    display: flex;
}

.drop-two-special {

    margin: 0;
    padding: 0;
    width: max-content;
    position: absolute;
    top: -50px;
    left: 100%;
    background: #dbebe1;
    display: none;
    font-size: large;
    color: #045B48;
}

.service-item {
    color: #045B48 !important;
}

.service-item:hover {
    background-color: #0aa886;
}

.drop-one li:hover>.drop-two-special {
    display: flex;
    flex-direction: column;
}

.drop-three {
    margin: 0;
    padding: 0;
    width: 100%;
    position: relative;
    top: 0;
    background: #dbebe1;
    display: block;
}

.mobile-nav-container {

    display: none;
    top: 0;
    width: 100%;
}

.mobile-nav {
    background-color: #045B48;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 4rem;
}

.mobile-btn {
    width: 4rem;
    font-size: 2rem;
}

.logo-container {
    height: 100%;
    padding: 0.5rem;
}

.mobile-logo {}

.nav-category {
    position: absolute;
    right: 0;
    z-index: 9;
    background-color: #d3ecd7;
    width: 80%;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    height: 85vh;
    overflow: scroll;
}

@media screen and (max-width: 992px) {
    .mobile-nav-container {
        display: block;
    }
}

.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
}

.mobile-nav-item {
    height: 100%;
    text-decoration: none;
    height: 3rem;
    min-height: 3rem;
    font-size: larger;
    color: black;
    padding: 0.5rem;
}

.black-layout {
    position: fixed;
    width: 100vw;
    height: 100%;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.24);
}

hr {
    margin: 0;
    padding: 0;
}

.arrow-toggle {
    width: 4rem;
    text-align: center;
    font-size: 2rem;
}
</style>
