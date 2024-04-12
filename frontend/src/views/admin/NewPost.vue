<template>
  <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
  <div class="add-container">
    <h2 style="text-align: center; padding-top: 2rem">Tạo bài viết mới</h2>
    <div class="mb-3">
      <label for="" class="form-label">Tiêu đề</label>
      <input type="text" class="form-control" id="" placeholder="" v-model="postTitle" />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">Slug</label>
      <input type="text" class="form-control" id="" placeholder="" v-model="slug" />
    </div>
    <div class="mb-3 thumbnail">
      <label for="formFile" class="form-label">Hình thu nhỏ</label>
      <input class="form-control" accept="image/*" type="file" id="formFile" @change="processImg" />
      <div style="width: 20rem; margin-top: 1rem">
        <img :src="thumbnailSrc" alt="" style="width: 100%" />
      </div>
    </div>
    <div style="
        width: 12rem;
        display: flex;
        flex-direction: row;
        align-items: center;
      ">
      <v-switch v-model="publishState" label="Xuất bản luôn" color="info" style="margin-right: 1rem"
        hide-details></v-switch>
      <i v-if="publishState" style="color: rgb(0, 102, 255)" class="fa-regular fa-paper-plane"></i>
    </div>
    <div>
      <Editor style="height: 50rem" v-model="postContent" api-key="8gzqmdnsiplu2pd33s0doas4xo8735024fznwlgttd4ldri6"
        :init="{
    plugins:
      '  lists advlist link image table code help wordcount autosave emoticons',
    toolbar:
      ' forecolor backcolor | undo redo | styleselect | bold italic | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'outdent indent | numlist bullist | emoticons',
  }" />
    </div>
    <div class="mt-10 mb-2"></div>
    <div @click="addpost" class="btn btn-success" style="margin-top: 1rem; right: 0; float: right">
      Add post
    </div>
  </div>
</template>

<script setup>
import LoadingOverlay from "../../components/LoadingOverlay.vue";
import baseUrl from "../../connect";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Editor from "@tinymce/tinymce-vue";
import { ref, computed, watch } from "vue";
const publishState = ref(true);
const showOverlay = ref(false);
const thumbnailSrc = ref();
const postTitle = ref("");
const postContent = ref("");
const postThumbnail = ref();
import slugify from 'slugify'

function turnSlug(slug) {
  return slugify(slug, {
    locale: 'vi',
    lower: true,
  })
}
let slug = ref()
watch(postTitle, (newValue) => {
  slug.value = turnSlug(newValue)
})
function processImg(event) {

  if (event.target.files.length) {
    thumbnailSrc.value = URL.createObjectURL(event.target.files[0]);
  }
  postThumbnail.value = event.target.files[0];
}
function addpost() {
  showOverlay.value = true;
  // console.log(postThumbnail.value)
  const postData = new FormData();
  postData.append("postTitle", postTitle.value);
  postData.append("postThumbnail", postThumbnail.value);
  postData.append("postContent", postContent.value);
  postData.append("publishState", publishState.value);
  postData.append("postSlug", slug.value);
  baseUrl
    .post("/admin/post", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status == 200) {
        toast.info("Thêm bài viết thành công", {
          autoClose: 2000,
          theme: "colored",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        showOverlay.value = false;
      } else if (response.status == 404) {
        throw new Error(response.status)
      }
    })
    .catch((error) => {
      showOverlay.value = false;
      toast.error(
        "Lỗi " +
        error +
        " , đảm bảo là bạn đã điền đủ thông tin, hãy đợi 1p rồi submit lại hoặc là reload lại trang",
        {
          autoClose: 1000,
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
