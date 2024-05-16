<template>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
        <div class="payment-failed">
            <div class="icon">
                <!-- You can replace this with your own success icon -->
                <v-icon style="font-size: 10rem;color:red;" icon="fa-solid fa-xmark fa-beat-fade">

                </v-icon>
            </div>
            <h1>Đã hủy thanh toán</h1>
            <a style="font-size: x-large;" href="/">Quay về trang chủ</a>

        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.payment-failed {
    width: 40%;
    text-align: center;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.icon {
    margin-bottom: 20px;
}

h1 {
    color: red;
}

p {
    font-size: large;
}

button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}
</style>