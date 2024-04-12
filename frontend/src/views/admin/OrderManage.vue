<template>
    <div class="order-manage-container">
        <div class="sorting-container">
            <div style="font-size: larger; width: 6rem">Bộ lọc:</div>
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
                <button class="btn btn-success" @click="fetchOrder"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>
        <table v-if="orderTable" class="table table-success table-striped"
            style="width: 80vw;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th style="vertical-align: top;" scope="col">Tên khách hàng</th>
                    <th style="vertical-align: top;" scope="col">Tour</th>
                    <th style="vertical-align: top;" scope="col">Đặt lúc</th>
                    <th>Chi tiết</th>
                    <th style="vertical-align: top;" scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderTable" :key="order" class="each-tour-row">
                    <td>{{ order.name }}</td>
                    <td @click="router.push('/' + order.Tour.slug)">{{ order.Tour.title }}</td>
                    <td>{{ formatDate(order.createdAt) }}</td>
                    <td>
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <a class="detail-popup" v-bind="activatorProps">
                                    Xem &nbsp; <i class="fa-solid fa-circle-info"></i>
                                </a>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card title="Thông tin chi tiết" color="#d1e7dd"
                                    prepend-icon="fa-solid fa-circle-info">
                                    <v-divider :thickness="2"></v-divider>
                                    <v-card-text>Khách hàng: {{ order.name }}</v-card-text>
                                    <v-card-text>Số điện thoại: {{ order.phone }}</v-card-text>
                                    <v-card-text>
                                        Đặt lúc: {{ formatDate(order.createdAt) }}
                                    </v-card-text>
                                    <v-card-text>
                                        Email: {{ order.email }}
                                    </v-card-text>
                                    <v-card-text>
                                        Ghi chú: {{ order.note }}
                                    </v-card-text>
                                    <v-card-item>
                                        <v-table density="compact" style="background:none;">
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Loại khách
                                                    </th>
                                                    <th class="text-left">
                                                        Số lượng
                                                    </th>
                                                </tr>
                                            </thead>
            <tbody>
                <tr>
                    <td>Người lớn (Trên 12 tuổi)</td>
                    <td>{{ order.adult }}</td>
                </tr>
                <tr>
                    <td>Trẻ em(Từ 6 - 10 tuổi)

                    </td>
                    <td>{{ order.teenager }}</td>
                </tr>
                <tr>
                    <td>Trẻ em (Từ 2 - 5 tuổi)</td>
                    <td>{{ order.children }}</td>
                </tr>
                <tr>
                    <td>Trẻ em (Dưới 2 tuổi)

                    </td>
                    <td>{{ order.infant }}</td>
                </tr>
            </tbody>
            </v-table>
            <v-divider></v-divider>
            <v-card-title>Đơn giá tour: <span style="color: orangered;">
                    {{ numeralFormat(order.price) }} VNĐ
                </span></v-card-title>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Thoát" @click="isActive.value = false"></v-btn>
            </v-card-actions>
            </v-card>
</template>
</v-dialog>
</td>
<td v-if="order.solved == 0" style="vertical-align: middle;"> <button class="solve-btn" @click="solveOrder(order.id)"><i
            class="fa-regular fa-circle-check fa-lg"></i></button>
</td>
<td v-else style="vertical-align: middle;"> <button class="solve-btn" @click="solveOrder(order.id)"><i
            class="fa-regular fa-circle-xmark fa-lg"></i></button>
</td>
</tr>

</tbody>
</table>
<TableLoading v-else></TableLoading>
<v-pagination @click="getOrderbyPage" v-model="pageNumber" :length="parseInt(totalPage)" :total-visible="5"
    prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
</div>
</template>

<script setup>
import TableLoading from '../../components/TableLoading.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from 'vue';
import baseUrl from '../../connect';
import { useRouter } from 'vue-router';
const router = useRouter();
let pageNumber = ref(1)
let totalPage = ref()
let sortOrder = ref("DESC");
let orderTable = ref()
let stateLabel = ref("Chưa xử lý")
let solveState = ref(0)
function fetchOrder() {
    orderTable.value = null;
    baseUrl.get("/admin/order/" + sortOrder.value + "/" + solveState.value + "/" + pageNumber.value)
        .then(response => {
            orderTable.value = response.data.rows
            totalPage.value = response.data.count / 10 + 1
        }).catch((error) => {
            console.error(error);
        });
}
onMounted(() => {
    fetchOrder()
})
function Newest() {
    sortOrder.value = "DESC";
    fetchOrder()
}
function Oldest() {
    sortOrder.value = "ASC";
    fetchOrder()
}

function solved() {
    stateLabel.value = "Đã xử lý"
    solveState.value = 1
    fetchOrder()
}
function unsolved() {
    stateLabel.value = "Chưa xử lý"
    solveState.value = 0
    fetchOrder()
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleString('vi-VN', options).replace(' tháng ', '/').replace('lúc', '').replace(', ', '/');
}

function getOrderbyPage() {
    fetchOrder()
}
function solveOrder(id) {
    baseUrl.put("/admin/order/" + id).then((response) => {
        fetchOrder()
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

</script>

<style scoped>
table {
    border-radius: 1rem !important;
    border-collapse: collapse;
    overflow: hidden;
}

.order-manage-container {
    margin-top: 2rem;
    width: 100%;
    /* background-color: blueviolet; */
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

.solve-btn {
    width: 100%;
}

.solve-btn:hover {
    color: white;
}

.detail-popup {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>