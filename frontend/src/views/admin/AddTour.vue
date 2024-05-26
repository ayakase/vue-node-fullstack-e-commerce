<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div class="add-container">
        <h2 style="text-align: center; padding-top: 2rem">Thêm Tour mới</h2>
        <div class="mb-3">
            <label for="" class="form-label">Tiêu đề tour</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tourTitle" />
        </div>
        <div class="mb-3 thumbnail">
            <label for="formFile" class="form-label">Hình thu nhỏ</label>
            <input class="form-control" accept="image/*" type="file" id="formFile" @change="processImg" />
            <div style="width: 20rem; margin-top: 1rem">
                <img :src="thumbnailSrc" alt="" style="width: 100%" />
            </div>
        </div>
        <div class="form-label">Thư viện ảnh</div>
        <button style="color: white;margin-bottom: 2rem;" class="btn btn-success" @click="toggleGallery">Mở thư
            viện</button>
        <!-- <GalleryComponent v-if="showGallery"></GalleryComponent> -->
        <!-- <p>{{ imageArray }}</p> -->
        <div v-if="showGallery">
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
                <p>Chỉ nhận định dạng .png, .jpg, .jpeg, .gif, .webp.</p>
            </div>
            <div style="display: flex; gap: 1rem;width: 100%;flex-wrap: wrap;">
                <div v-for="image in imageArray" :key="image" class="each-image" @click=" addImg(image)">
                    <v-img cover class=" each-image" :src=image style="height: 100%;">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template></v-img>
                </div>
            </div>
            <p><b>Đang hiển thị {{ displayCount }} trong số {{ totalCount }} ảnh</b></p>
            <button @click="reloadGalery()" class="btn btn-success" style="color:white;">Tải lại</button>
            <!-- <LoadingOverlay v-if="showOverlay"></LoadingOverlay> -->
            <div class="library-container">
                <div class="images-section">

                    <div class="image-grid">
                        <div v-for="image in images" :key="image" class="each-image"
                            :class="{ 'image-selected': isSelected(image.url) }">
                            <v-img cover class=" each-image" :src=image.url @click="addImg(image.url)">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template></v-img>
                        </div>

                    </div>
                    <div class="button-container">
                        <div ref="target" style="margin-top: 5rem;">
                            <h4 v-if="loadMore && nextCursor"> Đang load thêm ảnh...</h4>
                            <!-- <TableLoading v-if="loadMore && nextCursor"></TableLoading> -->
                            <h4 v-else>Không còn ảnh</h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="mb-3">
            <label for="custom-slug" class="form-label">Custom slug</label>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">/</span>
                <input v-model="slug" type="text" class="form-control" placeholder="vi-du" id="custom-slug">
            </div>

        </div>
        <!-- <div class="mb-3">
            <label for="" class="form-label">Tik Tok Video ID</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tiktokId" />
        </div> -->
        <div class="mb-3">
            <label for="" class="form-label">Lịch Trình</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tourSchedule" />
        </div>
        <div v-if="tourCategory" style="display: flex;align-items: center;gap: 1rem;">
            <div class="mb-3 w-25">
                <label for="" class="form-label">Danh mục </label>
                <select class="form-select mb-3" aria-label="Smal select example" v-model="selectCategory">
                    <option v-for="category in tourCategory" :key="category" :value=category>
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <i class="fa-solid fa-caret-right" style="font-size: 2rem;padding-top: 0.5rem;" v-if="selectCategory"></i>
            <div class="mb-3 w-25" v-if="selectCategory">
                <label for="" class="form-label">Khu vực </label>
                <select class="form-select mb-3" aria-label="Smal select example" v-model="selectRegion">
                    <option v-for="region in selectCategory.Regions" :key="region" :value=region>
                        {{ region.name }}
                    </option>
                </select>
            </div>
            <i class="fa-solid fa-caret-right" style="font-size: 2rem;padding-top: 0.5rem;" v-if="selectRegion"></i>
            <div class="mb-3 w-25" v-if="selectRegion">
                <label for="" class="form-label">Địa điểm </label>
                <select class="form-select mb-3" aria-label="Smal select example" v-model="selectLocation">
                    <option v-for="location in selectRegion.Locations" :key="location" :value=location>
                        {{ location.name }}
                    </option>
                </select>
            </div>
            <i class="fa-solid fa-caret-right" style="font-size: 2rem;padding-top: 0.5rem;" v-if="selectRegion"></i>
            <p v-if="selectLocation"
                style="margin: 0;padding-top: 8px;font-size: large;font-weight: bolder;color: red;">{{
        selectLocation.name }}
            </p>
        </div>
        <div class="category-type-from">


            <div class="mb-3 w-25">
                <label for="" class="form-label">Loại tour </label>
                <select class="form-select mb-3" aria-label="Small select example" v-model="tourType">
                    <option value="Ghép đoàn" selected>Ghép đoàn</option>
                    <option value="Đi riêng">Đi riêng</option>
                    <option value="Ghép đoàn / Đi riêng">Ghép đoàn/đi riêng</option>
                </select>
            </div>
            <div class="w-25" style="margin-right: 5rem">
                <label for="" class="form-label">Thời gian: {{ tourLength }}N{{ tourLength - 1 }}Đ</label>
                <input min="1" max="20" type="number" class="form-control" id="" placeholder="" v-model="tourLength" />
            </div>
            <div class="mb-3 w-25">
                <label for="" class="form-label">Khởi hành từ</label>
                <input type="text" class="form-control" id="" placeholder="" v-model="tourFrom" />
            </div>
        </div>
        <div style="display: flex; width: 40rem;justify-content: space-between;align-items: center;">
            <div style="display: flex; flex-direction: row; align-items: center">
                <v-switch v-model="isHot" label="Tour hot" color="orange-darken-3" style="margin-right: 1rem"
                    hide-details></v-switch>
                <i v-if="isHot" style="color: orangered;font-size: 2rcap;" class="fa-solid fa-fire  fa-bounce"></i>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;width: 11rem;">
            <v-switch v-model="isDiscount" label="Khuyến mại" color="green-darken-3" style="margin-right: 1rem"
                hide-details></v-switch>
            <i v-if="isDiscount" class="fa-solid fa-beat-fade fa-tags" style="color: #42ae49;font-size: 2rcap;"></i>
        </div>
        <div class="w-25 mb-3" v-if="isDiscount">
            <label for="" class="form-label">Giá Người lớn gốc (chưa giảm)</label>
            <input type="number" class="form-control" id="" placeholder="" v-model="originalPrice" />
        </div>
        <div class="mb-3 w-50">
            <label for="" class="form-label">Di chuyển:
                <span>
                    {{ tourTransport }}
                </span></label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tourTransport" />
        </div>
        <div class="recommend-container" style="width: 60%; display: flex; flex-direction: row">
            <label for="customRange2" class="form-label" style="width: 10rem">Mức độ đề xuất:</label>
            <p style="width: 2rem; margin-right: 1rem; color: red; font-weight: bold"
                :style="{ color: recommendColor }">
                {{ recommendText }}
            </p>
            <input type="range" class="form-range" min="0" max="10" id="customRange2" step="0.5"
                v-model="recommendText" />
        </div>
        <div class="age-price">
            <div class="mb-3 w-20">
                <label for="" class="form-label">Giá Người lớn (Trên 12 tuổi) <span v-if="isDiscount"
                        style="font-weight: bold;color: red;">(Ưu
                        đãi)</span>
                </label>
                <input type="number" class="form-control" id="" placeholder="" v-model="adultPrice" />
            </div>
            <div class="mb-3 w-20">
                <label for="" class="form-label">Giá trẻ em(Từ 6 - 10 tuổi) </label>
                <input type="number" class="form-control" id="" placeholder="" v-model="teenagerPrice" />
            </div>
            <div class="mb-3 w-20">
                <label for="" class="form-label">Giá trẻ em (Từ 2 - 5 tuổi) </label>
                <input type="number" class="form-control" id="" placeholder="" v-model="childPrice" />
            </div>
            <div class="mb-3 w-20">
                <label for="" class="form-label">Giá trẻ em (Dưới 2 tuổi) </label>
                <input type="number" class="form-control" id="" placeholder="" v-model="infantPrice" />
            </div>
        </div>
        <div class="accordion" id="">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-special" aria-expanded="true" aria-controls="accordion-special">
                        Điểm khác biệt
                    </button>
                </h2>
                <div id="accordion-special" class="accordion-collapse collapse show">
                    <Editor v-model="tourSpecial" :api-key="tinyMceKey" :init="{
        plugins:
            '  lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-bonus" aria-expanded="false" aria-controls="accordion-bonus">
                        Dịch vụ đi kèm
                    </button>
                </h2>
                <div id="accordion-bonus" class="accordion-collapse collapse">
                    <Editor v-model="tourBonus" :api-key="tinyMceKey" :init="{
        plugins:
            '  lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-visa" aria-expanded="false" aria-controls="accordion-visa">
                        Visa
                    </button>
                </h2>
                <div id="accordion-visa" class="accordion-collapse collapse">
                    <Editor v-model="tourVisa" :api-key="tinyMceKey" :init="{
        plugins:
            '  lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-detail" aria-expanded="false" aria-controls="accordion-detail">
                        Lịch trình chi tiết
                    </button>
                </h2>
                <div id="accordion-detail" class="accordion-collapse collapse">
                    <Editor v-model="tourDetail" :api-key="tinyMceKey" :init="{
        plugins:
            '  lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-price-service" aria-expanded="false"
                        aria-controls="accordion-price-service">
                        Bảng giá và dịch vụ
                    </button>
                </h2>
                <div id="accordion-price-service" class="accordion-collapse collapse">
                    <Editor v-model="tourPriceService" :api-key="tinyMceKey" :init="{
        plugins:
            ' lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordion-guide" aria-expanded="false" aria-controls="accordion-guide">
                        Lưu ý và hướng dẫn
                    </button>
                </h2>
                <div id="accordion-guide" class="accordion-collapse collapse">
                    <Editor v-model="tourGuide" :api-key="tinyMceKey" :init="{
        plugins:
            '  lists advlist link image table code help wordcount autosave emoticons',
        toolbar:
            ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | emoticons',
    }" />
                </div>
            </div>
        </div>
        <div class="mt-10 mb-2"></div>
        <div @click="addTour" class="btn btn-success" style="margin-top: 1rem; right: 0; float: right">
            Add Tour
        </div>
    </div>
