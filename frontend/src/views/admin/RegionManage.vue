<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div class="admin-tour-crud">

        <div class="sorting-container" style="margin-top: 2rem;">
            <div style="font-size: larger;width: 5rem;">Bộ lọc:</div>
            <div class="sorting-button-container">
                <!-- <form class="d-flex search-container">
                    <button class="btn btn-outline-success" @click.prevent=""><i class="fas fa-search"></i></button>
                    <input @keydown.enter.prevent="" class="form-control me-2 search-box" type="search"
                        placeholder="Tìm kiếm theo tên" aria-label="Search">
                </form> -->

                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="color: white;">
                        Danh mục &nbsp; <i class="fa-solid fa-book"> :</i> {{ categoryLabel }}
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="categoryAll">Tất cả &nbsp;<i
                                class="fa-regular fa-rectangle-list"></i> </button>
                        <button class="dropdown-item" @click="categoryDomestic">Trong nước &nbsp; <i
                                class="fa-solid fa-flag"></i> </button>
                        <button class="dropdown-item" @click="categoryGlobal">Quốc tế &nbsp; <i
                                class="fa-solid fa-globe"></i></button>
                    </div>
                </div>
                <button class="btn btn-success" @click="fetchRegion"><i class="fa-solid fa-rotate-right"></i></button>
                <!-- <button class="sort-button btn btn-success">Chưa xử lý &nbsp; <i
                        class="fa-solid fa-hourglass fa-spin"></i></button>
                <button class="sort-button btn btn-success">Đã xử lí &nbsp; <i
                        class="fa-solid fa-check fa-beat"></i></button> -->
            </div>
        </div>
        <table v-if="regionTable" class="table table-success table-striped table-hover"
            style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên khu vực</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Note</th>
                    <th scope="col"> Chỉnh sửa </th>
                    <th scope="col"> Xóa</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="region in regionTable" :key="region" class="each-tour-row">
                    <td>{{ region.id }}</td>
                    <td>{{ region.name }}</td>
                    <td>{{ region.slug }}</td>
                    <td>{{ region.note }}</td>
                    <td> <button
                            @click="router.push({ path: '/admin/quan-ly-tour/chinh-sua-tour', query: { id: tour.id } })"
                            class="edit-button"><i class=" fa-solid fa-pen-to-square"></i></button>
                    </td>
                    <td> <button class="delete-button" @click="deleteRegion(region.id)"><i
                                class="fa-solid fa-trash"></i></button></td>
                </tr>

            </tbody>
        </table>
        <TableLoading v-else></TableLoading>
        <div class="add-container">

            <div class="">
                <input v-model="newTitle" type="text" class="form-control" id="" placeholder="Tên khu vực	">
            </div>
            <div class="">
                <input v-model="newSlug" type="text" class="form-control" id="" placeholder="Slug">
            </div>
            <div class="">
                <input v-model="newNote" type="text" class="form-control" id="" placeholder="Note">
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false" style="color: white;">
                    Danh mục &nbsp; <i class="fa-solid fa-book"> :</i> {{ addLabel }}
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" @click="addDomestic">Trong nước &nbsp; <i class="fa-solid fa-flag"></i>
                    </button>
                    <button class="dropdown-item" @click="addGlobal">Quốc tế &nbsp; <i
                            class="fa-solid fa-globe"></i></button>
                </div>
            </div>
            <button @click="addRegion" class="btn btn-success">
                Khu vực mới <i class=" fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import slugify from 'slugify'
import LoadingOverlay from "../../components/LoadingOverlay.vue";
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import baseUrl from '../../connect';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import TableLoading from '../../components/TableLoading.vue';
let regionTable = ref()
let showOverlay = ref(false);
function fetchRegion() {
    regionTable.value = null
    console.log(categoryNumber.value)
    baseUrl.get('/admin/region/' + categoryNumber.value).then((response) => {
        console.log(response)
        regionTable.value = response.data
    })
}
onMounted(() => {
    fetchRegion()
})
function deleteRegion(id) {
    console.log(id)
    let text = "Bạn có chắc chắn muốn xóa Tour " + id;
    if (confirm(text) == true) {
        baseUrl.delete("/admin/region/" + id)
            .then(response => {
                console.log(response)
                toast.info("Đã xóa", {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                fetchRegion()
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
    fetchRegion()

}
function categoryDomestic() {
    categoryLabel.value = "Trong nước"
    categoryNumber.value = 1
    fetchRegion()

} function categoryGlobal() {
    categoryLabel.value = "Quốc tế"
    categoryNumber.value = 2
    fetchRegion()

}
let addLabel = ref("Trong nước")
let addNumber = ref(1)
let newTitle = ref()
let newSlug = ref()
let newNote = ref()
function turnSlug(slug) {
    return slugify(slug, {
        locale: 'vi',
        lower: true,
    })
}
watch(newTitle, (newValue) => {
    newSlug.value = turnSlug(newValue)
})
function addDomestic() {
    addLabel.value = "Trong nước"
    addNumber.value = 1

} function addGlobal() {
    addLabel.value = "Quốc tế"
    addNumber.value = 2
}

function addRegion() {
    showOverlay.value = true;
    let regionData = {
        name: newTitle.value,
        slug: newSlug.value,
        note: newNote.value,
        category_id: addNumber.value
    }
    console.log(regionData)
    baseUrl.post('/admin/region', regionData)
        .then((response) => {
            console.log(response)
            toast.info(response.data, {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            showOverlay.value = false;
            fetchRegion()
        })
        .catch((error) => {
            console.log(error)
        })
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

.add-container {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    margin-bottom: 1rem;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
    background-color: #dbf4e8;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
</style>