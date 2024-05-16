<template>
    <LoadingOverlay v-if="showOverlay"></LoadingOverlay>

    <div style="z-index: 9999;">
        <div style="margin-top: 0rem;" class="modal fade" id="placeModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="background-color: F1FAF4;">
                <div class="modal-content" style="background-color: #F1FAF4;">
                    <!-- <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Đặt Tour</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> -->
                    <div class="modal-body">
                        <div class="place-form-container">
                            <v-stepper editable :items="['Thông tin', 'Đặt tour', 'Xác nhận']" elevation="0"
                                style="background-color: #F1FAF4;">
                                <template v-slot:item.1>
                                    <div class="mb-3">
                                        <label class="form-label">Họ & Tên <span style="color: red;">*</span></label>
                                        <input style="height: 3rem;" class="form-control" id="" placeholder=""
                                            v-model="name">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Điện thoại <span style="color: red;">*</span></label>
                                        <input style="height: 3rem;" class="form-control" id="" placeholder=""
                                            v-model="phone">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email (Để nhận hóa đơn)<span
                                                style="color: red;">*</span></label>
                                        <input type="email" style="height: 3rem;" class="form-control" id=""
                                            placeholder="" v-model="email">
                                    </div>
                                </template>

                                <template v-slot:item.2>
                                    <div class="adult"
                                        style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                        <p style="margin: 0;padding: 0;">Người lớn (Trên 12 tuổi)</p>
                                        <input type="number" style="height: 3rem;width: 8rem;" class="form-control"
                                            id="" placeholder="" v-model="adult">
                                        <p style="margin: 0;padding: 0;color: orangered"> x {{
        numeralFormat(props.adultPrice) }}</p>
                                    </div>
                                    <div class="teenager"
                                        style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                        <p style="margin: 0;padding: 0;">Trẻ em(Từ 6 - 10 tuổi)</p>
                                        <input type="number" style="height: 3rem;width: 8rem;" class="form-control"
                                            id="" placeholder="" v-model="teenager">
                                        <p style="margin: 0;padding: 0;color: orangered;"> x {{
        numeralFormat(props.teenagerPrice)
    }}</p>
                                    </div>
                                    <div class="children"
                                        style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                        <p style="margin: 0;padding: 0;">Trẻ em (Từ 2 - 5 tuổi) </p>
                                        <input type="number" style="height: 3rem;width: 8rem;" class="form-control"
                                            id="" placeholder="" v-model="children">
                                        <p style="margin: 0;padding: 0;color: orangered"> x {{
        numeralFormat(props.childPrice)
    }}
                                        </p>
                                    </div>
                                    <div class="infant"
                                        style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 1rem;">
                                        <p style="margin: 0;padding: 0;">Trẻ em (Dưới 2 tuổi) </p>
                                        <input type="number" style="height: 3rem;width: 8rem;" class="form-control"
                                            id="" placeholder="" v-model="infant">
                                        <p style="margin: 0;padding: 0;color: orangered"> x {{
        numeralFormat(props.infantPrice)
    }}
                                        </p>
                                    </div>
                                    <div class="mb-3 mt-3">
                                        <v-menu location="end">
                                            <template v-slot:activator="{ props }">
                                                <div style="display: flex;gap:1rem; align-items: center;">
                                                    <v-btn dark v-bind="props">
                                                        Ngày khởi hành
                                                    </v-btn>
                                                    <div style="font-size: x-large">{{ formatDate(date) }}</div>
                                                </div>

                                            </template>
                                            <div>
                                                <v-date-picker v-model="date" :min="getTomorrowsDate()"></v-date-picker>
                                                <!-- <input type="date" style="height: 3rem;width: 8rem;"
                                                    class="form-control" id="" placeholder="" v-model="date"> -->
                                            </div>
                                        </v-menu>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Ghi chú</label>
                                        <textarea class="form-control" rows="3" v-model="note"></textarea>
                                    </div>
                                    <p>{{ note.length }}/255</p>
                                    <h4 class="mb-4">Tổng số tiền: <span style="color: chocolate;">{{
                                            numeralFormat(totalPrice)
                                            }} &nbsp;VNĐ </span></h4>
                                </template>

                                <template v-slot:item.3>
                                    <table border="1" style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <th>Họ & Tên</th>
                                            <td>{{ name }}</td>
                                        </tr>
                                        <tr>
                                            <th>Điện thoại</th>
                                            <td>{{ phone }}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{{ email }}</td>
                                        </tr>
                                        <tr>
                                            <th>Người lớn (Trên 12 tuổi)</th>
                                            <td>{{ adult }}</td>
                                        </tr>
                                        <tr v-if="teenager > 0">
                                            <th>Trẻ em (Từ 6 - 10 tuổi)</th>
                                            <td>{{ teenager }}</td>
                                        </tr>
                                        <tr v-if="children > 0">
                                            <th>Trẻ em (Từ 2 - 5 tuổi)</th>
                                            <td>{{ children }}</td>
                                        </tr>
                                        <tr v-if="infant > 0">
                                            <th>Trẻ em (Dưới 2 tuổi)</th>
                                            <td>{{ infant }}</td>
                                        </tr>
                                        <tr>
                                            <th>Ngày khởi hành</th>
                                            <td>{{ formatDate(date) }}</td>
                                        </tr>
                                        <tr>
                                            <th>Ghi chú</th>
                                            <td>{{ note }}</td>
                                        </tr>
                                    </table>
                                    <div style="margin-top: 1rem;">
                                        <input v-model="agree" type="checkbox" id="agree" name="agree">
                                        <label for="agree"> Tôi đồng ý với các điều khoản</label><br>
                                    </div>
                                    <div style="float:right;margin-top: 1rem;">
                                        <button style="color:red" type="button" class="btn"
                                            data-bs-dismiss="modal">Hủy</button>
                                        <a class="btn" style="background-color: #97CBB4;" target="_blank"
                                            @click="sendOrder">Đặt Tour</a>
                                    </div>
                                </template>
                            </v-stepper>
                            <div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap: 1rem; font-size: 1.5rem;">
                                <!-- <p>Tổng số tiền:</p> <span style="color: orangered;"><count-up class="count-number"
                                        :end-val=totalPrice :duration="1"></count-up></span> -->
                            </div>
                        </div>
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
const name = ref("")
const phone = ref("")
const email = ref("")
const adult = ref(1)
const teenager = ref(0)
const children = ref(0)
const infant = ref(0)
const date = ref(new Date())
const note = ref("")
function getTomorrowsDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
function formatDate(dateString) {
    // Parse the date string
    const date = new Date(dateString);

    // Use toLocaleDateString() to get the local date string
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
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
const agree = ref(false)
function sendOrder() {
    if (agree.value == false) {
        toast.error("Bạn cần đồng ý với điều khoản của chúng tôi", {
            autoClose: 1000,
            theme: "dark",
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    } else {
        if (!name.value || !phone.value || !email.value || !note.value) {
            toast.error("Bạn cần điền đầy đủ thông tin đặt tour", {
                autoClose: 1000,
                theme: "dark",
                position: toast.POSITION.BOTTOM_RIGHT,
            });

        } else {
            if (formatDate(date.value) == formatDate(Date.now())) {
                toast.error("Ngày đặt tour không hợp lệ", {
                    autoClose: 1000,
                    theme: "dark",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else {
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
                    note: note.value,
                    date: date.value,
                }
                baseUrl.post("/client/order", orderData)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.url) {
                            window.location.href = response.data.url
                        }
                        showOverlay.value = false
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
    }
}
</script>

<style scoped>
th {
    width: 12rem;
}

th,
td {
    border: 1px solid black;
    padding: 4px;
}
</style>