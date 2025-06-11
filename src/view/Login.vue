<template>
  <div class="login-page">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    
    <div class="login-form">
      <van-form @submit="login">
        <van-cell-group inset>
          <van-field
            v-model="form.email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱地址"
            :rules="[
              { required: true, message: '请输入邮箱地址' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' }
            ]"
            :error-message="errors.email"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            :error-message="errors.password"
          />
        </van-cell-group>

        <div class="form-actions">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
            loading-text="登录中..."
          >
            登录
          </van-button>
        </div>
      </van-form>

      <van-notice-bar
        v-if="errors.general"
        color="#ed3f14"
        background="#fee"
        :text="errors.general"
      />

      <div class="register-link">
        还没有账号？
        <router-link to="/register" class="van-button--text">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../utils/auth';
import { Notify } from 'vant';

const router = useRouter();
const isSubmitting = ref(false);

const form = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: '',
  general: ''
});

const login = async (values: any) => {
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  isSubmitting.value = true;

  try {
    const response = await AuthService.login({
      email: form.email,
      password: form.password
    });

    // 保存令牌到本地存储
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    // 设置底部导航栏选中"我的"选项
    localStorage.setItem('tabbarActive', '1');

    Notify({ type: 'success', message: '登录成功' });
    router.push('/profile');
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      if (message.includes('邮箱')) {
        errors.email = message;
      } else if (message.includes('密码')) {
        errors.password = message;
      } else {
        errors.general = message || '登录失败，请检查您的邮箱和密码';
      }
    } else {
      errors.general = '网络错误，请检查您的连接';
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 50px;
}

:deep(.van-nav-bar) {
  background-color: #fff;

  .van-nav-bar__title {
    color: #333;
    font-weight: bold;
  }

  .van-nav-bar__text,
  .van-icon {
    color: #666;
  }
}

.login-form {
  // padding-left: 40px;
  // padding-right: 40px;
  padding-top: 16px;

  .form-actions {
    margin: 16px;
  }

  .register-link {
    text-align: center;
    margin-top: 16px;
    color: var(--van-text-color-2);
    font-size: 14px;

    a {
      color: var(--van-primary-color);
      text-decoration: none;

      &:active {
        opacity: 0.7;
      }
    }
  }
}

:deep(.van-cell-group) {
  padding: 16px 16px 8px;
}

:deep(.van-notice-bar) {
  margin: 16px;
  border-radius: 4px;
}
</style>