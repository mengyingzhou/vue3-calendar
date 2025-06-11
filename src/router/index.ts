import { createRouter, createWebHistory } from 'vue-router';

// 检查用户是否已登录
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../view/Register.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../view/Login.vue'),
      meta: {
        requiresGuest: true
      }
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
      component: () => import('../view/Profile.vue')
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
      path: '/accountsetting',
      name: 'AccountSetting',
      component: () => import('../view/AccountSetting.vue'),
      meta: {
        requiresAuth: true
      }
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
  
  // // 检查路由是否需要登录
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // // 检查路由是否只允许未登录用户访问（如登录、注册页面）
  // const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  
  // const isLoggedIn = isAuthenticated();
  
  // if (requiresAuth && !isLoggedIn) {
  //   // 如果需要登录但用户未登录，重定向到登录页面
  //   next({ name: 'Login', query: { redirect: to.fullPath } });
  // } else if (requiresGuest && isLoggedIn) {
  //   // 如果页面只允许未登录用户访问，但用户已登录，重定向到首页
  // } else {
  //   // 其他情况正常导航
    next();
  // }
});

export default router;