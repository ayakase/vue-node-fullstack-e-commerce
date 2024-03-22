<template>
    <div class="content-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li @click="router.push('/')" class="breadcrumb-item"><i class="fa-solid fa-house"></i>
                    <a class="home-breadcrumb">Trang
                        chủ</a>
                </li>
                <li class="breadcrumb-item" @click="router.push('/dich-vu')">Dich vu</li>
                <li class="breadcrumb-item">Dat ve cap treo</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="intro">
                <h4>Đặt vé cáp treo Fansipan</h4>
                <ul>
                    <li>Không cần xếp hàng mà có thể vào cổng trực tiếp và đến thẳng ga cáp treo</li>
                    <li>Chiêm ngưỡng bức tranh phong cảnh đầy màu sắc của Thung Lũng Mường Hoa, vườn quốc gia Hoàng Liên và
                        dãy Hoàng Liên Sơn trùng điệp.</li>
                    <li>Tiết kiệm thời gian, chỉ mất khoảng 15 phút thay vì phải leo núi từ hai đến bốn ngày như trước đây.
                    </li>
                </ul>

                <h4><b>LIÊN HỆ</b></h4>
                <h4>Lào Cai : 02143.855158</h4>
                <h4>Hotline: 0904678168</h4>
            </div>
            <div class="form-container">
                <h3 style="text-align: center;">Dat ve cap trep Fansipan</h3>
                <div class="mb-3">
                    <label for="name" class="form-label">Ho va ten</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">So dien thoai</label>
                    <input type="text" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Ngay dat</label>
                    <input type="text" class="form-control" id="date">
                </div>
                <div class="mb-3">
                    <label for="adult" class="form-label">So luong nguoi lon</label>
                    <input type="text" class="form-control" id="adult">
                </div>
                <div class="mb-3">
                    <label for="children" class="form-label">So luong tre em</label>
                    <input type="text" class="form-control" id="children">
                </div>
                <div class="mb-3">
                    <label for="infant" class="form-label">So luong em be</label>
                    <input type="text" class="form-control" id="infant">
                </div>
                <button style="margin: auto;padding: auto;height: 3rem;width: 10rem;font-size: larger;font-weight: bolder;"
                    class="btn btn-success mt-3">
                    Dat ve
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
    flex-wrap: wrap;
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