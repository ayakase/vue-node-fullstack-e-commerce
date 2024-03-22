<template>
    <div class="order-manage-container">
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
                <button class="btn btn-success" @click="fetchOrder"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>
        <table v-if="orderTable" class="table table-success table-striped"
            style="width: 80vw;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th style="vertical-align: top;" scope="col">Tên tour</th>
                    <th style="vertical-align: top;" scope="col">Khách hàng</th>
                    <th style="vertical-align: top;" scope="col">SĐT</th>
                    <th style="vertical-align: top;" scope="col">Ngày đặt</th>
                    <th style="vertical-align: top;" scope="col">Email</th>
                    <th style="vertical-align: top;" scope="col">Trẻ em (dưới 5)</th>
                    <th style="vertical-align: top;" scope="col">Trẻ em (5-11) tuổi</th>
                    <th style="vertical-align: top;" scope="col"> Người lớn (trên 12 tuổi) </th>
                    <th style="vertical-align: top;" scope="col"> Ghi chú</th>
                    <th style="vertical-align: top;" scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderTable" :key="order" class="each-tour-row">
                    <td @click="router.push({ path: '/order/' + order.id })">{{ order.Tour.title }}</td>
                    <td>{{ order.name }}</td>
                    <td>{{ order.phone }}</td>
                    <td>{{ formatDate(order.createdAt) }}</td>
                    <td>{{ order.email }}</td>
                    <td>{{ order.children }}</td>
                    <td>{{ order.teenager }}</td>
                    <td>{{ order.adult }}</td>
                    <td>{{ order.note }}</td>
                    <td v-if="order.solved == 0" style="vertical-align: middle;"> <button class="solve-btn"
                            @click="solveOrder(order.id)"><i class="fa-regular fa-circle-check fa-lg"></i></button>
                    </td>
                    <td v-else style="vertical-align: middle;"> <button class="solve-btn" @click="solveOrder(order.id)"><i
                                class="fa-regular fa-circle-xmark fa-lg"></i></button>
                    </td>
                </tr>

            </tbody>
        </table>
        <TableLoading v-else></TableLoading>
        <v-pagination @click="getOrderbyPage" v-model="pageNumber" :length="totalPage" :total-visible="5"
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
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
</style>