<template>
  <div class="footer-container">
    <div class="footer-head">
      <div class="footer-head-item">
        <img src="../assets/images/ftimg1.png" class="footer-head-icon" alt="">
        <div class="footer-head-text">
          <p><span style="color: #ff6b00; font-weight: bold;">TƯ VẤN 24/7</span></p>
          <p><span style="color: white;">Tổng đài tư vấn 349349, Hỗ trợ 24/7

            </span></p>
        </div>
      </div>
      <div class="footer-head-item">
        <img src="../assets/images/ftimg2.png" class="footer-head-icon" alt="">
        <div class="footer-head-text">
          <p><span style="color: #ff6b00; font-weight: bold;">BẢO HIỂM DỊCH VỤ</span></p>
          <p><span style="color: white;">Cam kết hoàn tiền nếu Dịch vụ không đúng</span></p>
        </div>
      </div>
      <div class="footer-head-item">
        <img src="../assets/images/ftimg3.png" class="footer-head-icon" alt="">
        <div class="footer-head-text">
          <p><span style="color: #ff6b00; font-weight: bold;">CHẤT LƯỢNG HÀNG ĐẦU</span></p>
          <p><span style="color: white;">Không cạnh tranh về giá, chỉ tập trung vào chất lượng</span></p>
        </div>
      </div>
      <div class="footer-head-item">
        <img src="../assets/images/ftimg4.png" class="footer-head-icon" alt="">
        <div class="footer-head-text">
          <p><span style="color: #ff6b00; font-weight: bold;">NIỀM TIN PHÁT TRIỂN</span></p>
          <p><span style="color: white;">Nỗ lực phát tiển để trở thành Công ty lữ hành hàng đầu tại Lào Cai</span>
          </p>
        </div>
      </div>
    </div>
    <div class="footer-main-content">
      <div class="footer-section footer-section-1">
        <div class="section-top-bar"></div>
        <h3>CÔNG TY TNHH MTV DU LỊCH QUỐC TẾ HOÀNG HÀ</h3>
        <div class="introduce-footer">
          <div class="introduce-item">
            <img src="../assets/icon-contact/vector.png" class="introduce-icon" alt="" />
            <p>
              <b>Văn phòng chính: </b> Maecenas eu elit mauris Maecenas eu elit mauris Maecenas eu elit mauris
            </p>
          </div>
          <div class="introduce-item">
            <img src="../assets/icon-contact/location.png" class="introduce-icon" alt="" />
            <p>
              <b>Địa chỉ: </b> Maecenas eu elit mauris Maecenas eu elit mauris
            </p>
          </div>
          <div class="introduce-item">
            <img src="../assets/icon-contact/e-mail.png" class="introduce-icon" alt="" />
            <div>
              <p><b>Điện thoại: </b> (084) 385 5158</p>
              <p><b>Fax: </b> 0214 3.858,178</p>
              <p><b>Di động: </b>0904.678.168 - 0904.243.088</p>
            </div>
          </div>
          <div class="introduce-item">
            <img src="../assets/icon-contact/phone.png" class="introduce-icon" alt="" />
            <p><b>Email: </b> dlhoanghalaocai@gmail.com</p>
          </div>
        </div>
      </div>
      <div class="footer-section footer-section-2">
        <div class="about-us">
          <div class="section-top-bar"></div>
          <h3>Về chúng tôi</h3>
          <div class="about-us-items">
            <p class="about-us-item" @click="router.push('/about/chinh-sach-va-quy-dinh')">
              Chính sách và quy định chung
            </p>
            <p class="about-us-item" @click="router.push('/about/bao-hiem-dich-vu')">
              Bảo hiểm dịch vụ
            </p>
            <p class="about-us-item" @click="router.push('/about/quy-trinh')">
              Quy trình đặt dịch vụ và thanh toán
            </p>
          </div>
        </div>
        <div class="follow-us">
          <div class="section-top-bar"></div>
          <h3>Theo dõi chúng tôi</h3>
          <div class="follow-us-items">
            <div class="insta-and-facebook">
              <div class="follow-us-item">
                <img src="../assets/icon-mxh/instagram-logo.png" class="follow-icon" alt="" />
                <p>Instagram</p>
              </div>
              <div class="follow-us-item">
                <img src="../assets/icon-mxh/facebook-logo.png" class="follow-icon" alt="" />
                <p>Facebook</p>
              </div>
            </div>
            <p class="copyright">
              @ 2014 Du lịch Hoàng Hà <br />Developed by
              <a style="color: #045b48; font-weight: bold" href="https://github.com/ayakase">Ayakase</a>
              and
              <a href="https://github.com/BinBlun" style="color: #045b48; font-weight: bold">BinBlun</a>
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2522553192643!2d103.96182667493468!3d22.494716879547287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd139cd20452db%3A0x1e087d472f4b71ce!2zMTE2IFPGoW4gxJDhuqFvLCBD4buRYyBM4bq_dSwgTMOgbyBDYWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1695747411920!5m2!1svi!2s"
                    width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> -->
      <form class="footer-section footer-section-3">
        <div class="section-top-bar"></div>
        <h2>Đăng ký tư vấn</h2>
        <div class="footer-form">
          <input class="form-control footer-input" type="text" placeholder="Họ tên" v-model="footerName"
            aria-label="default input example" required />
          <input class="form-control footer-input" type="text" placeholder="Số điện thoại" v-model="footerPhoneNumber"
            aria-label="default input example" required />
          <input class="form-control footer-input" type="email" placeholder="Email" v-model="footerEmail"
            aria-label="default input example" required />
          <textarea class="form-control footer-text-area" placeholder="Ghi chú" id="floatingTextarea"
            v-model="footerNote" required></textarea>
        </div>
        <button type="submit" @click.prevent="sendInfo" class="btn btn-success footer-form-button">
          Đăng ký
        </button>
      </form>
    </div>

    <!-- <img src=" ../assets/images/footer-img.png" class="footer-img" alt=""> -->
  </div>
  <LoadingOverlay v-if="showOverlay"></LoadingOverlay>
  <div class="mobile-footer">
    <div style="font-size: large;">CÔNG TY TNHH MTV DU LỊCH QUỐC TẾ HOÀNG HÀ</div>
    <div><b>Văn phòng chính:</b> Lorem ipsum dolor</div>
    <div><b>Địa chỉ:</b> Maecenas eu elit mauris</div>
    <div><b>Điện thoại:</b> 02343203232 - <b> Fax:</b> 02352334212 <b>Di động: </b>09994545043 - 034525234322
    </div>
    <div class="about-us-items">
      <p class="about-us-item" @click="router.push('/about/chinh-sach-va-quy-dinh')">
        Chính sách và quy định chung
      </p>
      <p class="about-us-item" @click="router.push('/about/bao-hiem-dich-vu')">
        Bảo hiểm dịch vụ
      </p>
      <p class="about-us-item" @click="router.push('/about/quy-trinh')">
        Quy trình đặt dịch vụ và thanh toán
      </p>
    </div>
  </div>
