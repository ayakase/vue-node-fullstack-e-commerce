<template>
    <div class="outer-container">
        <div class="first-section">

            <div style="display: flex;flex-direction: column;gap: 1.65rem;">
                <div class="access-number">
                    <h4 style="text-align: center;">Tổng lượt truy cập</h4>
                    <count-up class="count-number" :end-val="viewCount" :duration="1"></count-up>
                </div>
                <div class="access-number">
                    <h4 style="text-align: center;">Tổng số đặt tour</h4>
                    <count-up class="count-number" :end-val="orderCount" :duration="1"></count-up>
                </div>
                <div class="advise-number">
                    <h4 style="text-align: center;">Tổng yêu cầu tư vấn</h4>
                    <count-up class="count-number" :end-val="adviseCount" :duration="1"></count-up>
                </div>
            </div>
            <div class="second-column">
                <div class="revenue-number">
                    <h4 style="text-align: center;">Tổng doanh thu</h4>
                    <count-up class="count-number" :end-val="revenueCount" :duration="2"></count-up>
                    <h4 style="text-align: center;color: red;">VNĐ</h4>

                </div>
                <div class="ratio-order-chart">
                    <h4 style="text-align: center;margin-top: 1rem;">Tỉ lệ đặt tour, yêu cầu tư vấn/ lượt truy cập</h4>
                    <Pie v-if="orderRatio" :data="orderRatio" :options="options"></Pie>
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
                <div class=" noti-container">
                    <div v-if="notification" class="each-noti" v-for="item in notification" :key="item.id">
                        <p v-html="item.action"></p>
                        <p style="color: rgb(75, 75, 75);text-align: end;">vào lúc {{
                        formatDate(item.createdAt) }}</p>
                    </div>
                    <TableLoading v-else></TableLoading>
                </div>
                <v-pagination @click="fetchNotification" v-model="notiPage" :length=notiTotalPage :total-visible="3"
                    prev-icon="fa-solid fa-chevron-left" next-icon="fa-solid fa-chevron-right"></v-pagination>
            </div>
        </div>
        <div class="chart-container">
            <div class="day-chart">
                <Bar v-if="daydata" :data="daydata" :options="orderChartOption" />
            </div>
            <div class="revenue-chart">
                <Line v-if="revenuedata" :data="revenuedata" :options="orderChartOption" />
            </div>

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
import { onMounted, ref, watch } from 'vue';
import { Bar, Line, Pie, Doughnut } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, LineElement, PointElement, ArcElement, Legend)
let viewCount = ref(null)
let orderCount = ref(null)
let adviseCount = ref(null)
let revenueCount = ref()
let notification = ref()
let notiTotalPage = ref()
let notiPage = ref(1)
let daydata = ref()
const orderRatio = ref(null)
const guestRatio = ref(null)
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
    notification.value = null
    baseUrl.get('/admin/notification/' + notiPage.value).then((response) => {
        notification.value = response.data.rows
        notiTotalPage.value = response.data.count / 10 + 1
    }).catch((error) => {
        console.log(error)
    });
}
function fetchCount() {
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
        console.log(response.data)
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
let revenuedata = ref(null)
function fetchRevenueChart() {
    baseUrl.get('admin/chart/revenue').then((response) => {
        console.log(response.data)
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
}
let orderChartOption = {
    plugins: {
        legend: {
            display: false
        }
    }
}
onMounted(() => {
    fetchCount()
    fetchGuestType()
    fetchNotification()
    fetchDayChart()
    fetchRevenueChart()
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
    justify-content: flex-start;
    flex-wrap: wrap;
}

.notification {
    height: 51rem;
    max-width: 45rem;
    background-color: #cdecde;
    border-radius: 1rem;
    overflow: hidden;
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 2rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.ratio-order-chart {
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 1rem;
}

.ratio-guest-chart {
    width: 50%;
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 1rem;
}

.noti-container {
    height: 88%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

}

.each-noti {
    width: 98%;
    border-radius: 0.3rem;
    /* height: 8rem; */
    background-color: #bbdccd;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.access-number {
    height: 10rem;
    background-color: #cdecde;
    width: 10rem;
    padding: 0.5rem;
    padding-top: 1.5rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.revenue-number {
    height: 10rem;
    background-color: #cdecde;
    width: 100%;
    padding: 0.5rem;
    padding-top: 1.5rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.advise-number {
    height: 10rem;
    background-color: #cdecde;
    width: 10rem;
    padding: 0.5rem;
    padding-top: 1.5rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.count-number {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: red;
}

.day-chart,
.revenue-chart {
    width: 49%;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #cdecde;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}



.outer-container {
    width: 100%;
    margin-top: 2rem;
}

.chart-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.each-noti p:first-child {
    /* width: 33rem; */
    white-space: nowrap;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    white-space: initial;
}

.second-column {
    width: 35%;
    height: inherit;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.lower-section {
    margin-top: 2rem;
}
</style>