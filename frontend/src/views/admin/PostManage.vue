<template>
  <div class="admin-tour-crud">
    <button @click="router.push('/admin/bai-viet/tao-bai-viet')" class="btn btn-success add-btn"
      style="margin-bottom: 1rem">
      Tạo bài viết <i class="fa-solid fa-plus"></i>
    </button>
    <div class="sorting-container">
      <div class="sorting-button-container">
        <div style="font-size: larger">Bộ lọc:</div>
        <form class="d-flex search-container">
          <button class="btn btn-outline-success" @click.prevent="">
            <i class="fas fa-search"></i>
          </button>
          <input @keydown.enter.prevent="" class="form-control me-2 search-box" type="search"
            placeholder="Tìm kiếm theo tên" aria-label="Search" />
        </form>

        <div class="btn-group">
          <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false" style="color: white">
            Trạng thái &nbsp; <i class="fa-solid fa-book"> :</i>
            {{ publishLabel }}
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item" @click="publishedPost">
              Đã xuất bản &nbsp;<i class="fa-solid fa-vihara"></i>
            </button>
            <button class="dropdown-item" @click="unpublishedPost">
              Chưa xuất bản &nbsp; <i class="fa-solid fa-flag"></i>
            </button>
          </div>
        </div>
        <button class="sort-button btn btn-success" @click="Newest">
          Mới nhất &nbsp; <i class="fa-solid fa-arrow-up-wide-short"></i>
        </button>
        <button class="sort-button btn btn-success" @click="Oldest">
          Cũ nhất &nbsp; <i class="fa-solid fa-arrow-down-wide-short"></i>
        </button>
        <button class="btn btn-success" @click="fetchPost">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
        <!-- <button class="sort-button btn btn-success">Chưa xử lý &nbsp; <i
                        class="fa-solid fa-hourglass fa-spin"></i></button>
                <button class="sort-button btn btn-success">Đã xử lí &nbsp; <i
                        class="fa-solid fa-check fa-beat"></i></button> -->
      </div>
    </div>
    <table v-if="postTable" class="table table-success table-striped table-hover"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tiêu đề</th>
          <th scope="col">Slug</th>
          <th scope="col">Ngày đăng</th>
          <th scope="col">Chỉnh sửa</th>
          <th scope="col">Hành động</th>
          <th scope="col">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in postTable" :key="post" class="each-tour-row">
          <td>{{ post.id }}</td>
          <td @click="router.push({ path: '/bai-viet/' + post.slug })">{{ post.title }}</td>
          <td>{{ post.slug }}</td>
          <!-- <td v-html="post.content.slice(0, 200)"></td> -->
          <td>{{ formatDate(post.createdAt) }}</td>
          <td>
            <button @click="
                          router.push({
                            path: '/admin/bai-viet/chinh-sua-bai-viet/' + post.slug
                          })
                          " class="edit-button">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
          <td v-if="post.publish == 1" style="vertical-align: middle">
            <button class="solve-btn" @click="publishPost(post.id)">
              <i class="fa-regular fa-circle-check fa-lg"></i>
            </button>
          </td>
          <td v-else style="vertical-align: middle">
            <button class="solve-btn" @click="publishPost(post.id)">
              <i class="fa-regular fa-circle-xmark fa-lg"></i>
            </button>
          </td>
          <td>
            <button class="delete-button" @click="deleteTour(post.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <TableLoading v-else></TableLoading>
    <v-pagination @click="getTourbyPage" v-model="pageNumber" :length="totalPage" :total-visible="5"
      prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import baseUrl from "../../connect";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import TableLoading from "../../components/TableLoading.vue";
let pageNumber = ref(1);

let postTable = ref();
let totalPage = ref();
let publishState = ref(1);
function fetchPost() {
  postTable.value = null;
  baseUrl
    .get(
      "/admin/post/" +
      publishState.value +
      "/" +
      sortOrder.value +
      "/" +
      pageNumber.value
    )
    .then((response) => {
      
      postTable.value = response.data.rows;
      totalPage.value = response.data.count / 10 + 1;
    })
    .catch((error) => {
      console.error(error);
    });
}
onMounted(() => {
  fetchPost();
});
function getTourbyPage() {
  fetchPost();
}
function deleteTour(id) {
  
  let text = "Bạn có chắc chắn muốn xóa Tour " + id;
  if (confirm(text) == true) {
    baseUrl
      .delete("/admin/post/" + id)
      .then((response) => {
        
        toast.info("Đã xóa", {
          autoClose: 2000,
          theme: "colored",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        fetchPost();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// sắp xếp
let sortOrder = ref("DESC");
function Newest() {
  sortOrder.value = "DESC";
  fetchPost();
}
function Oldest() {
  sortOrder.value = "ASC";
  fetchPost();
}
const publishLabel = ref("Đã xuất bản");
function publishedPost() {
  publishState.value = 1;
  publishLabel.value = "Đã xuất bản";
  fetchPost();
}
function unpublishedPost() {
  publishState.value = 0;
  publishLabel.value = "Chưa xuất bản";
  fetchPost();
}
function publishPost(id) {
}
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(date)
    .toLocaleString("vi-VN", options)
    .replace(" tháng ", "/")
    .replace("lúc", "")
    .replace(", ", "/");
}
</script>

<style scoped>
table {
  border-radius: 1rem !important;
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;
}

td {
  height: 3rem !important;
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
</style>
