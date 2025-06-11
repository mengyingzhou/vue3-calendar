<template>
  <div class="account-setting-page">
    <van-nav-bar
      title="账号设置"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />

    <div class="account-setting-content">
      <!-- 头像设置 -->
      <van-cell-group inset class="avatar-group">
        <van-cell title="头像" center>
          <template #right-icon>
            <van-uploader
              v-model="fileList"
              :max-count="1"
              :before-read="beforeAvatarUpload"
              @after-read="afterAvatarRead"
            >
              <div class="avatar-wrapper">
                <van-image
                  round
                  width="60"
                  height="60"
                  :src="userInfo.avatar || '/src/assets/images/avatar.svg'"
                />
                <div class="avatar-edit">
                  <van-icon name="photograph" />
                </div>
              </div>
            </van-uploader>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 基本信息设置 -->
      <van-form @submit="saveBasicInfo">
        <van-cell-group inset class="form-group">
          <van-field
            v-model="form.username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' }
            ]"
            :error-message="errors.username"
          />
          <van-field
            v-model="form.email"
            label="邮箱"
            placeholder="请输入邮箱"
            readonly
          />
        </van-cell-group>

        <div class="form-actions">
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

      <!-- 安全设置 -->
      <van-cell-group inset class="security-group" title="安全设置">
        <van-cell
          title="修改密码"
          is-link
          @click="showPasswordDialog = true"
        />
      </van-cell-group>

      <!-- 退出登录 -->
      <div class="logout-section">
        <van-button
          round
          block
          type="danger"
          @click="showLogoutConfirm"
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
      @confirm="changePassword"
      :before-close="beforeDialogClose"
    >
      <van-form @submit.prevent>
        <van-field
          v-model="passwordForm.oldPassword"
          type="password"
          label="当前密码"
          placeholder="请输入当前密码"
          :rules="[{ required: true, message: '请输入当前密码' }]"
          :error-message="errors.oldPassword"
        />
        <van-field
          v-model="passwordForm.newPassword"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码至少6个字符' }
          ]"
          :error-message="errors.newPassword"
        />
        <van-field
          v-model="passwordForm.confirmPassword"
          type="password"
          label="确认新密码"
          placeholder="请再次输入新密码"
          :rules="[
            { required: true, message: '请确认新密码' },
            { validator: validateConfirmPassword, message: '两次输入的密码不一致' }
          ]"
          :error-message="errors.confirmPassword"
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
import type { UploaderFileListItem } from 'vant';

const router = useRouter();
const isSubmitting = ref(false);
const isLoggingOut = ref(false);
const showPasswordDialog = ref(false);
const fileList = ref<UploaderFileListItem[]>([]);

const userInfo = reactive({
  avatar: '',
  username: '',
  email: '',
  bio: ''
});

const form = reactive({
  username: '',
  email: '',
  bio: ''
});

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const errors = reactive({
  username: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  general: ''
});

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const data = await AuthService.getUserInfo();
    Object.assign(userInfo, data);
    Object.assign(form, {
      username: data.username,
      email: data.email,
      bio: data.bio || ''
    });
  } catch (error: any) {
    Notify({ type: 'danger', message: '获取用户信息失败' });
  }
};

// 头像上传相关
const beforeAvatarUpload = (file: File) => {
  // 验证文件类型和大小
  const isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    Notify({ type: 'warning', message: '只能上传图片文件！' });
    return false;
  }
  if (!isLt2M) {
    Notify({ type: 'warning', message: '图片大小不能超过 2MB！' });
    return false;
  }
  return true;
};

const afterAvatarRead = async (file: UploaderFileListItem) => {
  try {
    // TODO: 实现头像上传逻辑
    const formData = new FormData();
    formData.append('avatar', file.file as File);
    
    // const response = await AuthService.updateAvatar(formData);
    // userInfo.avatar = response.avatarUrl;
    Notify({ type: 'success', message: '头像更新成功' });
  } catch (error) {
    Notify({ type: 'danger', message: '头像上传失败' });
    fileList.value = [];
  }
};

// 保存基本信息
const saveBasicInfo = async () => {
  isSubmitting.value = true;
  try {
    await AuthService.updateUserInfo({
      username: form.username
    });
    Notify({ type: 'success', message: '保存成功' });
  } catch (error: any) {
    Notify({ type: 'danger', message: error.message || '保存失败' });
  } finally {
    isSubmitting.value = false;
  }
};

// 修改密码相关
const validateConfirmPassword = () => {
  return passwordForm.newPassword === passwordForm.confirmPassword;
};

const beforeDialogClose = (action: string) => {
  if (action === 'confirm') {
    return false;
  }
  // 关闭弹窗时重置表单
  passwordForm.oldPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
  Object.keys(errors).forEach(key => {
    if (key.includes('Password')) {
      errors[key as keyof typeof errors] = '';
    }
  });
  return true;
};

const changePassword = async () => {
  try {
    await AuthService.changePassword({
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    });
    Notify({ type: 'success', message: '密码修改成功' });
    showPasswordDialog.value = false;
  } catch (error: any) {
    if (error.response?.data?.message.includes('当前密码')) {
      errors.oldPassword = error.response.data.message;
    } else {
      Notify({ type: 'danger', message: error.message || '密码修改失败' });
    }
  }
};

// 退出登录
const showLogoutConfirm = () => {
  Dialog({
    title: '确认退出',
    message: '确定要退出登录吗？',
    beforeClose: async (action) => {
      if (action === 'confirm') {
        isLoggingOut.value = true;
        try {
          await AuthService.logout();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        } catch (error) {
          Notify({ type: 'danger', message: '退出登录失败' });
        } finally {
          isLoggingOut.value = false;
        }
        return true;
      }
      return true;
    },
  });
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style lang="less" scoped>
.account-setting-page {
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

.account-setting-content {
  padding-top: 16px;

  .avatar-group {
    margin-bottom: 12px;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .security-group {
    margin-bottom: 12px;
  }

  .other-group {
    margin-bottom: 24px;
  }

  .form-actions {
    margin: 16px;
  }

  .logout-section {
    margin: 24px 16px;
  }
}

.avatar-wrapper {
  position: relative;
  display: inline-block;

  .avatar-edit {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    background-color: var(--van-primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .van-icon {
      color: white;
      font-size: 12px;
    }
  }
}

:deep(.van-cell-group__title) {
  padding: 16px 16px 8px;
}

:deep(.van-dialog) {
  .van-field {
    padding: 16px;
  }
}
</style>