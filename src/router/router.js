import Vue from 'vue'
import VueRouter from 'vue-router'

import { App } from '@capacitor/app'

import LoginPage from '@/pages/auth/LoginPage.vue';
import RegisterPage from '@/pages/auth/RegisterPage.vue';
import ChatListPage from '@/pages/chat-list/ChatListPage.vue';
import ChatPage from '@/pages/chat/ChatPage.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/login',
            name: 'home',
            component:LoginPage,
        },

        {
          path: '/register',
          name: 'register',
          component:RegisterPage,
        },

        {
          path: '/chats-list',
          name: 'chat-list',
          component:ChatListPage,
        },
        
        {
          path: '/chat',
          name: 'chat',
          component:ChatPage,
          props:true
        },

        {
          path: '*',
          redirect: '/login',
        },
    ]
  });

  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp()
    } else {
      window.history.back()
    }
  })


  router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
      next();
    } else {
      console.warn('NavigationDuplicated: Avoided redundant navigation to current location:', to.fullPath);
    }
  });
  
  export default router;