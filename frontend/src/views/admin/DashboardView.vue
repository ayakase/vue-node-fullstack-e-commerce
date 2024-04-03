<template>
        <div class="admin-container">
                <v-card style="z-index: 999;">
                        <v-layout>
                                <v-navigation-drawer style="background-color: #97CBB4" v-model="drawer" permanent
                                        @click="rail = false">
                                        <v-list density="compact" class="side-nav-items" nav>
                                                <RouterLink class="admin-side-item" to="/" aria-current="page">
                                                        Home page<i class="fa-solid fa-house"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/tai-khoan-admin">Tài
                                                        khoản<i class="fa-solid fa-user"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/thong-ke">Thống
                                                        kê<i class="fa-solid fa-chart-line"></i>
                                                </RouterLink>
                                                <v-divider></v-divider>
                                                <RouterLink class="admin-side-item" to="/admin/dat-tour">Đặt Tour<i
                                                                class="fa-solid fa-box-archive"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/dang-ky-tu-van">Đăng ký
                                                        tư vấn<i class="fa-solid fa-headset"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/quan-ly-tour">Quản Lí
                                                        Tour <i class="fa-regular fa-paper-plane"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/quan-ly-khu-vuc">Qlý khu
                                                        vực<i class="fa-solid fa-map"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/quan-ly-dia-diem">Qlý địa
                                                        điểm<i class="fa-solid fa-location-dot"></i>
                                                </RouterLink>

                                                <RouterLink class="admin-side-item" to="/admin/quan-ly-slider">Ảnh
                                                        Slider<i class="fa-solid fa-photo-film"></i>
                                                </RouterLink>
                                                <RouterLink class="admin-side-item" to="/admin/bai-viet">Bài viết<i
                                                                class="fa-regular fa-newspaper"></i>
                                                </RouterLink>
                                                <div class="log-out">
                                                        <v-divider></v-divider>
                                                        <button @click="logout" class="log-out-btn"
                                                                aria-current="page">Logout <i
                                                                        class="fa-solid fa-arrow-right-from-bracket"></i>
                                                        </button>
                                                </div>
                                        </v-list>
                                </v-navigation-drawer>
                                <v-main>
                                </v-main>
                        </v-layout>
                </v-card>
                <div class=" admin-content">

                        <RouterView></RouterView>

                </div>
        </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
const drawer = ref(true)
const rail = ref(true)
import { useRouter } from 'vue-router';
const router = useRouter()
import { toast } from 'vue3-toastify';
import { useLoginStore } from '../../stores/loginstate';
const loginStore = useLoginStore()
import { useCookies } from "vue3-cookies";
let { cookies } = useCookies()
import baseUrl from '../../connect';
function logout() {
        baseUrl.get('/admin/login/logout').then((response) => {
                cookies.remove('token')
                toast.info(response.data.message, {
                        autoClose: 6000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                });
                loginStore.toggleButton(response.data.state)
                router.push('/')
        }).catch((error) => {
                console.error(error)
        })
}
</script>
<style scoped>
.admin-container {
        display: flex;
        flex-direction: row;
}

.admin-side-item {
        height: 3rem;
        text-decoration: none;
        padding: 1rem;
        color: black;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        transition: background-color 0.1s linear;
}

.admin-side-item:hover {
        z-index: 999;
        background-color: #b6e4cf;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.router-link-active {
        background-color: #b6e4cf;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.admin-content {
        height: 100vh;
        padding-left: 4rem;
        padding-right: 4rem;
        width: 100%;
}

.side-nav-items {
        height: 100%;
        display: flex;
        flex-direction: column;
}

.log-out {
        margin-top: auto;

}

.log-out-btn {
        height: 3rem;
        text-decoration: none;
        padding: 1rem;
        color: white;
        background-color: #aa2e25;
        border-radius: 5rem;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: width 0.1s ease-in-out;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: background-color 0.2s linear;
}

.log-out-btn:hover {
        background-color: #f44336;
}
</style>