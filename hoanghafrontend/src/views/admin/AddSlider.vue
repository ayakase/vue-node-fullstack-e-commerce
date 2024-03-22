<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div class="add-container">
        <h2 style="text-align: center; padding-top: 2rem">Tạo Slide mới</h2>
        <div class="mb-3">
            <label for="" class="form-label">Tiêu đề</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="slideTitle" />
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Liên kết</label>
            <input type="text" class="form-control" id="" placeholder="" v-model="slideUrl" />
        </div>
        <div class="mb-3 thumbnail">
            <label for="formFile" class="form-label">Hình ảnh</label>
            <input class="form-control" accept="image/*" type="file" id="formFile" @change="processImg" />
            <div style="width: 20rem; margin-top: 1rem">
                <img :src="thumbnailSrc" alt="" style="width: 100%" />
            </div>
        </div>
        <div style="width: 20rem; margin-top: 1rem">
            <img :src="slideImageSrc" alt="" style="width: 100%" />
        </div>
        <div class="mt-10 mb-2"></div>
        <div @click="addSlide" class="btn btn-success" style="margin-top: 1rem; right: 0; float: right">
            Tạo mới
        </div>
    </div>
</template>
  
<script setup>

import LoadingOverlay from "../../components/LoadingOverlay.vue";
import baseUrl from "../../connect";
import { toast } from "vue3-toastify";
import { ref, computed } from "vue";
const showOverlay = ref(false);

let slideTitle = ref()
let slideUrl = ref()
let slideImage = ref()
let slideImageSrc = ref()
function processImg(event) {
    
    if (event.target.files.length) {
        slideImageSrc.value = URL.createObjectURL(event.target.files[0]);
    }
    slideImage.value = event.target.files[0];
}
function addSlide() {
    showOverlay.value = true;
    const slideData = new FormData();
    slideData.append("title", slideTitle.value);
    slideData.append("url", slideUrl.value);
    slideData.append("image", slideImage.value);
    
    baseUrl
        .post("/admin/slider", slideData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            
            showOverlay.value = false;
            toast.success("Đã nhận thông tin", {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
        .catch((error) => {
            console.error(error);
            showOverlay.value = false;
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
        });
}
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
</style>
  