</template>

<script setup>
import slugify from 'slugify'
import LoadingOverlay from "../../components/LoadingOverlay.vue";
import TableLoading from '../../components/TableLoading.vue';
import baseUrl from "../../connect";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Editor from "@tinymce/tinymce-vue";
import { ref, computed, onMounted, watch } from "vue";
const tinyMceKey = import.meta.env.VITE_TINYMCE
const publishState = ref(true);
const images = ref()
const files = ref([])
const showOverlay = ref(false)
const loadMore = ref(false)
const imageArray = ref([])
import { useElementVisibility } from '@vueuse/core'
const target = ref(null)
const isVisible = useElementVisibility(target)
let showGallery = ref()
function toggleGallery() {
    showGallery.value = !showGallery.value
}
const tourTitle = ref("");
const tourThumbnail = ref(null);
const tourSchedule = ref("");
const tourType = ref("");
const tourFrom = ref("");
const tourLength = ref(1);
const isHot = ref(false);
const tourTransport = ref();
const adultPrice = ref(0);
const teenagerPrice = ref(0);
const childPrice = ref(0);
const infantPrice = ref(0)
const tourSpecial = ref('');
const tourBonus = ref('');
const tourVisa = ref('');
const tourDetail = ref('');
const tourPriceService = ref('');
const tourGuide = ref('');
const recommendText = ref(0);
const isDiscount = ref(false);
const originalPrice = ref(0);
function turnSlug(slug) {
    return slugify(slug, {
        locale: 'vi',
        lower: true,
    })
}
let slug = ref()
watch(tourTitle, (newValue) => {
    slug.value = turnSlug(newValue)
})
let tourCategory = ref();
let selectCategory = ref()
let selectRegion = ref()
let selectLocation = ref()
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
    baseUrl
        .get("/admin/tour/choose-category").then((response) => {

            tourCategory.value = response.data
        })
})
let recommendColor = computed(() => {
    if (recommendText.value >= 0 && recommendText.value <= 3) {
        return "red";
    } else if (recommendText.value > 3 && recommendText.value <= 6) {
        return "orange";
    } else if (recommendText.value > 6 && recommendText.value <= 8) {
        return "blue";
    } else {
        return "green";
    }
});
const thumbnailSrc = ref();
function processImg(event) {

    if (event.target.files.length) {
        thumbnailSrc.value = URL.createObjectURL(event.target.files[0]);
    }
    tourThumbnail.value = event.target.files[0];
}
function addTour() {
    if (selectLocation.value) {
        showOverlay.value = true;
        const tourData = new FormData();
        tourData.append("tourTitle", tourTitle.value);
        tourData.append("tourThumbnail", tourThumbnail.value);
        tourData.append("slug", slug.value)
        tourData.append("tourSchedule", tourSchedule.value);
        tourData.append("tourLocation", selectLocation.value.id);
        tourData.append("images", imageArray.value);
        tourData.append("tourType", tourType.value);
        tourData.append("tourFrom", tourFrom.value);
        tourData.append("tourLength", tourLength.value);
        tourData.append("isHot", isHot.value);
        tourData.append("recommend", recommendText.value);
        tourData.append("tourTransport", tourTransport.value.toString());
        tourData.append("originalPrice", originalPrice.value);
        tourData.append("adultPrice", adultPrice.value);
        tourData.append("teenagerPrice", teenagerPrice.value);
        tourData.append("childPrice", childPrice.value);
        tourData.append("infantPrice", infantPrice.value);
        tourData.append("tourSpecial", tourSpecial.value);
        tourData.append("tourBonus", tourBonus.value);
        tourData.append("tourVisa", tourVisa.value);
        tourData.append("tourDetail", tourDetail.value);
        tourData.append("tourPriceService", tourPriceService.value);
        tourData.append("tourGuide", tourGuide.value);
        tourData.append("tourDiscount", isDiscount.value);
        baseUrl
            .post("/admin/tour", tourData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                showOverlay.value = false;
                if (response.status == 200) {
                    toast.success("Thêm tour mới thành công", {
                        autoClose: 2000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
                showOverlay.value = false;
                if (error.response.status == 400) {
                    toast.error("Trung slug", {
                        autoClose: 2000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else if (error.response.status == 432) {
                    toast.error("Slug bị trùng với một tour khác, vui lòng thay đổi", {
                        autoClose: 2000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else if (error.response.status == 433) {
                    toast.error("Vui lòng upload ảnh thumbnail", {
                        autoClose: 2000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.error(
                        "Lỗi " +
                        error +
                        " , đảm bảo là bạn đã điền đủ thông tin, hãy đợi 1p rồi submit lại hoặc là reload lại trang",
                        {
                            autoClose: 2000,
                            theme: "colored",
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });

    }
    else {
        toast.error("Vui lòng chọn địa điểm cho tour", {
            autoClose: 2000,
            theme: "colored",
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
}

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

function addImg(url) {
    if (imageArray.value.includes(url)) {
        let index = imageArray.value.indexOf(url)
        if (index !== -1) {
            imageArray.value.splice(index, 1)
        }
    } else {
        imageArray.value.push(url)
    }
}
function isSelected(url) {
    if (imageArray.value.includes(url)) {
        return true
    } else {
        return false
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
            toast.success("Đã tải ảnh lên", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });

        }).then(() => {
            setTimeout(() => {
                reloadGalery()
            }, 1000);
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
function reloadGalery() {
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
}
let nextCursor = ref(null)
// function nextPage() {
//     showOverlay.value = true

//     baseUrl.get('/admin/library/' + nextCursor.value)
//         .then((response) => {
//             showOverlay.value = false
//             console.log(response.data.next_cursor)
//             images.value = images.value.concat(response.data.resources)
//             nextCursor.value = response.data.next_cursor
//             totalCount.value = response.data.total_count
//             displayCount.value = images.value.length
//         }).catch((error) => {
//             console.log(error)
//         })
// }

</script>

<style scoped>
.add-container {
    width: 75vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
    padding-bottom: 4rem;
    margin-bottom: 2rem;
    border-radius: 1rem;
    background-color: #dbf4e8;
}

.category-type-from {
    display: flex;
    justify-content: space-between;
}

.age-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

* {
    color: rgb(75, 75, 75);
}

.library-container {
    margin-bottom: 2rem;
    margin-top: 2rem;
    width: 100%;

    display: flex;
    flex-direction: row;
}

.images-section {
    width: 100%;
    height: 50rem;
    overflow: scroll;
}

html {
    overflow: scroll;
    overflow-x: hidden;
}

/* ::-webkit-scrollbar {
    width: 0;
    background: transparent;
} */


.image-grid {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.8rem
}

.each-image {
    width: 9rem;
    height: 9rem;
    object-fit: cover;
    background-color: rgb(91, 91, 91);
    transition: transform 0.1s linear;
}

.each-image:hover {
    transform: scale(1.05);
}

.image-selected {
    border: solid 4px rgb(255, 0, 0);
    transform: scale(0.95);
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
