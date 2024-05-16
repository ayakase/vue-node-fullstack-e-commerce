<template>
    <div class="admin-tour-crud">
        <button @click="router.push('/admin/quan-ly-tour/them-tour')" class="btn btn-success add-btn"
            style="margin-bottom: 1rem;">
            Thêm tour mới <i class="fa-solid fa-plus"></i>
        </button>
        <div class="sorting-container">
            <div style="font-size: larger;width: 5rem;">Bộ lọc:</div>
            <div class="sorting-button-container">
                <form class="d-flex search-container">
                    <button class="btn btn-outline-success" @click.prevent=""><i class="fas fa-search"></i></button>
                    <input @keydown.enter.prevent="fetchTour" class="form-control me-2 search-box" type="search"
                        placeholder="Tìm kiếm theo tên" aria-label="Search" v-model="searchTerm">
                </form>
                <!-- <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="color: white">
                        Trạng thái &nbsp; <i class="fa-solid fa-book"> :</i>
                        {{ publishLabel }}
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="published">
                            Đã xuất bản &nbsp;<i class="fa-solid fa-vihara"></i>
                        </button>
                        <button class="dropdown-item" @click="unpublished">
                            Chưa xuất bản &nbsp; <i class="fa-solid fa-flag"></i>
                        </button>
                    </div>
                </div> -->
                <div style="width: 30%; display: flex;justify-content: space-between;"> <button
                        class="sort-button btn btn-success" @click="Newest">Mới
                        nhất &nbsp; <i class="fa-solid fa-arrow-up-wide-short"></i></button>
                    <button class="sort-button btn btn-success" @click="Oldest">Cũ nhất &nbsp; <i
                            class="fa-solid fa-arrow-down-wide-short"></i></button>
                    <button class="btn btn-success" @click="fetchTour"><i class="fa-solid fa-rotate-right"></i></button>
                </div>

            </div>
        </div>
        <table v-if="tourTable" class="table table-success table-striped table-hover"
            style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên tour</th>
                    <th scope="col">Dia diem</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Lịch trình</th>
                    <!-- <th scope="col">Danh mục</th> -->
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
                    <th scope="row" @click="router.push({ path: '/' + tour.slug })">{{ tour.id }}
                    </th>
                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.title }}</td>
                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.Location.name }}</td>

                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.slug }}</td>

                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.schedule }}</td>
                    <!-- <td @click="router.push({ path: '/tour/' + tour.slug })">{{ tour.Category.name }}
                    </td> -->
                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.departure }}
                    </td>
                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.days }}</td>
                    <td @click="router.push({ path: '/' + tour.slug })" v-if="tour.ishottour == 1"> Có
                    </td>
                    <td @click="router.push({ path: '/' + tour.slug })" v-else> Không</td>
                    <td @click="router.push({ path: '/' + tour.slug })">{{ tour.transportation
                        }}</td>
                    <td @click="router.push({ path: '/' + tour.slug })">{{
            formatDate(tour.createdAt)
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
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import baseUrl from '../../connect';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import TableLoading from '../../components/TableLoading.vue';
let pageNumber = ref(1)
let tourTable = ref()
let totalPage = ref()
let publishLabel = ref("Đã xuất bản")
let publishState = ref()
const searchTerm = ref("")

function fetchTour() {
    tourTable.value = null
    baseUrl.get("/admin/tour/fetch/" + sortOrder.value + "/" + pageNumber.value, { params: { keyword: searchTerm.value } })
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
    let text = "Bạn có chắc chắn muốn xóa Tour " + id;
    if (confirm(text) == true) {
        baseUrl.delete("/admin/tour/delete/" + id)
            .then(response => {
                toast.info("Đã xóa", {
                    autoClose: 2000,
                    theme: "colored",
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

.admin-tour-crud {
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.search-container {
    width: 50%
}
</style>