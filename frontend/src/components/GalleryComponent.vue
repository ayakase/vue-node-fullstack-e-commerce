<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div class="library-container">
        <div class="images-section">
            <div style="display: flex;flex-direction: row;gap: 2rem;width: 80%;">
                <v-file-input v-model="files" placeholder="Upload your documents" label="Ảnh" multiple
                    prepend-icon="fa-solid fa-images" class="image-upload">
                    <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                            <v-chip size="small" label color="#006400" class="me-2">
                                {{ fileName }}
                            </v-chip>
                        </template>
                    </template>
                </v-file-input>
                <button class="btn btn-success" style="height: 90%;" @click="uploadImage">Tải ảnh lên &nbsp;<i
                        class="fa-solid fa-cloud-arrow-up"></i></button>
            </div>
            <div>
                <p>Chỉ nhận định dạng .png, .jpg, .jpeg, .gif, .webp. Mỗi lần tải lên không quá 10 files để đảm bảo đường
                    truyền</p>
            </div>
            <div style="display: flex; gap: 1rem;width: 100%;flex-wrap: wrap;">
                <div v-for="image in copyUrl" :key="image" class="each-image" @click="showUrl(image)">
                    <v-img cover class=" each-image" :src=image>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template></v-img>
                </div>
            </div>
            <p><b>Đang hiển thị {{ displayCount }} trong số {{ totalCount }} ảnh</b></p>
            <div class="image-grid">
                <div v-for="image in images" :key="image" class="each-image">
                    <v-img cover class="each-image" :src=image.url @click="showUrl(image.url)">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template></v-img>
                </div>

            </div>
            <div class="button-container">
                <!-- <button style="margin: auto; padding: auto;" @click="nextPage" class="load-btn btn btn-success "
                    v-if="nextCursor != null"> Tải thêm </button>
                <button style="margin: auto; padding: auto;" @click="nextPage" class="load-btn btn btn-success " v-else
                    disabled> Tải
                    thêm </button> -->
                <div ref="target" style="margin-top: 10rem;">
                    <h4 v-if="loadMore && nextCursor"> Load thêm...</h4>
                    <h4 v-else>Không còn ảnh</h4>
                </div>
            </div>
        </div>
        <div class="action-section">
            <h3>URL</h3>
            <textarea readonly name="" id="" rows="8" placeholder="" :value=copyUrl>
            </textarea>
            <button class="btn btn-success" style="justify-self: end;align-self: end;font-size:x-large"><i
                    class="fa-regular fa-copy"></i></button>
        </div>
    </div>
</template>

<script setup>
import { useElementVisibility } from '@vueuse/core'

import { ref, watch, onMounted } from 'vue'
import baseUrl from '../connect';
import LoadingOverlay from './LoadingOverlay.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const target = ref(null)
const isVisible = useElementVisibility(target)
watch(isVisible, (newValue, oldValue) => {
    if (newValue === true) {
        loadMore.value = true
        baseUrl.get('/admin/library/' + nextCursor.value)
            .then((response) => {
                showOverlay.value = false
                images.value = images.value.concat(response.data.resources)
                nextCursor.value = response.data.next_cursor
                totalCount.value = response.data.total_count
                displayCount.value = images.value.length
            }).catch((error) => {
                console.log(error)
            })
    }
})
let images = ref()
let files = ref([])
let showOverlay = ref(false)
let loadMore = ref(false)
let copyUrl = ref([])
function showUrl(url) {
    if (copyUrl.value.includes(url)) {
        let index = copyUrl.value.indexOf(url)
        if (index !== -1) {
            copyUrl.value.splice(index, 1)
        }
    } else {
        copyUrl.value.push(url)
    }

}
let totalCount = ref()
let displayCount = ref()

function uploadImage() {
    showOverlay.value = true
    const imageData = new FormData()
    for (const file of files.value) {
        imageData.append('images', file);
    }
    baseUrl.post("/admin/library", imageData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            files.value = []
            showOverlay.value = false
            toast.success("Đã nhận thông tin", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });

        }).then(() => {
            baseUrl.get('/admin/library')
                .then((response) => {
                    images.value = response.data.resources
                    nextCursor.value = response.data.next_cursor
                    showOverlay.value = false
                    totalCount.value = response.data.total_count
                    displayCount.value = images.value.length
                }).catch((error) => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.error(error)
            showOverlay.value = false
            toast.error("Lỗi " + error + " , kiểm tra lại định dạng của files", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
}
let nextCursor = ref(null)
onMounted(() => {
    showOverlay.value = true
    baseUrl.get('/admin/library')
        .then((response) => {
            showOverlay.value = false
            images.value = response.data.resources
            nextCursor.value = response.data.next_cursor
            totalCount.value = response.data.total_count
            displayCount.value = images.value.length
        }).catch((error) => {
            console.log(error)
        })
})
function nextPage() {
    showOverlay.value = true

    baseUrl.get('/admin/library/' + nextCursor.value)
        .then((response) => {
            showOverlay.value = false
            images.value = images.value.concat(response.data.resources)
            nextCursor.value = response.data.next_cursor
            totalCount.value = response.data.total_count
            displayCount.value = images.value.length
        }).catch((error) => {
            console.log(error)
        })
}
</script>

<style scoped>
.library-container {
    margin-bottom: 2rem;
    margin-top: 2rem;
    width: 100%;

    display: flex;
    flex-direction: row;
}

.images-section {
    width: 80%;
    height: 50rem;
    overflow: scroll;
}

html {
    overflow: scroll;
    overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 0;
    background: transparent;
}


.image-grid {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.8rem
}

.each-image {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    background-color: rgb(91, 91, 91);
}

.action-section {
    margin-top: 4rem;
    display: flex;
    width: 20%;
    flex-direction: column;
}

textarea {
    resize: none;
    border: 2px solid gray;
    width: 100%;
}

.image-upload {}

.delete-button {
    position: relative;
    left: 0.2rem;
    top: 0.8rem;
}

.button-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.load-btn {
    width: 10rem;
    height: 3rem;
    font-size: larger;
    font-weight: bold;
}
</style>