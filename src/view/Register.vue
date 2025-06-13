<template>
  <div class="register-page">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    
    <div class="register-form">
      <van-form @submit="register">
        <van-cell-group inset>
          <van-field
            v-model="form.phone"
            name="phone"
            label="手机号(登录账号)"
            placeholder="请输入手机号"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]"
            :error-message="errors.phone"
          />
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
            v-model="form.username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' }
            ]"
            :error-message="errors.username"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[
              { required: true, message: '请输入密码' },
              { validator: (val) => /^(?=.*[A-Za-z])(?=.*\d).{6,32}$/.test(val),
                message: '需6-32位且包含字母和数字' }
            ]"
            :error-message="errors.password"
          />
          <van-field
            v-model="form.confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="[
              { required: true, message: '请确认密码' },
              { validator: validateConfirmPassword, message: '两次输入的密码不一致' }
            ]"
            :error-message="errors.confirmPassword"
          />
          <van-field
            name="birthdate"
            label="生日"
            :error-message="errors.birthdate"
          >
            <template #input>
              <input 
                type="datetime-local" 
                id="birthdate" 
                v-model="form.birthdate" 
                class="datetime-input"
                required
                @change="onBirthdateChange"
              />
            </template>
          </van-field>

          <van-field
            name="gender"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
            :error-message="errors.gender"
          >
            <template #input>
              <van-radio-group v-model="form.gender" direction="horizontal">
                <van-radio name="male">男</van-radio>
                <van-radio name="female">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>

        <div class="form-actions">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
            loading-text="注册中..."
          >
            注册
          </van-button>
        </div>
      </van-form>

      <van-notice-bar
        v-if="errors.general"
        color="#ed3f14"
        background="#fee"
        :text="errors.general"
      />

      <div class="login-link">
        已有账号？
        <router-link to="/login" class="van-button--text">立即登录</router-link>
      </div>
    </div>

    <!-- 使用原生日期时间选择器，不需要弹窗 -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../utils/auth';
import { Notify } from 'vant';
import dayjs from 'dayjs';

interface RegisterRequest {
  phone: string;
  email: string;
  username: string;
  password: string;
  birthdate: string;
  gender: string;
}

const router = useRouter();
const isSubmitting = ref(false);

const form = reactive({
  phone: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  birthdate: '',  // 改为字符串类型
  gender: ''
});

const errors = reactive({
  phone: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  gender: '',
  general: ''
});

// 处理生日日期变更
const onBirthdateChange = () => {
  errors.birthdate = '';
};

const validateConfirmPassword = () => {
  return form.password === form.confirmPassword;
};

const register = async () => {
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  isSubmitting.value = true;

  try {
    // 表单验证
    if (!form.birthdate) {
      errors.birthdate = '请选择生日';
      isSubmitting.value = false;
      return;
    }

    if (!form.gender) {
      errors.gender = '请选择性别';
      isSubmitting.value = false;
      return;
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致';
      isSubmitting.value = false;
      return;
    }

    if (!form.phone) {
      errors.phone = '请输入手机号';
      isSubmitting.value = false;
      return;
    }

    console.log(form);
    // 发送注册请求
    const response = await AuthService.register({
      phone: form.phone,
      email: form.email,
      username: form.username,
      password: form.password,
      birthdate: form.birthdate,
      gender: form.gender
    });

    Notify({ type: 'success', message: '注册成功' });
    
    // 延迟跳转，让用户看到成功提示
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      if (message && typeof message === 'string') {
        if (message.includes('邮箱')) {
          errors.email = message;
        } else if (message.includes('手机号')) {
          errors.phone = message;
        } else if (message.includes('用户名')) {
          errors.username = message;
        } else if (message.includes('密码')) {
          errors.password = message;
        } else if (message.includes('生日')) {
          errors.birthdate = message;
        } else if (message.includes('性别')) {
          errors.gender = message;
        } else {
          errors.general = message || '注册失败，请稍后再试';
        }
      } else {
        errors.general = '注册失败，请稍后再试';
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
.register-page {
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

.register-form {
  padding-top: 16px;

  .form-actions {
    margin: 16px;
  }

  .login-link {
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

:deep(.van-radio-group) {
  display: flex;
  align-items: center;
  
  .van-radio {
    margin-right: 16px;
    
    &:last-child {
      margin-right: 0;
    }
  }
}

:deep(.van-datetime-picker) {
  .van-picker__toolbar {
    padding: 8px 16px;
  }
}

.datetime-input {
  width: 100%;
  height: 24px;
  border: none;
  padding: 0;
  font-size: 14px;
  color: var(--van-text-color);
  background-color: transparent;
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    
    &:hover {
      opacity: 1;
    }
  }
}
</style>