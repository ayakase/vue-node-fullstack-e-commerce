<template>
    <div class="outer-container">
        <div class="first-section">
            <div style="display: flex;flex-direction: row;gap: 1.65rem;justify-content: space-between;width:100%">
                <div class="count-container">
                    <h4 style="text-align: center;">Tổng doanh thu</h4>
                    <count-up class="count-number" :start-val="revenueCountStart" :end-val="revenueCount"
                        :duration="2"></count-up>
                    <h4 style="text-align: center;color: red;">VNĐ</h4>
                </div>
                <div class="count-container">
                    <h4 style="text-align: center;">Tổng lượt truy cập</h4>
                    <count-up class="count-number" :start-val="viewCountStart" :end-val="viewCount"
                        :duration="1"></count-up>
                </div>
                <div class="count-container">
                    <h4 style="text-align: center;">Tổng số lượt đặt tour</h4>
                    <count-up class="count-number" :start-val="orderCountStart" :end-val="orderCount"
                        :duration="1"></count-up>
                </div>
                <div class="count-container">
                    <h4 style="text-align: center;">Tổng yêu cầu tư vấn</h4>
                    <count-up class="count-number" :start-val="adviseCountStart" :end-val="adviseCount"
                        :duration="1"></count-up>
                </div>
            </div>
        </div>
        <div class="second-section">
            <div style="width:35%; display: flex;flex-direction: column; gap:1rem;">
                <div class="day-chart" v-if="daydata">
                    <h4 style="text-align: center;">Thống kê lượt đặt tour theo ngày</h4>
                    <Bar :data="daydata" :options="orderChartOption" />
                </div>
                <div class="ratio-order-chart">
                    <h4 style="text-align: center;margin-top: 1rem;">Tỉ lệ đặt tour, yêu cầu tư vấn/ lượt truy cập</h4>
                    <Pie v-if="orderRatio" :data="orderRatio" :options="options"></Pie>
                </div>
            </div>
            <div style="width: 35%;display: flex;flex-direction: column; gap:1rem;">
                <div class="revenue-chart" v-if="revenuedata">
                    <h4 style="text-align: center;">Biến động doanh thu theo ngày</h4>
                    <Line :data="revenuedata" :options="orderChartOption" />
                </div>
                <div class="ratio-order-chart">
                    <h4 style="text-align: center;padding-top: 1rem;">Tỉ lệ thanh toán/ hủy, chưa thanh toán
                    </h4>
                    <Pie v-if="cancelRatio" :data="cancelRatio" :options="options">
                    </Pie>
                </div>
            </div>
            <div class="notification">
                <div
                    style="width: 100%;display: flex;justify-content: space-between;margin-bottom: 1rem;align-items: start;">
                    <h4>Thông báo &nbsp; <i class="fa-solid fa-bell fa-shake"></i></h4>
                    <button @click="fetchNotification" class="btn-success"
                        style="margin-right: 2rem;font-size: large;"><i
                            class="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
                <div class="noti-container">
                    <div v-if="notification" class="each-noti" v-for="item in notification" :key="item.id">
                        <p v-html="item.action"></p>
                        <p style="color: rgb(75, 75, 75);text-align: end;">{{
                        formatDate(item.createdAt) }}</p>
                    </div>
                    <TableLoading v-else></TableLoading>

                </div>
                <v-pagination @click="fetchNotification" v-model="notiPage" :length=notiTotalPage :total-visible="3"
                    prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
            </div>
            <!-- <div class="ratio-order-chart">
                <h4 style="text-align: center;margin-top: 1rem;">Tỉ lệ đặt tour, yêu cầu tư vấn/ lượt truy cập</h4>
                <Pie v-if="orderRatio" :data="orderRatio" :options="options"></Pie>

            </div> -->
        </div>

        <div class="lower-section">
            <div class="ratio-guest-chart">
                <h4 style="text-align: center;padding-top: 1rem;">Tệp khách hàng</h4>
                <Doughnut v-if="guestRatio" :data="guestRatio" :options="options">
                </Doughnut>
            </div>

        </div>
    </div>
</template>

<script setup>
import baseUrl from "../../connect";
import CountUp from 'vue-countup-v3'
import TableLoading from '../../components/TableLoading.vue';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js'
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Bar, Line, Pie, Doughnut } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, LineElement, PointElement, ArcElement, Legend)

let viewCount = ref(null)
let viewCountStart = ref(0)
let orderCount = ref(null)
let orderCountStart = ref(0)
let adviseCount = ref(null)
let adviseCountStart = ref(0)
let revenueCount = ref()
let revenueCountStart = ref(0)
let notification = ref()
let notiTotalPage = ref()
let notiPage = ref(1)
let daydata = ref()
const orderRatio = ref(null)
const guestRatio = ref(null)
const cancelRatio = ref(null)

