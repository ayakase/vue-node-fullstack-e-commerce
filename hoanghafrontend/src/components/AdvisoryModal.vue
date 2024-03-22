<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
    <div style="z-index: 9999;">
        <div style="margin-top: 0rem;" class="modal fade" id="advisoryModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="background-color: F1FAF4;">
                <div class="modal-content" style="background-color: #F1FAF4;">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Để lại thông tin</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="advisory-form-container">
                            <div class="mb-3">
                                <label class="form-label">Họ & Tên <span style="color: red;">*</span></label>
                                <input style="height: 3rem;" class="form-control" id="" placeholder="" v-model="name">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Điện thoại <span style="color: red;">*</span></label>
                                <input style="height: 3rem;" class="form-control" id="" placeholder="" v-model="phone">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email <span style="color: red;">*</span></label>
                                <input type="email" style="height: 3rem;" class="form-control" id="" placeholder=""
                                    v-model="email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ghi chú</label>
                                <textarea class="form-control" rows="3" v-model="note"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a class="btn" style="background-color: #97CBB4;" target="_blank" @click.prevent="sendInfo">Đặt
                            Tour</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingOverlay from './LoadingOverlay.vue';
const props = defineProps(['tourId', 'tourTitle'])
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import baseUrl from '../connect';
import { ref } from 'vue'
const name = ref()
const phone = ref()
const email = ref()
const note = ref()
console.log(props)
const showOverlay = ref(false)
function sendInfo() {
    if (!name.value || !phone.value || !email.value || !note.value) {
        toast.error("Bạn cần điền đầy đủ thông tin", {
            autoClose: 1000,
            theme: "dark",
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    } else {
        showOverlay.value = true
        const formData = {
            name: name.value,
            phone: phone.value,
            email: email.value,
            note: note.value,
            tour_id: props.tourId,
            tour_title: props.tourTitle
        }
        baseUrl.post("/client/advisory", formData)
            .then(response => {
                showOverlay.value = false

                toast.success("Đã nhận thông tin", {
                    autoClose: 2000,
                    theme: "dark",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch(error => {
                console.error(error)
            })
    }
}
</script>

<style scoped></style>