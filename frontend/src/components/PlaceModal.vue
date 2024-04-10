<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>

    <div style="z-index: 9999;">
        <div style="margin-top: 0rem;" class="modal fade" id="placeModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="background-color: F1FAF4;">
                <div class="modal-content" style="background-color: #F1FAF4;">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Đặt Tour</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="place-form-container">
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
                            <div class="adult"
                                style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                <p style="margin: 0;padding: 0;">Người lớn (Trên 12 tuổi)</p>
                                <input type="number" style="height: 3rem;width: 8rem;" class="form-control" id=""
                                    placeholder="" v-model="adult">
                                <p style="margin: 0;padding: 0;color: orangered"> x {{
        numeralFormat(props.adultPrice) }}</p>
                            </div>
                            <div class="teenager"
                                style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                <p style="margin: 0;padding: 0;">Trẻ em(Từ 6 - 10 tuổi)</p>
                                <input type="number" style="height: 3rem;width: 8rem;" class="form-control" id=""
                                    placeholder="" v-model="teenager">
                                <p style="margin: 0;padding: 0;color: orangered;"> x {{
        numeralFormat(props.teenagerPrice)
    }}</p>
                            </div>
                            <div class="children"
                                style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                <p style="margin: 0;padding: 0;">Trẻ em (Từ 2 - 5 tuổi) </p>
                                <input type="number" style="height: 3rem;width: 8rem;" class="form-control" id=""
                                    placeholder="" v-model="children">
                                <p style="margin: 0;padding: 0;color: orangered"> x {{ numeralFormat(props.childPrice)
                                    }}
                                </p>
                            </div>
                            <div class="infant"
                                style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                <p style="margin: 0;padding: 0;">Trẻ em (Dưới 2 tuổi) </p>
                                <input type="number" style="height: 3rem;width: 8rem;" class="form-control" id=""
                                    placeholder="" v-model="infant">
                                <p style="margin: 0;padding: 0;color: orangered"> x {{ numeralFormat(props.infantPrice)
                                    }}
                                </p>
                            </div>
                            <h4 class="mb-4">Tổng số tiền: <span style="color: chocolate;">{{ numeralFormat(totalPrice)
                                    }} &nbsp;VNĐ </span></h4>
                            <div style="display: flex; flex-direction: row;gap: 1rem; font-size: 1.5rem;">
                                <!-- <p>Tổng số tiền:</p> <span style="color: orangered;"><count-up class="count-number"
                                        :end-val=totalPrice :duration="1"></count-up></span> -->
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Ghi chú</label>
                                <textarea class="form-control" rows="3" v-model="note"></textarea>
                            </div>
                            <p>{{ note.length }}/255</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a class="btn" style="background-color: #97CBB4;" target="_blank" @click="sendOrder">Đặt
                            Tour</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import baseUrl from '../connect';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { computed, ref, watch } from 'vue';
import LoadingOverlay from "./LoadingOverlay.vue";

const props = defineProps(['tourId', 'childPrice', 'adultPrice', 'teenagerPrice', 'infantPrice', 'tourTitle'],)

let totalPrice = computed(() => {
    return props.adultPrice * adult.value
        +
        props.teenagerPrice * teenager.value
        +
        props.childPrice * children.value
        +
        props.infantPrice * infant.value
})
let name = ref("")
let phone = ref("")
let email = ref("")
let adult = ref(1)
let teenager = ref(0)
let children = ref(0)
let infant = ref(0)
let note = ref("")
watch(adult, (newValue, oldValue) => {
    if (newValue < 1) {
        adult.value = 1
    }
})
watch(teenager, (newValue, oldValue) => {
    if (newValue < 0 || !newValue) {
        teenager.value = 0
    }
})
watch(children, (newValue, oldValue) => {
    if (newValue < 0 || !newValue) {
        children.value = 0
    }
})
watch(infant, (newValue, oldValue) => {
    if (newValue < 0 || !newValue) {
        infant.value = 0
    }
})


const showOverlay = ref(false)
function sendOrder() {
    if (!name.value || !phone.value || !email.value || !note.value) {
        toast.error("Bạn cần điền đầy đủ thông tin đặt tour", {
            autoClose: 1000,
            theme: "dark",
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    } else {
        // if (adult.value + teenager.value + children.value + infant.value < 1) {
        //     toast.error("Số người để đặt tour phải có ít nhất 1", {
        //         autoClose: 1000,
        //         theme: "dark",
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //     });
        // }
        showOverlay.value = true
        const orderData = {
            tourId: props.tourId,
            tourTitle: props.tourTitle,
            name: name.value,
            phone: phone.value,
            email: email.value,
            adult: adult.value,
            teenager: teenager.value,
            children: children.value,
            infant: infant.value,
            price: totalPrice.value,
            note: note.value
        }
        baseUrl.post("/client/order", orderData)
            .then(response => {
                showOverlay.value = false
                toast.success(response.data, {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch(error => {
                showOverlay.value = false
                toast.error(error.response.data, {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                // console.error(error)
            })
    }
}
</script>

<style></style>