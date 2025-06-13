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
            v-model="form.phone"
            name="phone"
            label="账号"
            placeholder="请输入手机号或邮箱地址"
            :rules="[
              { required: true, message: '请输入手机号或邮箱地址' },
              { 
                validator: (val) => {
                  // 验证是否为有效的邮箱或手机号
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  const phonePattern = /^1[3-9]\d{9}$/;
                  return emailPattern.test(val) || phonePattern.test(val);
                }, 
                message: '请输入有效的手机号或邮箱地址' 
              }
            ]"
            :error-message="errors.phone"
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
  phone: '',
  password: ''
});

const errors = reactive({
  phone: '',
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
    // 判断输入的是邮箱还是手机号
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.phone);
    const isPhone = /^1[3-9]\d{9}$/.test(form.phone);
    
    let loginParams;
    if (isEmail) {
      loginParams = {
        email: form.phone,
        password: form.password
      };
    } else if (isPhone) {
      loginParams = {
        phone: form.phone,
        password: form.password
      };
    } else {
      throw new Error('请输入有效的手机号或邮箱地址');
    }
    
    const response = await AuthService.login(loginParams);

    // AuthService.login 已经保存了令牌到本地存储，这里不需要重复
    // 设置底部导航栏选中"我的"选项
    localStorage.setItem('tabbarActive', '1');

    Notify({ type: 'success', message: '登录成功' });
    router.push('/profile');
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      if (message && typeof message === 'string') {
        if (message.includes('邮箱') || message.includes('手机号')) {
          errors.phone = message;
        } else if (message.includes('密码')) {
          errors.password = message;
        } else {
          errors.general = message || '登录失败，请检查您的账号和密码';
        }
      } else {
        errors.general = '登录失败，请检查您的账号和密码';
      }
    } else {
      errors.general = error.message || '网络错误，请检查您的连接';
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