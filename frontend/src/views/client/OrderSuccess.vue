<template>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
        <div class="payment-success">
            <div class="icon">
                <!-- You can replace this with your own success icon -->
                <v-icon style="font-size: 10rem;color:green;" icon="fa-solid fa-check fa-beat-fade">

                </v-icon>
            </div>
            <h1>Thanh toán thành công!</h1>
            <p>Hóa đơn đã được gửi về email của bạn. Chúng tôi sẽ liên lạc lại trong thời gian sớm nhất</p>
            <a style="font-size: x-large;" href="/">Quay về trang chủ</a>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.payment-success {
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
    color: #4caf50;
}

p {
    font-size: large;
}

button {
    background-color: #4caf50;
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