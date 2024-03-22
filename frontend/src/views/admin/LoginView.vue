<template>
    <div class="login-container">
        <h3> Đăng nhập</h3>
        <div class="form-outline mb-4">
            <input v-model="username" type="username" id="form2Example1" class="form-control" />
            <label class="form-label" for="form2Example1">username</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input v-model="password" type="password" id="form2Example2" class="form-control" />
            <label class="form-label" for="form2Example2">Password</label>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
            <div class="col">
                <!-- Simple link -->
            </div>
        </div>

        <!-- Submit button -->
        <button type="button" @click="login" class="btn btn-success btn-block mb-4">Sign in</button>

        <!-- Register buttons -->

    </div>
</template>

<script setup>
import baseUrl from '../../connect';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import LoadingOverlay from "../../components/LoadingOverlay.vue";
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