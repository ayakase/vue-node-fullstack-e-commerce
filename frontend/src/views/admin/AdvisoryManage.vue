<template>
    <div class="advisory-manage">
        <div class="sorting-container">
            <div style="font-size: larger;">Bộ lọc:</div>
            <div class="sorting-button-container">
                <form class="d-flex search-container">
                    <button class="btn btn-outline-success" @click.prevent="getData"><i
                            class="fas fa-search"></i></button>
                    <input @keydown.enter.prevent="getData" class="form-control me-2 search-box" type="search"
                        placeholder="Tìm kiếm theo tên" aria-label="Search" v-model="searchTerm">
                </form>

                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="color: white;">
                        Trạng thái &nbsp; <i class="fa-solid fa-check-to-slot">: </i> {{ stateLabel }}
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="unsolved">Chưa xử lí &nbsp; <i
                                class="fa-solid fa-xmark"></i>
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


        <table v-if="formInfo" class="table table-success table-striped"
            style="width: 80vw;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Họ và Tên</th>
                    <th scope="col">Tour</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tạo lúc</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col">Hành động</th>

                    <!-- <th scope="col"> Chi tiết</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in formInfo" :key="info" class="each-tour-row">
                    <td scope="row">{{ info.id }}</td>
                    <td scope="row">{{ info.name }}</td>
                    <td scope="row" v-if="info.Tour"> {{ info.Tour.title }}</td>
                    <td v-else><i class="fa-solid fa-ban"></i> </td>
                    <td scope="row">{{ info.phone }}</td>
                    <td scope="row">{{ info.email }}</td>
                    <td scope="row">{{ formatDate(info.createdAt) }}</td>
                    <td scope="row">{{ info.note }}</td>
                    <!-- <td scope="row">{{ info.id }}</td> -->
                    <td v-if="info.solved == 0" style="vertical-align: middle;"> <button class="solve-btn"
                            @click="solveAdvisory(info.id)"><i class="fa-regular fa-circle-check fa-lg"></i></button>
                    </td>
                    <td v-else style="vertical-align: middle;"> <button class="solve-btn"
                            @click="solveAdvisory(info.id)"><i class="fa-regular fa-circle-xmark fa-lg"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <TableLoading v-else></TableLoading>
        <v-pagination @click="getData" v-model="pageNumber" :length="parseInt(totalPage)" :total-visible="5"
            prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import baseUrl from '../../connect';
import TableLoading from '../../components/TableLoading.vue'
let formInfo = ref()
let pageNumber = ref(1)
let totalPage = ref()
let sortOrder = ref("DESC");
let stateLabel = ref("Chưa xử lý")
let solveState = ref(0)
const searchTerm = ref("")

function getData() {
    formInfo.value = null
    baseUrl.get("/admin/advisory/" + sortOrder.value + "/" + solveState.value + "/" + pageNumber.value, { params: { keyword: searchTerm.value } })
        .then(response => {
            formInfo.value = response.data.rows
            totalPage.value = response.data.count / 10 + 1
            // formInfo.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
function Newest() {
    sortOrder.value = "DESC";
    getData()
}
function Oldest() {
    sortOrder.value = "ASC";
    getData()
}

function solved() {
    stateLabel.value = "Đã xử lý"
    solveState.value = 1
    getData()
}
function unsolved() {
    stateLabel.value = "Chưa xử lý"
    solveState.value = 0
    getData()
}
function solveAdvisory(id) {
    baseUrl.put("/admin/advisory/" + id).then((response) => {
        getData()
        if (solveState.value == 0) {
            toast.success("Đã chuyển sang mục đã xử lý", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            toast.info("Đã chuyển sang mục chưa xử lý", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }).catch((error) => {
        console.log(error)
    });
}
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleString('vi-VN', options).replace(' tháng ', '/').replace('lúc', '').replace(', ', '/');
}

onMounted(() => {
    getData()
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
    justify-content: space-between;
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