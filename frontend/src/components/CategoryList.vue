<template>
    <div v-if="categoryList" class="category-list">
        <div
            style="display: flex;align-items: center;justify-content: center; height: 3rem; padding-left: 1rem; font-size: 20px;font-weight: bold;color: #045B48;">
            Danh mục</div>
        <div v-for="category in categoryList" :key="category">
            <div class="category-title">{{ category.name }}</div>
            <div v-if="category.Regions" v-for="region in category.Regions" :key="region">
                <div class="region-list" @click="router.push({ path: '/khu-vuc/' + region.slug })">{{
        region.name }}
                </div>
                <div v-if="region.Locations" v-for="location in region.Locations">
                    <div class="location-list" @click="router.push({ path: '/dia-diem/' + location.slug })">
                        {{
        location.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import baseUrl from '../connect';
import { useRouter } from 'vue-router';
const router = useRouter();
const categoryList = ref()
const domesticList = ref()
const foreignList = ref()
onMounted(() => {
    baseUrl.get("/client/initial/menu").then(response => {
        categoryList.value = response.data
        domesticList.value = response.data[0]
        foreignList.value = response.data[1]
    })
})
</script>

<style scoped>
.category-list {
    background-color: #97CBB4;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.category-title {
    height: 2rem;
    padding-left: 1rem;
    font-size: large;
    font-weight: bold;
    background-color: #F1FAF4;
    display: flex;
    align-items: center;

}

.category-title:hover {
    background-color: rgb(69, 169, 147);
    cursor: pointer;
    color: white;
}

.region-list {
    height: 2rem;
    width: 100%;
    padding-left: 2rem;
    font-size: large;
    font-weight: bold;
    background-color: #F1FAF4;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.location-list {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 3rem;
    background-color: #F1FAF4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.region-list:hover {
    background-color: rgb(69, 169, 147);
    cursor: pointer;
    color: white;
}

.location-list:hover {
    background-color: rgb(69, 169, 147);
    cursor: pointer;
    color: white;

}

@media screen and (max-width: 1136px) {
    .category-list {
        display: none;
    }
}
</style>