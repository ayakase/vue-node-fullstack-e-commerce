<template>
    <div class="add-container">
        <h2 style="text-align: center; padding-top: 2rem;">Chỉnh sửa nội dung Tour</h2>
        <div class="mb-3">
            <label for="" class="form-label">Tiêu đề tour</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tourTitle">
        </div>
        <div class="mb-3 thumbnail">
            <label for="formFile" class="form-label">Hình thu nhỏ</label>
            <input class="form-control" accept="image/*" type="file" id="formFile" @change="processImg">
            <div style="width: 20rem;margin-top: 1rem;">
                <img :src=thumbnailSrc alt="" style="width: 100%;">
            </div>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Lịch Trình</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="tourSchedule">
        </div>
        <div class="category-type-from">
            <div class="mb-3 w-25">
                <label for="" class="form-label">Danh mục </label>
                <select class="form-select  mb-3" aria-label="Smal select example" v-model="tourCategory">
                    <option value="1">Du lịch Trung Quốc</option>
                    <option value="2">Du lịch trong nước</option>
                    <option value="3">Du lịch quốc tế</option>
                </select>
            </div>
            <div class="mb-3 w-25">
                <label for="" class="form-label">Loại tour </label>
                <select class="form-select  mb-3" aria-label="Small select example" v-model="tourType">
                    <option value="Ghép đoàn" selected>Ghép đoàn</option>
                    <option value="Đi riêng">Đi riêng</option>
                    <option value="Ghép đoàn / Đi riêng">Ghép đoàn/đi riêng</option>
                </select>
            </div>
            <div class="mb-3 w-25">
                <label for="" class="form-label">Khởi hành từ</label>
                <input type="text" class="form-control" id="" placeholder="" v-model="tourFrom">
            </div>
        </div>

        <label for="" class="form-label">Thời gian: {{ tourLength }}N{{ tourLength - 1 }}Đ</label>
        <div style="display: flex;flex-direction: row;align-items: center; ">
            <div class="w-25" style="margin-right: 5rem;">
                <input type="number" class="form-control" id="" placeholder="" v-model="tourLength">
            </div>
            <div style="display: flex; flex-direction: row;align-items: center;">
                <v-switch v-model="isHot" label="Tour hot" color="orange-darken-3" style="margin-right: 1rem;"
                    hide-details></v-switch>
                <i v-if="isHot" style="color: orangered;" class="fa-solid fa-fire fa-bounce"></i>

            </div>
        </div>
        <div class="mb-3 w-50">
            <label for="" class="form-label">Di chuyển: <span v-for="transport in tourTransport" :key="transport">
                    {{ transport }}, </span></label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Máy bay" id="plane-check" v-model="tourTransport">
                <label class="form-check-label" for="plane-check">
                    Máy bay
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Ô tô" id="car-check" v-model="tourTransport">
                <label class="form-check-label" for="car-check">
                    Ô tô
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Tàu hỏa" id="train-check" v-model="tourTransport">
                <label class="form-check-label" for="train-check">
                    Tàu hỏa
                </label>
            </div>
        </div>
        <div class="recommend-container" style="width: 60%; display: flex; flex-direction: row;">
            <label for="customRange2" class="form-label" style="width: 10rem;">Mức độ đề xuất:</label>
            <p style="width: 2rem;margin-right: 1rem;color:red;font-weight: bold;" :style="{ color: recommendColor }">{{
                recommendText }}</p>
            <input type="range" class="form-range" min="0" max="10" id="customRange2" step="0.5" v-model="recommendText">
        </div>
        <div class="age-price">
            <div class="mb-3 w-25">
                <label for="" class="form-label">Giá Người lớn (VNĐ)</label>
                <input type="number" class="form-control" id="" placeholder="" v-model="adultPrice">
            </div>
            <div class="mb-3 w-25">
                <label for="" class="form-label">Giá trẻ em(Từ 5-11 tuổi) (VNĐ)</label>
                <input type="number" class="form-control" id="" placeholder="" v-model="youngPrice">
            </div>
            <div class="mb-3 w-25">
                <label for="" class="form-label">Giá trẻ em (Dưới 5 tuổi) (VNĐ)</label>
                <input type="number" class="form-control" id="" placeholder="" v-model="childPrice">
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
                    <Editor v-model="tourSpecial" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
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
                    <Editor v-model="tourBonus" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
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
                    <Editor v-model="tourVisa" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
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
                    <Editor v-model="tourDetail" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
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
                    <Editor v-model="tourPriceService" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
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
                    <Editor v-model="tourGuide" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6" :init="{
                        plugins: ' textcolor lists advlist link image table code help wordcount autosave emoticons',
                        toolbar: ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'outdent indent | numlist bullist | emoticons',
                    }" />
                </div>
            </div>
        </div>
        <div @click="addTour" class="btn btn-success" style="margin-top: 1rem;right: 0;float: right;">Lưu Tour</div>
    </div>
</template>

<script setup>
import baseUrl from '../../connect';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Editor from '@tinymce/tinymce-vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(() => {

})
let tourTitle = ref("")
let tourThumbnail = ref(null)
let tourSchedule = ref("")
let tourCategory = ref()
let tourType = ref("")
let tourFrom = ref("")
let tourLength = ref(1)
let isHot = ref(false)
let tourTransport = ref([])
let adultPrice = ref()
let youngPrice = ref()
let childPrice = ref()
let tourSpecial = ref()
let tourBonus = ref()
let tourVisa = ref()
let tourDetail = ref()
let tourPriceService = ref()
let tourGuide = ref()
let recommendText = ref(0)
let recommendColor = computed(() => {
    if (recommendText.value >= 0 && recommendText.value <= 3) {
        return 'red';
    } else if (recommendText.value > 3 && recommendText.value <= 6) {
        return 'orange';
    } else if (recommendText.value > 6 && recommendText.value <= 8) {
        return 'blue';
    } else {
        return 'green';
    }
});
const thumbnailSrc = ref()
function processImg(event) {

    if (event.target.files.length) {
        thumbnailSrc.value = URL.createObjectURL(event.target.files[0]);
    }
    tourThumbnail.value = event.target.files[0]
}
function addTour() {
    // console.log(tourThumbnail.value)
    const tourData = new FormData();
    tourData.append('tourTitle', tourTitle.value);
    tourData.append('tourThumbnail', tourThumbnail.value);
    tourData.append('tourSchedule', tourSchedule.value);
    tourData.append('tourCategory', tourCategory.value);
    tourData.append('tourType', tourType.value);
    tourData.append('tourFrom', tourFrom.value);
    tourData.append('tourLength', tourLength.value);
    tourData.append('isHot', isHot.value);
    tourData.append('tourTransport', tourTransport.value.toString());
    tourData.append('adultPrice', adultPrice.value);
    tourData.append('youngPrice', youngPrice.value);
    tourData.append('childPrice', childPrice.value);
    tourData.append('tourSpecial', tourSpecial.value);
    tourData.append('tourBonus', tourBonus.value);
    tourData.append('tourVisa', tourVisa.value);
    tourData.append('tourDetail', tourDetail.value);
    tourData.append('tourPriceService', tourPriceService.value);
    tourData.append('tourGuide', tourGuide.value);

    baseUrl.post("/admin/tour", tourData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => {

            toast.success("Đã nhận thông tin", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
        .catch(error => {
            console.error(error)
            toast.error("Lỗi " + error + " , đảm bảo là bạn đã điền đủ thông tin, hãy đợi 1p rồi submit lại hoặc là reload lại trang", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
}

</script>

<style  scoped>
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
</style>