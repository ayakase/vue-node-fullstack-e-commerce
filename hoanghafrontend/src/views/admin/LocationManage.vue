<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div class="admin-tour-crud">

        <div class="sorting-container" style="margin-top: 2rem;">
            <div style="font-size: larger;width: 5rem;">Bộ lọc:</div>
            <div class="sorting-button-container">
                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="color: white;">
                        Địa điểm &nbsp; <i class="fa-solid fa-book"> :</i> {{ regionLabel }}
                    </button>
                    <div class="dropdown-menu" v-if="regionList">
                        <button class="dropdown-item" @click="chooseRegion('', 'Tất cả')">Tất cả</button>
                        <button v-for="region in regionList" class="dropdown-item"
                            @click="chooseRegion(region.slug, region.name)">{{
                                region.name }}</button>
                    </div>
                </div>
                <p>{{ regionSlug }}</p>
                <button class="btn btn-success" @click="fetchLocation"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </div>
        <table v-if="locationTable" class="table table-success table-striped table-hover"
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
                <tr v-for="location in locationTable" :key="location" class="each-tour-row">
                    <td>{{ location.id }}</td>
                    <td>{{ location.name }}</td>
                    <td>{{ location.slug }}</td>
                    <td>{{ location.note }}</td>
                    <td> <button
                            @click="router.push({ path: '/admin/quan-ly-tour/chinh-sua-tour', query: { id: tour.id } })"
                            class="edit-button"><i class=" fa-solid fa-pen-to-square"></i></button>
                    </td>
                    <td> <button class="delete-button" @click="deleteLocation(location.id)"><i
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
                    Địa điểm &nbsp; <i class="fa-solid fa-book"> :</i> {{ addLabel }}
                </button>
                <div class="dropdown-menu">
                    <button v-for="region in regionList" class="dropdown-item"
                        @click="chooseAddRegion(region.id, region.name)">{{
                            region.name }}</button>
                </div>
            </div>
            <button @click="addLocation" class="btn btn-success">
                Khu vực mới <i class=" fa-solid fa-plus"></i>
            </button>
            <p>{{ addRegionId }}</p>
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
let locationTable = ref()
let showOverlay = ref(false);
let regionLabel = ref("Tất cả")
let regionSlug = ref("")
let addLabel = ref();
let addRegionId = ref()
function chooseRegion(id, name) {
    regionSlug.value = id
    regionLabel.value = name
    fetchLocation()
}
function chooseAddRegion(slug, name) {
    addRegionId.value = slug
    addLabel.value = name
}
function fetchLocation() {
    locationTable.value = null
    baseUrl.get('/admin/location/locationlist', { params: { region: regionSlug.value } }).then((response) => {
        locationTable.value = response.data
    })
}
let regionList = ref()
function fetchRegion() {
    baseUrl.get('/admin/location/region')
        .then((response) => {

            regionList.value = response.data
        }).catch((error) => {
            console.log(error)
        })
}
onMounted(() => {
    fetchLocation()
    fetchRegion()
})
function deleteLocation(id) {
    let text = "Bạn có chắc chắn muốn xóa Tour " + id;
    if (confirm(text) == true) {
        baseUrl.delete("/admin/location/" + id)
            .then(response => {
                console.log(response)
                toast.info("Đã xóa", {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                fetchLocation()
            }).catch((error) => {
                console.error(error);
            });
    }
}

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


function addLocation() {
    if (addRegionId.value) {
        showOverlay.value = true;
        let locationData = {
            name: newTitle.value,
            slug: newSlug.value,
            note: newNote.value,
            region_id: addRegionId.value
        }
        baseUrl.post('/admin/location', locationData)
            .then((response) => {
                console.log(response)
                toast.info(response.data, {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                showOverlay.value = false;
                fetchLocation()
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        toast.info("Vui lòng chọn khu vực cho địa điểm của bạn", {
            autoClose: 2000,
            theme: "colored",
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
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