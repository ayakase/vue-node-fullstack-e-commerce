<template>
    <div class="header-container" v-if="route.meta.showNavbar">
        <div v-if="loginStore.login">
            <div><button @click="logout" class=" btn btn-danger active admin-button" aria-current="page" href="#">Logout
                </button>
                <RouterLink class=" btn btn-success active logout-button" to="/admin/thong-ke" aria-current="page"
                    href="#">
                    Admin Panel
                </RouterLink>
            </div>
        </div>
        <RouterLink class="stamp" to="/"><img src="../assets/stamp.png" alt="" class="">
        </RouterLink>
        <img src="../assets/images/header1.jpg" alt="" class="banner">
        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="main_nav">
                    <ul class="navbar-nav">
                        <li>
                            <RouterLink class="nav-link active" to="/" aria-current="page" href="#">
                                Trang chủ</RouterLink>
                        </li>

                        <li class="nav-item dropdown">
                            <a @click="router.push('/danh-muc/du-lich-trong-nuoc')" class="nav-link  dropdown-toggle"
                                data-bs-toggle="dropdown"> Du lịch trong nước </a>
                            <ul class="dropdown-menu">
                                <li v-if="domesticMenu" v-for="region in domesticMenu.Regions">
                                    <p style="font-size: larger;color: #045B48;" class="region-menu"
                                        @click="router.push({ path: '/khu-vuc/' + region.slug })">
                                        {{ region.name }}
                                    </p>
                                    <ul style="margin: 0; padding: 0;">
                                        <li v-for="location in region.Locations">
                                            <p style=" color: #045B48;" class="location-menu"
                                                @click="router.push({ path: '/dia-diem/' + location.slug })">
                                                {{
        location.name }}</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a @click="router.push('/danh-muc/du-lich-quoc-te')" class="nav-link  dropdown-toggle"
                                data-bs-toggle="dropdown"> Du lịch quốc tế </a>
                            <ul class="dropdown-menu">
                                <li v-if="foreignMenu" v-for="region in foreignMenu.Regions">
                                    <p style="font-size: larger;color: #045B48;" class="region-menu"
                                        @click="router.push({ path: '/khu-vuc/' + region.slug })">
                                        {{ region.name }}
                                    </p>
                                    <ul style="margin: 0; padding: 0">
                                        <li v-for="location in region.Locations" class="location-menu">
                                            <p style=" color: #045B48;"
                                                @click="router.push({ path: '/dia-diem/' + location.slug })">
                                                {{
        location.name }}</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink class="nav-link active" to="/about/chinh-sach-va-quy-dinh" aria-current="page"
                                href="#">
                                Về
                                chúng tôi
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink class="nav-link active" to="/tour-hot" aria-current="page" href="#">Tour Hot
                                &nbsp;<i style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink class="nav-link active" to="/tour-khuyen-mai" aria-current="page" href="#">
                                Khuyến mãi
                                &nbsp;<i style="color: #1f8726;" class="fa-solid fa-tags fa-beat-fade "></i>
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink class="nav-link active" to="/cam-nang" aria-current="page" href="#">
                                Bài viết
                            </RouterLink>
                        </li>

                        <li style="display: flex;position: absolute; right:1rem;">
                            <form class=" d-flex search-container" style="margin-top:.3rem;padding: 0;">
                                <input
                                    @keydown.enter.prevent="router.push({ path: '/tim-kiem/', query: { keyword: searchText } })"
                                    v-model="searchText" class="form-control me-2 search-box" type="search"
                                    placeholder="Tìm kiếm" aria-label="Search">
                            </form>
                            <button style="margin-top:.3rem;" class=" btn btn-outline-success"
                                @click="router.push({ path: '/tim-kiem/', query: { keyword: searchText } })"><i
                                    class="fas fa-search"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import baseUrl from '../connect';
import { useLoginStore } from '../stores/loginstate';
const loginStore = useLoginStore()
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter();
import { useCookies } from "vue3-cookies";
let { cookies } = useCookies()
let searchText = ref("")
const domesticMenu = ref()
const foreignMenu = ref()
const props = defineProps(['menuData'])

onMounted(() => {
    // loginStore.checkLogin()
    domesticMenu.value = props.menuData[0]
    foreignMenu.value = props.menuData[1]
    window.addEventListener('scroll', handleScroll);

    // baseUrl
    //     .get("/client/initial/menu").then((response) => {
    //         domesticMenu.value = response.data[0]
    //         foreignMenu.value = response.data[1]
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // showChatbox = false;
    // notify()
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})
function handleScroll() {
    const nav = document.querySelector('.navbar');
    if (nav) {
        const offsetTop = nav.offsetTop;
        if (window.scrollY > 271) {
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
        }
    }
}
// let chatBoxValue = ref(false)
// let showChatbox = () => {
//     if (chatBoxValue.value == false) {
//         chatBoxValue.value = true;
//     } else if (chatBoxValue.value == true) {
//         chatBoxValue.value = false;
//     }
// }
function logout() {
    baseUrl.get('/admin/login/logout').then((response) => {
        cookies.remove('token')
        toast.info(response.data.message, {
            autoClose: 6000,
            theme: "colored",
            position: toast.POSITION.BOTTOM_RIGHT,
        }).catch((error) => {
            console.error(error)
        });
        loginStore.toggleButton(response.data.state)
    })
}
</script>

<style scoped>
.header-container {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}



.stamp {
    /* display: none; */
    position: absolute;
    top: 1rem;
    left: 1rem;
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
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 100;
    background-color: #cefecabd;

}

.fixed-nav {
    position: fixed;
    top: 0;
    height: 4rem;

}

.domestic-category {
    position: relative;

}

.banner {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.nav-link {
    height: 100%;
    color: #045B48 !important;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 500;
}



.search-box {
    background: none;
    margin-left: 1rem;
    border: #0aa886 1px solid;
}

.search-container {
    margin-left: 2rem;
}



@media screen and (max-width: 1225px) {
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


.logo-container {
    height: 100%;
    padding: 0.5rem;
}



ul {
    list-style-type: none;
}

li {
    margin: 0;
    padding: 0;
}

p {
    margin: 0;
    padding: 0;
}

.dropdown-menu {
    background-color: #f1faf4;
    margin: 0;
    padding: 0;
}

.region-menu {
    width: 12rem;
    padding: 0.6rem;

    /* background-color: rebeccapurple; */
}

.region-menu:hover {
    background-color: #0aa886;
    color: whitesmoke !important;
    cursor: pointer;
}

.location-menu {
    padding-top: 0.2rem;
    padding: 0.6rem;

    /* background-color: red; */
}

.location-menu:hover {
    background-color: #0aa886;
    color: whitesmoke !important;
    cursor: pointer;
}


/* @media all and (min-width: 992px) { */
.navbar .nav-item .dropdown-menu {
    display: none;


}

.navbar .nav-item:hover .nav-link {}

.navbar .nav-item:hover .dropdown-menu {
    display: flex;
    justify-content: space-between;
}

.navbar .nav-item .dropdown-menu {
    margin-top: 0;
}


/* } */
</style>
