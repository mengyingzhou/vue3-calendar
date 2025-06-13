<template>
  <div class="account-settings">
    <van-nav-bar
      title="账号设置"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
    
    <div class="form-wrapper">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="userInfo.username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          
          <van-field
            v-model="userInfo.email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            :rules="[
              { required: true, message: '请填写邮箱' },
              { pattern: /.+@.+\..+/, message: '请输入有效的邮箱地址' }
            ]"
          />
          
          <van-field
            v-model="userInfo.phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]"
          />
          
          <van-field
            name="birthdate"
            label="生日"
          >
            <template #input>
              <input 
                type="datetime-local" 
                id="birthdate" 
                v-model="userInfo.birthdate" 
                class="datetime-input"
                required
                @change="onBirthDateChange"
              />
            </template>
          </van-field>
          
          <van-field
            name="gender"
            label="性别"
          >
            <template #input>
              <van-radio-group v-model="userInfo.gender" direction="horizontal">
                <van-radio name="male">男</van-radio>
                <van-radio name="female">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>

        <div class="submit-btn-wrapper">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
          >
            保存修改
          </van-button>
        </div>
      </van-form>

      <div class="action-buttons">
        <van-button
          round
          block
          type="primary"
          plain
          @click="showPasswordDialog = true"
        >
          修改密码
        </van-button>
        
        <van-button
          round
          block
          type="danger"
          plain
          @click="confirmLogout"
          :loading="isLoggingOut"
        >
          退出登录
        </van-button>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <van-dialog
      v-model:show="showPasswordDialog"
      title="修改密码"
      show-cancel-button
      @confirm="onChangePassword"
    >
      <van-form>
        <van-field
          v-model="passwordForm.oldPassword"
          type="password"
          name="oldPassword"
          label="当前密码"
          placeholder="请输入当前密码"
          :rules="[
            { required: true, message: '请输入当前密码' },
            { validator: (val) => /^(?=.*[A-Za-z])(?=.*\d).{6,32}$/.test(val),
              message: '需6-32位且包含字母和数字' }
          ]"
        />
        <van-field
          v-model="passwordForm.newPassword"
          type="password"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[
            { required: true, message: '请输入新密码' },
            { validator: (val) => /^(?=.*[A-Za-z])(?=.*\d).{6,32}$/.test(val),
              message: '需6-32位且包含字母和数字' }
          ]"
        />
        <van-field
          v-model="passwordForm.confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          placeholder="请再次输入新密码"
          :rules="[
            { required: true, message: '请确认新密码' },
            {
              validator: (value) => value === passwordForm.newPassword,
              message: '两次输入的密码不一致'
            }
          ]"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Notify, Dialog } from 'vant';
import { AuthService } from '../utils/auth';

const router = useRouter();
const isSubmitting = ref(false);
const isLoggingOut = ref(false);
const showPasswordDialog = ref(false);

const userInfo = reactive({
  username: '',
  email: '',
  phone: '',
  birthdate: '',
  gender: ''
});

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const data = await AuthService.getCurrentUser();
    Object.assign(userInfo, data);
  } catch (error) {
    Notify({ type: 'danger', message: '获取用户信息失败' });
  }
};

// 提交表单
const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    const response = await AuthService.updateUserInfo(userInfo);
    Notify({ type: 'success', message: response.message || '保存成功' });
  } catch (error: any) {
    Notify({ type: 'danger', message: error.response.data.message || '保存失败' });
  } finally {
    isSubmitting.value = false;
  }
};

// 修改密码
const onChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    Notify({ type: 'warning', message: '两次输入的密码不一致' });
    return;
  }

  try {
    await AuthService.changePassword({
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    });
    showPasswordDialog.value = false;
    Notify({ type: 'success', message: '密码修改成功'});

    // 清空表单
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  } catch (error) {
    Notify({ type: 'danger', message: error.response.data.message || '修改密码失败' });
  }
};

// 退出登录
const confirmLogout = () => {
  Dialog.confirm({
    title: '确认退出',
    message: '确定要退出登录吗？',
  })
    .then(async () => {
      try {
        isLoggingOut.value = true;
        await AuthService.logout();
        router.push('/login');
      } catch (error) {
        Notify({ type: 'danger', message: '退出登录失败' });
      } finally {
        isLoggingOut.value = false;
      }
    })
    .catch(() => {
      // 取消退出
    });
};

// 处理生日日期变更
const onBirthDateChange = () => {
  // 可以在这里添加验证逻辑
};

// 页面加载时获取用户信息
onMounted(() => {
  fetchUserInfo();
});
</script>

<style lang="less" scoped>
.account-settings {
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

.form-wrapper {
  padding: 16px;
}

.submit-btn-wrapper {
  margin: 16px;
}

.action-buttons {
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.van-field__label) {
  width: 4.5em;
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