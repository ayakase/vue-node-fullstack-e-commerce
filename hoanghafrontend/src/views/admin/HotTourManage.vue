<template>
    <div class="admin-tour-crud">
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
                        Danh mục &nbsp; <i class="fa-solid fa-book"> :</i> {{ categoryLabel }}
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="categoryAll">Tất cả &nbsp;<i
                                class="fa-regular fa-rectangle-list"></i> </button>
                        <button class="dropdown-item" @click="categoryChina">Trung Quốc &nbsp;<i
                                class="fa-solid fa-vihara"></i> </button>
                        <button class="dropdown-item" @click="categoryDomestic">Trong nước &nbsp; <i
                                class="fa-solid fa-flag"></i> </button>
                        <button class="dropdown-item" @click="categoryGlobal">Quốc tế &nbsp; <i
                                class="fa-solid fa-globe"></i></button>
                    </div>
                </div>
                <button class="sort-button btn btn-success" @click="Newest">Mới nhất &nbsp; <i
                        class="fa-solid fa-arrow-up-wide-short"></i></button>
                <button class="sort-button btn btn-success" @click="Oldest">Cũ nhất &nbsp; <i
                        class="fa-solid fa-arrow-down-wide-short"></i></button>
                <button class="btn btn-success" @click="fetchTour"><i class="fa-solid fa-rotate-right"></i></button>
                <!-- <button class="sort-button btn btn-success">Chưa xử lý &nbsp; <i
                        class="fa-solid fa-hourglass fa-spin"></i></button>
                <button class="sort-button btn btn-success">Đã xử lí &nbsp; <i
                        class="fa-solid fa-check fa-beat"></i></button> -->
            </div>
        </div>
        <table v-if="tourTable" class="table table-success table-striped table-hover"
            style="width: 80vw;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên tour</th>
                    <th scope="col">Lịch trình</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Khởi hành</th>
                    <th scope="col">Số ngày</th>
                    <th scope="col">Tour Hot</th>
                    <th scope="col">Phương tiện</th>
                    <th scope="col"> Tạo lúc </th>
                    <th scope="col"> Chỉnh sửa </th>
                    <th scope="col"> Xóa</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tour in tourTable" :key="tour" class="each-tour-row">
                    <th scope="row" @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.id }}</th>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.title }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.schedule }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.Category.name }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.departure }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.days }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">Có</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ tour.transportation }}</td>
                    <td @click="router.push({ path: '/tourdetail', query: { id: tour.id } })">{{ formatDate(tour.createdAt)
                    }}</td>
                    <td> <button
                            @click="router.push({ path: '/admin/quan-ly-tour/chinh-sua-tour', query: { id: tour.id } })"
                            class="edit-button"><i class=" fa-solid fa-pen-to-square"></i></button>
                    </td>
                    <td> <button class="delete-button" @click="deleteTour(tour.id)"><i
                                class="fa-solid fa-trash"></i></button></td>
                </tr>

            </tbody>
        </table>
        <TableLoading v-else></TableLoading>
        <v-pagination @click="getTourbyPage" v-model="pageNumber" :length="totalPage" :total-visible="5"
            prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import baseUrl from '../../connect';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import TableLoading from '../../components/TableLoading.vue';
const router = useRouter();
let pageNumber = ref(1)
let tourTable = ref()
let totalPage = ref()
function fetchTour() {
    tourTable.value = null
    baseUrl.get("/admin/hottour/" + categoryNumber.value + "/" + sortOrder.value + "/" + pageNumber.value)
        .then(response => {

            tourTable.value = response.data.rows
            totalPage.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
onMounted(() => {
    fetchTour()
})
function getTourbyPage() {
    fetchTour()
}
function deleteTour(id) {
    console.log(id)
    let text = "Bạn có chắc chắn muốn xóa Tour " + id;
    if (confirm(text) == true) {
        baseUrl.delete("/admin/tour/" + id)
            .then(response => {
                toast.success("Đã xóa", {
                    autoClose: 2000,
                    theme: "dark",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                fetchTour()
            }).catch((error) => {
                console.error(error);
            });

    }

}
let categoryLabel = ref("Tất cả")
let categoryNumber = ref(0)

function categoryAll() {
    categoryLabel.value = "Tất cả"
    categoryNumber.value = 0
    fetchTour()

}
function categoryChina() {
    categoryLabel.value = "Trung Quốc"
    categoryNumber.value = 1
    fetchTour()
}
function categoryDomestic() {
    categoryLabel.value = "Trong nước"
    categoryNumber.value = 2

    fetchTour()

} function categoryGlobal() {
    categoryLabel.value = "Quốc tế"
    categoryNumber.value = 3

    fetchTour()

}
// sắp xếp
let sortOrder = ref("DESC")
function Newest() {
    sortOrder.value = "DESC"

    fetchTour()
}
function Oldest() {
    sortOrder.value = "ASC"

    fetchTour()
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleString('vi-VN', options).replace(' tháng ', '/').replace('lúc', '').replace(', ', '/');
}
</script>

<style scoped>
table {
    border-radius: 1rem !important;
    border-collapse: collapse;
    overflow: hidden;
}

th {
    vertical-align: top;
}

.admin-tour-crud {
    margin-top: 2rem;
    width: 100%;
}

.add-btn {
    margin-top: 2rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.edit-button {
    width: 100%;
}

.edit-button:hover {
    color: white;
}

.delete-button {
    width: 100%;
}

.delete-button:hover {
    color: white;

}

.sorting-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
}

.sorting-button-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.sort-button {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

/* .each-tour-row {
    transition: color .2s ease-in;

} */

.each-tour-row:hover {
    color: aliceblue !important;
    cursor: pointer;
}
</style>