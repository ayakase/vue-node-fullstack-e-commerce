<template>
    <section class="page_404">
        <div class="container">
            <div class="row" style="margin: auto;padding: auto;">
                <div class="col-sm-12" style="margin: auto;padding: auto;">
                    <div class="col-sm-10 col-sm-offset-1  text-center" style="margin: auto;padding: auto;">
                        <div class="four_zero_four_bg" style="margin: auto;padding: auto;">
                            <h1 class="text-center ">404</h1>
                        </div>
                        <div class="contant_box_404">
                            <h3 class="h2">
                                Ôi không !
                            </h3>
                            <h4>Không tìm thấy link bạn cần tìm</h4>
                            <a href="" class="link_404" @click="router.push('/')">Về trang chủ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.container {
}

.page_404 {
    padding: 40px 0;
}

.page_404 img {
    width: 100vw;
}

.four_zero_four_bg {

    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
}


.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    margin-top: -50px;
}</style>