<template>
    <div class="container">
        <v-avatar class="avatar"
            image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></v-avatar>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" :readonly="disabled">
            </div>
            <div class="mb-3">
                <label for="username" class="form-label">Tên đăng nhập</label>
                <input v-model="username" type="text" class="form-control" id="username" :readonly="disabled">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu (để trống nếu không muốn thay đổi)</label>
                <input v-model="newPassword" placeholder="********" type="password" class="form-control" id="password"
                    :readonly="disabled">
            </div>
            <div v-if="displayConfirm" class="mb-3">
                <label for="password" class="form-label">Mật khẩu (để trống nếu không muốn thay đổi)</label>
                <input v-model="confirmPassword" placeholder="********" type="password" class="form-control"
                    id="password" :readonly="disabled">
            </div>
            <!-- <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <!-- <button class="btn btn-success">Request Change</button> -->
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn v-if="disabled" v-bind="activatorProps" color="surface-variant" text="Thay đổi thông tin"
                        variant="flat"></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Nhập mật khẩu">
                        <v-card-text>
                            Hệ thống cần xác nhận đó là bạn
                        </v-card-text>
                        <v-card-item>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input placeholder="********" v-model="oldPassword" type="password" class="form-control"
                                    id="password">
                            </div>
                        </v-card-item>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="requestChange" color="green-darken-3" text="Yêu cầu đổi thông tin"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-btn @click="saveChange" v-if="!disabled" class="btn btn-success">Lưu thay đổi</v-btn>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLoginStore } from '../../stores/loginstate';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import baseUrl from '../../connect';
const loginStore = useLoginStore()
const userInfo = loginStore.userInfo;
const disabled = ref(true)
const username = ref(loginStore.userInfo.username);
const email = ref(loginStore.userInfo.email);
const oldPassword = ref()
const newPassword = ref(null)
const confirmPassword = ref(null)
const displayConfirm = ref(false)
function requestChange() {
    const submitData = {
        password: oldPassword.value
    }
    baseUrl.post('/admin/user/request-change', submitData).then((response) => {
        console.log(response.data);
        disabled.value = !response.data.allow
        if (response.data.allow == true) {
            toast.success(response.data.message,
                {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                }
            );
        } else {
            toast.error(response.data.message,
                {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                }
            );
        }
    }).catch((error) => {
        console.error(error)
    })
}
watch(newPassword, (newValue, oldValue) => {
    if (newValue.length > 0) {
        displayConfirm.value = true
    } else if (newValue.length == 0) {
        displayConfirm.value = false
    }
})
function saveChange() {
    console.log(username.value);
    console.log(email.value);
    const submitData = {
        username: username.value,
        email: email.value,
    }
    if (newPassword.value === null || newPassword.value.length === 0) {
        baseUrl.post('/admin/user/save-change', submitData).then((response) => {
            console.log(response.data);
            if (response.status == 200) {
                toast.success("Cập nhật thông tin thành công",
                    {
                        autoClose: 2000,
                        theme: "colored",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                );
            }
        }).catch((error) => {
            console.log(error)
        });
    } else if (newPassword.value.length >= 5) {
        if (newPassword.value === confirmPassword.value) {
            submitData.password = newPassword.value
            baseUrl.post('/admin/user/save-change', submitData).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    toast.success("Cập nhật thông tin thành công",
                        {
                            autoClose: 2000,
                            theme: "colored",
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            }).catch((error) => {
                console.log(error)
            });;
        } else {
            toast.error("Không khớp mật khẩu",
                {
                    autoClose: 2000,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,
                }
            );
        }
    } else if (newPassword.value.length <= 5) {
        toast.error("Mật khẩu mới quá ngắn",
            {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
    }
    // if (newPassword.value === null || newPassword.value.length >= 5 || newPassword.value.length === 0) {
    //     if (newPassword.value) {
    //         submitData.password = newPassword.value
    //         console.log(submitData)
    //     }
    //     baseUrl.post('/admin/user/save-change', submitData).then((response) => {
    //         console.log(response.data);
    //     });
    // } else if (newPassword.value.length < 5) {
    //     toast.error("Mật khẩu mới quá ngắn",
    //         {
    //             autoClose: 2000,
    //             theme: "colored",
    //             position: toast.POSITION.BOTTOM_RIGHT,
    //         }
    //     );
    // }
}
onMounted(() => {
})
</script>

<style scoped>
.container {
    width: 60%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}


.avatar {
    margin-top: 2rem;
    width: 8rem;
    height: 8rem;
}
</style>