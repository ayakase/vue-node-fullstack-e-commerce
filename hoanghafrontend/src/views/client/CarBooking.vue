<template>
    <div class="content-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li @click="router.push('/')" class="breadcrumb-item"><i class="fa-solid fa-house"></i>
                    <a class="home-breadcrumb">Trang
                        chủ</a>
                </li>
                <li class="breadcrumb-item" @click="router.push('/dich-vu')">Dich vu</li>
                <li class="breadcrumb-item">Dich vu thue xe</li>
            </ol>
        </nav>
        <div class="section-container">
            <div class="intro">
                <p>Du Lịch Hoàng Hà là một trong những đơn vị cho thuê xe du lịch uy tín và chất lượng được nhiều khách hàng
                    tin
                    tưởng
                    lựa chọn. Với dịch vụ cho thuê xe du lịch đa dạng về loại xe và chất lượng dịch vụ tốt. Chúng tôi sẵn
                    sàng
                    tư
                    vấn và
                    hỗ trợ khách hàng tìm hiểu thêm về các dịch vụ cho thuê xe du lịch tại địa chỉ của chúng tôi.</p>
                <h4>Dịch vụ cho thuê:</h4>
                <ul>
                    <li>
                        Xe 4 chỗ
                    </li>
                    <li>
                        Xe 7 chỗ
                    </li>
                    <li>
                        Xe 16 chỗ
                    </li>
                    <li>
                        Xe 29 chỗ
                    </li>
                    <li>
                        Xe 35 chỗ
                    </li>
                    <li>
                        Xe 45 chỗ
                    </li>
                </ul>
                <h4><b>LIÊN HỆ</b></h4>
                <h4>Lào Cai : 02143.855158</h4>
                <h4>Hotline: 0904678168</h4>
            </div>
            <div class="form-container">
                <h3 style="text-align: center;">Thue xe</h3>
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
                    <label for="schedule" class="form-label">Lich trinh thue xe</label>
                    <input type="text" class="form-control" id="schedule">
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Ngay thue xe</label>
                    <input type="text" class="form-control" id="date">
                </div>
                <div class="mb-3">
                    <label for="days" class="form-label">So ngay thue xe</label>
                    <input type="text" class="form-control" id="days">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Loai xe</label>
                    <input type="text" class="form-control" id="type">
                </div>
                <div class="mb-3">
                    <label for="note" class="form-label">Yeu cau khac</label>
                    <input type="text" class="form-control" id="note">
                </div>
                <button style="margin: auto;padding: auto;height: 3rem;width: 8rem;font-size: larger;font-weight: bolder;"
                    class="btn btn-success mt-3">
                    Dat xe
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