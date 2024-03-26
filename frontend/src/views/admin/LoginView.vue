<template>

    <section class="">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <h3 class="mb-5">Đăng nhập</h3>
                            <div class="form-outline mb-4">
                                <input type="text" v-model="username" id="username" class="form-control" />
                                <label class="form-label" for="username">Username</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input type="password" v-model="password" id="form2Example2" class="form-control" />
                                <label class="form-label" for="">Password</label>
                            </div>
                            <hr class="my-4">
                            <button type="button" @click="login" class="btn btn-success btn-block mb-4">Sign in</button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import baseUrl from '../../connect';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref } from 'vue';
import { useLoginStore } from '../../stores/loginstate';
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router';
const router = useRouter()
let { cookies } = useCookies()

const loginStore = useLoginStore()
let username = ref()
let password = ref()
function login() {
    let loginData = {
        username: username.value,
        password: password.value
    }
    baseUrl.post('/admin/login/info', loginData).then((response) => {
        // cookies.set('token', response.data.token);
        toast.info(response.data.message,
            {
                autoClose: 2000,
                theme: "colored",
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
        loginStore.toggleButton(response.data.state)
        router.push('/admin/thong-ke')
    }).catch((error) => {
        console.log(error)
    })
}
</script>

<style scoped>
.login-container {
    width: 30%;
    background-color: #97CBB4;
    margin: auto;
    padding: auto;
    padding: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>