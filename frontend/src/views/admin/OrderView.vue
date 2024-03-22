<template>
    <div class="order-detail-container">
        <h3>Thong tin khach hang </h3>
        <div>Ho va ten: {{ name }}</div>
        <div>So dien thoai: {{ phone }}</div>
        <div> Email: {{ email }}</div>
        <div>Ngay dat: {{ orderDate }}</div>
        <div>So nguoi: </div>
        <div>{{ adult }}</div>
        <div>{{ teenager }}</div>
        <div>{{ children }}</div>
        <div>{{ infant }}</div>
        <div>Note: {{ note }}</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import baseUrl from '../../connect';
const order = ref()
const adult = ref()
const children = ref()
const teenager = ref()
const infant = ref()
const orderDate = ref()
const name = ref()
const phone = ref()
const email = ref()
const note = ref()
const tour = ref()
const route = useRoute();
onMounted(() => {
    
    baseUrl.get("admin/each-order/" + route.params.id)
        .then(response => {
            
            order.value = response.data[0]
            adult.value = order.value.adult
            children.value = order.value.children
            teenager.value = order.value.teenager
            infant.value = order.value.infant
            orderDate.value = order.value.createdAt
            name.value = order.value.name
            phone.value = order.value.phone
            email.value = order.value.email
            note.value = order.value.note
            tour.value = order.value.Tour
        })
        .catch(error => { console.log(error) })

})
</script>

<style scoped>
.order-detail-container {
    width: 80%;
    margin: auto;
    padding: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 2rem;
    background-color: #f1faf4;
    font-size: larger;
}
</style>