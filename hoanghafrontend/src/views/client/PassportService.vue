<template>
    <div class="content-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li @click="router.push('/')" class="breadcrumb-item"><i class="fa-solid fa-house"></i>
                    <a class="home-breadcrumb">Trang
                        chủ</a>
                </li>
                <li class="breadcrumb-item" @click="router.push('/dich-vu')">Dich vu</li>
                <li class="breadcrumb-item">Dat phong khach san</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="intro">
                <h4>Dich vu dat khách sạn tại Lào Cai : </h4>
                <ol>
                    <li>Khách sạn Aisto tiêu chuẩn 5 sao</li>
                    <li>Khách sạn Đức Huy tiêu chuẩn 4 sao</li>
                    <li>Khách sạn Mường Thanh tiêu chuẩn 4 sao</li>
                    <li>Khách sạn Royal View tiêu chuẩn 4 sao</li>
                    <li>Khách sạn Ngôi Sao tiêu chuẩn 4 sao</li>
                </ol>

                <h4><b>LIÊN HỆ</b></h4>
                <h4>Lào Cai : 02143.855158</h4>
                <h4>Hotline: 0904678168</h4>
            </div>
            <div class="form-container">
                <h3 style="text-align: center;">Dịch vụ làm hộ chiếu/visa</h3>
                <div class="mb-3">
                    <label for="name" class="form-label">Họ và tên</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Số điện thoại</label>
                    <input type="text" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Ghi chú</label>
                    <input type="text" class="form-control" id="email">
                </div>

                <button style="margin: auto;padding: auto;height: 3rem;width: 15rem;font-size: larger;font-weight: bolder;"
                    class="btn btn-success mt-3">
                    Dat phong khach san
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.breadcrumb-item {
    font-size: large;
}

.home-breadcrumb {
    text-decoration: none !important;
    font-weight: bold;
    color: black;
}

.content-container {
    padding-top: 2rem;
    width: 90%;
    margin: auto;
    padding: auto;
}

.section-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.intro {
    width: 25%;
    border-radius: 1rem;
    padding: 1rem;
    font-size: larger;
    background-color: #d3ecd7;
}

.form-container {
    width: 70%;
    background-color: #d3ecd7;
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

}
</style>