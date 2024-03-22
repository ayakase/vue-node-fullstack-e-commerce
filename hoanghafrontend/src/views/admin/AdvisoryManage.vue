<template>
    <div class="advisory-manage">
        <div class="sorting-container">
            <div style="font-size: larger;">Bộ lọc:</div>
            <div class="sorting-button-container">
                <form class="d-flex search-container">
                    <button class="btn btn-outline-success" @click.prevent=""><i class="fas fa-search"></i></button>
                    <input @keydown.enter.prevent="" class="form-control me-2 search-box" type="search"
                        placeholder="Tìm kiếm theo tên" aria-label="Search">
                </form>

                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="color: white;">
                        Trạng thái &nbsp; <i class="fa-solid fa-check-to-slot">: </i> {{ stateLabel }}
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="unsolved">Chưa xử lí &nbsp; <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button class="dropdown-item" @click="solved">Đã xử lí &nbsp;<i
                                class="fa-solid fa-check"></i></button>
                    </div>
                </div>
                <button class="sort-button btn btn-success" @click="Newest">Mới nhất &nbsp; <i
                        class="fa-solid fa-arrow-up-wide-short"></i></button>
                <button class="sort-button btn btn-success" @click="Oldest">Cũ nhất &nbsp; <i
                        class="fa-solid fa-arrow-down-wide-short"></i></button>
                <button class="btn btn-success" @click="reRender"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>


        <table class="table table-success table-striped" style="width: 80vw;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Họ và Tên</th>
                    <th scope="col">Tour</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col"> Chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in formInfo" :key="info" class="each-tour-row">
                    <td scope="row">{{ info.id }}</td>
                    <td scope="row">{{ info.name }}</td>
                    <td scope="row" v-if="info.Tour"> {{info.Tour.title}}</td>
                    <td v-else>Không </td>
                    <td scope="row">{{ info.phone }}</td>
                    <td scope="row">{{ info.email }}</td>
                    <td scope="row">{{ info.note }}</td>
                    <td scope="row">{{ info.id }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
let sortOrder = ref("DESC");
let page = ref(1)
let formInfo = ref()
onMounted(() => {
    baseUrl.get("/admin/advisory/" + sortOrder.value + "/" + 1)
        .then(response => {
            formInfo.value = response.data.rows
            // formInfo.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
    // console.log(formatDate("2023-08-29T19:20:29.000Z"))
})
</script>

<style scoped>
.advisory-manage {
    width: 100%;
    margin-top: 2rem;
}

.sorting-button-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
}

table {
    border-radius: 1rem !important;
    border-collapse: collapse;
    overflow: hidden;
}

.sorting-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>