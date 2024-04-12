"use strict";
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/client/HomeView.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import { useLoginStore } from '../stores/loginstate';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tim-kiem',
      name: 'tim-kiem',
      // query: { keyword },
      component: () => import('../views/client/SearchView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
    {
      path: '/danh-muc/du-lich-trong-nuoc',
      name: 'du lich trong nuoc',
      component: () => import('../views/client/DomesticView.vue')
    },
    {
      path: '/danh-muc/du-lich-quoc-te',
      name: 'du lich quoc te',
      component: () => import('../views/client/ForeignView.vue')
    },
    {
      path: '/khu-vuc/:slug',
      name: 'khu vuc',
      component: () => import('../views/client/RegionView.vue')
    }, {
      path: '/dia-diem/:slug',
      name: 'dia diem',
      component: () => import('../views/client/LocationView.vue')
    },
    {
      path: '/tour-hot',
      name: 'tour-hot',
      component: () => import('../views/client/HotTourView.vue')
    },
    {
      path: '/tour-khuyen-mai',
      name: 'tour-khuyen-mai',
      component: () => import('../views/client/DiscountView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue')
    },
    {
      path: '/:slug',
      name: 'tour',
      component: () => import('../views/client/TourView.vue')
    },
    {
      path: '/bai-viet/:slug',
      name: 'bai-viet',
      component: () => import('../views/client/PostView.vue')
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/client/AboutView.vue'),
      children: [
        { path: 'gioi-thieu', component: () => import('../views/about/IntroductionView.vue') },
        { path: 'chinh-sach-va-quy-dinh', component: () => import('../views/about/PolicyView.vue') },
        { path: 'bao-hiem-dich-vu', component: () => import('../views/about/InsuranceView.vue') },
        { path: 'quy-trinh', component: () => import('../views/about/ProcedureView.vue') },
      ]
    },
    {
      path: '/cam-nang',
      name: 'cam nang',
      component: () => import('../views/client/PostList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/LoginView.vue'),
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: 'dat-tour',
          component: () => import('../views/admin/OrderManage.vue')
        },
        {
          path: 'quan-ly-tour',
          component: () => import('../views/admin/TourManage.vue')
        },
        {
          path: 'bai-viet',
          component: () => import('../views/admin/PostManage.vue')
        },
        {
          path: 'bai-viet/tao-bai-viet',
          component: () => import('../views/admin/NewPost.vue')
        },
        {
          path: 'bai-viet/chinh-sua-bai-viet/:slug',
          component: () => import('../views/admin/EditPost.vue')
        },
        {
          path: 'quan-ly-tour/them-tour',
          component: () => import('../views/admin/AddTour.vue')
        },
        {
          path: 'quan-ly-tour/chinh-sua-tour',
          component: () => import('../views/admin/EditTour.vue')
        },
        {
          path: 'quan-ly-khu-vuc',
          component: () => import('../views/admin/RegionManage.vue')
        },
        {
          path: 'quan-ly-dia-diem',
          component: () => import('../views/admin/LocationManage.vue')
        },
        {
          path: 'thong-ke',
          component: () => import('../views/admin/StatisticPage.vue')
        },
        {
          path: 'dang-ky-tu-van',
          component: () => import('../views/admin/AdvisoryManage.vue')
        },
        {
          path: 'quan-ly-hot-tour',
          component: () => import('../views/admin/HotTourManage.vue')
        },
        {
          path: 'quan-ly-slider',
          component: () => import('../views/admin/SliderManage.vue')
        },
        {
          path: 'quan-ly-slider/them-slide',
          component: () => import('../views/admin/AddSlider.vue')
        },
        {
          path: 'tai-khoan-admin',
          component: () => import('../views/admin/AdminAccount.vue')
        },
        {
          path: 'thu-vien',
          component: () => import('../views/admin/ImageLibrary.vue')
        },
      ],
      meta: {
        hideNavbar: true,
      },
      beforeEnter: async (to, from, next) => {
        const loginStore = useLoginStore();

        await new Promise(resolve => {
          (function checkLoginState() {
            const loginState = loginStore.login;
            if (loginState !== null) {
              if (loginState) {
                next();
              } else {
                next({ path: '/login' });
              }
              resolve();
            } else {
              setTimeout(checkLoginState, 1000);
            }
          })()
        });
      }

    },
  ]

})

export default router
