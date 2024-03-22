<template>
    <div class="content-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li @click="router.push('/')" class="breadcrumb-item"><i class="fa-solid fa-house"></i>
                    <a class="home-breadcrumb">Trang
                        chủ</a>
                </li>
                <li class="breadcrumb-item" @click="router.push('/dich-vu')">Dich vu</li>
                <li class="breadcrumb-item">Dat ve may bay</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="intro">
                <p> Du lich hoang ha mang đến sự đa dạng về các hãng hàng không trong nước lẫn quốc tế. Với các chặng bay
                    nội địa,
                    vé máy bay Vietnam Airlines, vé máy bay VietJet Air, vé máy bay Bamboo Airways, vé máy bay Vietravel
                    Airlines và vé máy bay Pacific Airlines vẫn là những cái tên được nhớ đến đầu tiên. Dù bạn muốn dừng
                    chân tại các thành phố lớn như TP. HCM, Hà Nội, Đà Nẵng, hay những địa điểm du lịch nổi tiếng như Nha
                    Trang, Phú Quốc, Đà Lạt… cũng sẽ khiến bạn hài lòng với vô vàn sự lựa chọn về thời gian và
                    địa điểm khởi hành.</p>

                <h4><b>LIÊN HỆ</b></h4>
                <h4>Lào Cai : 02143.855158</h4>
                <h4>Hotline: 0904678168</h4>
            </div>
            <div class="form-container">
                <h3 style="text-align: center;">Dat ve may bay</h3>
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
                    <label for="departure_place" class="form-label">Diem khoi hanh</label>
                    <input type="text" class="form-control" id="departure_place">
                </div>
                <div class="mb-3">
                    <label for="arrival_place" class="form-label">Diem den</label>
                    <input type="text" class="form-control" id="arrival_place">
                </div>
                <div class="mb-3">
                    <label for="departure_date" class="form-label">Ngay di</label>
                    <input type="text" class="form-control" id="departure_date">
                </div>
                <div class="mb-3">
                    <label for="arrival_date" class="form-label">Ngay ve</label>
                    <input type="text" class="form-control" id="arrival_date">
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
                <button style="margin: auto;padding: auto;height: 3rem;width: 8rem;font-size: larger;font-weight: bolder;"
                    class="btn btn-success mt-3">
                    Dat ve may bay
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