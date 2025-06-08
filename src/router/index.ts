import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../view/Home.vue'),
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/selected',
      name: 'Selected',
      component: () => import('../view/Selected.vue'),
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/follow',
      name: 'Follow',
      component: () => import('../view/Follow.vue'),
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../view/Profile.vue'),
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/selectday',
      name: 'SelectDay',
      component: () => import('../view/selectday/index.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../view/selectday/detail.vue')
    },
    {
      path: '/customer-service',
      name: 'CustomerService',
      component: () => import('../view/CustomerService.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../view/Settings.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../view/About.vue')
    },
    {
      path: '/user-agreement',
      name: 'UserAgreement',
      component: () => import('../view/UserAgreement.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('../view/Privacy.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 确保页面滚动到顶部
  window.scrollTo(0, 0);
  next();
});

export default router;