watch([viewCount, orderCount, adviseCount], async ([newViewCount, newOrderCount, newAdviseCount], [oldViewCount, oldOrderCount, oldAdviseCount]) => {
    if (newViewCount !== null && newOrderCount !== null && adviseCount !== null) {
        orderRatio.value = {
            labels: [
                'Lượt truy cập',
                'Lượt đặt tour',
                'Lượt đăng ký tư vấn'
            ],
            datasets: [{
                labels: [
                    'Lượt truy cập',
                    'Lượt đặt tour',
                    'Lượt đăng ký tư vấn'
                ],
                data: [newViewCount, newOrderCount, newAdviseCount],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    }
})

function fetchNotification() {
    baseUrl.get('/admin/notification/' + notiPage.value).then((response) => {
        notification.value = response.data.rows
        notiTotalPage.value = response.data.count / 10 + 1
    }).catch((error) => {
        console.log(error)
    });
}

function fetchCount() {
    viewCountStart.value = viewCount.value
    orderCountStart.value = orderCount.value
    adviseCountStart.value = adviseCount.value
    revenueCountStart.value = revenueCount.value
    baseUrl.get('/admin/count/view').then((response) => {
        viewCount.value = response.data.count
    }).catch((error) => {
        console.log(error)
    })
    baseUrl.get('/admin/count/order').then((response) => {
        orderCount.value = response.data
    }).catch((error) => {
        console.log(error)
    })
    baseUrl.get('/admin/count/revenue').then((response) => {
        revenueCount.value = response.data
    }).catch((error) => {
        console.log(error)
    })
    baseUrl.get('/admin/count/advise').then((response) => {
        adviseCount.value = response.data
    }).catch((error) => {
        console.log(error)
    })
}

function fetchGuestType() {
    baseUrl.get('/admin/chart/guest').then((response) => {
        let guestNumber = Object.values(response.data)
        guestRatio.value = {
            labels: [
                'Người lớn (Trên 12 tuổi)',
                'Trẻ em(Từ 6 - 10 tuổi)',
                'Trẻ em (Từ 2 - 5 tuổi)',
                'Trẻ em (Dưới 2 tuổi)'
            ],
            datasets: [{
                labels: [
                    'Người lớn (Trên 12 tuổi)',
                    'Trẻ em(Từ 6 - 10 tuổi)',
                    'Trẻ em (Từ 2 - 5 tuổi)',
                    'Trẻ em (Dưới 2 tuổi)'
                ],
                data: guestNumber,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    '#41B883'
                ],
                hoverOffset: 4
            }]
        }
    }).catch((error) => {
        console.log(error)
    })
}

function fetchCancelRate() {
    baseUrl.get('/admin/chart/cancel-rate').then((response) => {
        let cancelNumber = Object.values(response.data)
        console.log(cancelNumber)
        cancelRatio.value = {
            labels: [
                'Đã thanh toán',
                'Chưa thanh toán/ hủy tour',
            ],
            datasets: [{
                labels: [
                    'Đã thanh toán',
                    'Chưa thanh toán/ hủy tour',
                ],
                data: cancelNumber,
                backgroundColor: [
                    '#41B883',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
            }]
        }
    }).catch((error) => {
        console.log(error)
    })
}

let revenuedata = ref(null)
function fetchRevenueChart() {
    baseUrl.get('admin/chart/revenue').then((response) => {
        const days = [];
        const revenue = [];
        response.data.forEach(item => {
            days.push(item.day);
            revenue.push(item.sum);
        });
        revenuedata.value = {
            labels: days.reverse(),
            datasets: [
                {
                    backgroundColor: 'red',
                    borderColor: 'rgba(255, 99, 132)',
                    borderWidth: 4,
                    data: revenue.reverse()
                }
            ]
        }
    }).catch((error) => {
        console.log(error)
    })
}

function fetchDayChart() {
    baseUrl.get('/admin/chart/day').then((response) => {
        const days = [];
        const counts = [];
        response.data.forEach(item => {
            days.push(item.day);
            counts.push(item.order_count);
        });
        daydata.value = {
            labels: days.reverse(),
            datasets: [
                {
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(201, 203, 207, 0.6)',

                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1,
                    data: counts.reverse()
                }
            ]
        }

    })
}

let options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom'
        }
    }
}
let orderChartOption = {
    plugins: {
        legend: {
            display: false
        }
    }
}
function callAll() {
    fetchCount()
    fetchGuestType()
    fetchNotification()
    fetchDayChart()
    fetchRevenueChart()
    fetchCancelRate()
}
let intervalId
onMounted(() => {
    callAll();
    intervalId = setInterval(() => {
        callAll();
    }, 60000);
})
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }

})
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleString('vi-VN', options).replace(' tháng ', '/').replace('lúc', '').replace(', ', '/');
}
</script>
<style scoped>
p {
    margin: 0;
    padding: o;
}

.first-section {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;
}

.second-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    gap: 1.5rem;
    margin-top: 1rem;
}

.notification {
    background-color: #cdecde;
    border-radius: .3rem;
    padding-left: 1rem;
    padding-top: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.noti-container {
    /* height: 100%; */
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: .2rem;
    /* justify-content: space-between; */
}

.each-noti {
    width: 98%;
    font-size: .8rem;
    border-radius: .3.3rem;
    /* height: 8rem; */
    background-color: #bbdccd;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.ratio-order-chart {
    width: 100%;
    height: 100%;
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: .3rem;
}

.ratio-guest-chart {
    width: 40%;
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: .3rem;
}



.count-container {
    height: 10rem;
    background-color: #cdecde;
    width: 100%;
    padding: 0.5rem;
    padding-top: 1.5rem;
    border-radius: .3rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}


.count-number {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    /* width: 20rem; */
    color: red;
}

.day-chart,
.revenue-chart {
    width: 100%;
    padding: 1rem;
    border-radius: .3rem;
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}



.outer-container {
    width: 100%;
    margin-top: 2rem;
}



.each-noti p:first-child {
    /* width: 33rem; */
    white-space: nowrap;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    white-space: initial;
}



.lower-section {
    display: flex;
    margin-top: 2rem;
}
</style>