</template>

<script setup>
import LoadingOverlay from "./LoadingOverlay.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import baseUrl from "../connect";
import { useRouter } from "vue-router";
const router = useRouter();
import { ref } from "vue";
const showOverlay = ref(false);
const footerName = ref();
const footerPhoneNumber = ref();
const footerEmail = ref();
const footerNote = ref();
function sendInfo() {
  if (
    !footerName.value ||
    !footerPhoneNumber.value ||
    !footerNote.value ||
    !footerEmail.value
  ) {
    toast.error("Bạn cần điền đầy đủ thông tin", {
      autoClose: 1000,
      theme: "dark",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else {
    showOverlay.value = true;
    const footerData = {
      name: footerName.value,
      phone: footerPhoneNumber.value,
      email: footerEmail.value,
      note: footerNote.value,
    };
    baseUrl
      .post("/client/advisory", footerData)
      .then((response) => {
        showOverlay.value = false;

        toast.success("Đã nhận thông tin", {
          autoClose: 2000,
          theme: "dark",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>
<style scoped>
.map-container {
  border-radius: 2rem;
  border: 2px solid rgb(146, 146, 146);
  overflow: hidden;
  width: 30%;
  height: 90%;
}

.footer-container {
  position: relative;
  width: 100%;
  bottom: 0;
  border-top: 2px solid #045b48;
}

@media screen and (max-width: 992px) {
  .footer-container {
    display: none;
  }
}

.footer-img {
  width: 100%;
  position: absolute;
  z-index: -1;
  bottom: 0;
}

.footer-head {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
  flex-direction: row;
  /* height: 6rem; */
  background-color: #045b48;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.644) 0px 6px 8px;
}

.footer-head-item {
  width: 20%;
  display: flex;
  gap: 1rem;
  flex-direction: row;
}

.footer-head-icon {
  height: 5rem;
  width: 5rem;
}

.footer-head-text {
  display: flex;
  flex-direction: column;
}

.footer-head-text p {
  margin: 0;
  padding: 0;
}

.footer-main-content {
  /* background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.187) 0%, rgba(0, 0, 0, 0.204) 100%), url("../assets/images/footer-img.jpg"); */
  background-image: url("../assets/images/footer-img.jpg");

  display: flex;
  height: 28rem;

  /* padding-top: 1rem; */
  flex-direction: row;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 5rem;
  width: 100%;
}

.section-top-bar {
  height: 1rem;
}

.footer-section-1 {
  width: 25rem;
  color: #045b48;
}

.footer-section-2 {
  width: 20rem;
  color: #045b48;
}

.footer-section-3 {
  color: #045b48;
  width: 25rem;
  position: relative;
}

.footer-form {
  display: flex;
  flex-direction: column;
}

.footer-input {
  height: 3rem;
  border-radius: 0.7rem;
  background-color: #dbebe1;
  border: 1px solid #a1ffc5;
}

.footer-form-button {
  margin-top: 2rem;
  position: absolute;
  left: 0;
  z-index: 99;
}

.footer-note-input {
  height: 8rem;
}

.footer-text-area {
  border-radius: 0.7rem;
  height: 8rem;
  background-color: #dbebe1;
  border: 1px solid #a1ffc5;
}

.footer-form-label {
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  padding-left: 0.6rem;
  font-size: large;
}

textarea {
  resize: none;
}

.about-us-items {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.about-us-item {
  font-size: large;
}

.about-us-item:hover {
  cursor: pointer;
}

.insta-and-facebook {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.follow-icon {
  width: 3rem;
}

.follow-us-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.follow-us-item p {
  margin: 0;
  padding: 0;
  font-size: large;
}

.follow-us-items {
  width: 24rem;
  /* background-color: rebeccapurple; */
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5rem;
}

.copyright {
  /* background-color: rebeccapurple; */
  font-size: 17px;
}

.introduce-item {
  display: flex;
  flex-direction: row;
  font-size: large;
  gap: 1rem;
}

.introduce-icon {
  /* background: #000; */
  width: 1.8rem;
  height: 1.8rem;
  object-fit: contain;
}

.introduce-footer {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}


.mobile-footer {
  border-top: 2px solid rgb(58, 58, 58);
  display: none;
  position: relative;
  bottom: 0;
  padding: 1rem;
  background-color: #045b48;
  color: white;
}

@media screen and (max-width: 992px) {
  .mobile-footer {
    display: block;
  }
}
</style>
