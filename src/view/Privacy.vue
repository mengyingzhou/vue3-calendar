<template>
  <div class="privacy">
    <van-nav-bar
      title="隐私权益"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
      <div class="privacy-container">
        <h2>玄叨叨隐私政策</h2>
        <p class="update-time">更新日期：2023年12月1日</p>
        
        <div class="privacy-section">
          <h3>引言</h3>
          <p>玄叨叨（以下简称"我们"）深知个人信息对您的重要性，我们将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。</p>
        </div>
        
        <div class="privacy-section">
          <h3>1. 我们如何收集和使用您的个人信息</h3>
          <p>1.1 注册信息</p>
          <p>当您注册玄叨叨账号时，我们需要收集：</p>
          <ul>
            <li>手机号码：用于账号注册和登录验证</li>
            <li>用户名：用于识别和展示</li>
            <li>密码：用于账号安全保护</li>
          </ul>
          
          <p>1.2 运行必需信息</p>
          <p>为保证应用正常运行，我们可能收集：</p>
          <ul>
            <li>设备信息：设备型号、操作系统版本、设备设置、设备标识符</li>
            <li>日志信息：使用时间、使用时长、操作记录、崩溃记录</li>
            <li>位置信息：用于提供本地化服务（您可以在设备设置中随时关闭定位功能）</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>2. 我们如何使用 Cookie 和同类技术</h3>
          <p>2.1 Cookie 的使用</p>
          <p>为确保网站正常运转，我们会在您的计算机或移动设备上存储名为 Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。我们使用 Cookie 来：</p>
          <ul>
            <li>记住您的身份信息</li>
            <li>了解您的偏好设置</li>
            <li>帮助判断您的登录状态</li>
            <li>帮助您获得更轻松的访问体验</li>
          </ul>
          
          <p>2.2 Cookie 的控制</p>
          <p>您可以通过浏览器设置拒绝或管理 Cookie。但请注意，如果停用 Cookie，您可能无法享受最佳的服务体验，某些服务也可能无法正常使用。</p>
        </div>
        
        <div class="privacy-section">
          <h3>3. 我们如何共享、转让、公开披露您的个人信息</h3>
          <p>3.1 共享</p>
          <p>我们不会与任何公司、组织和个人分享您的个人信息，但以下情况除外：</p>
          <ul>
            <li>在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息</li>
            <li>在法定情形下的共享：根据法律法规、法律程序、政府要求或强制性的行政或司法要求</li>
          </ul>
          
          <p>3.2 转让</p>
          <p>我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</p>
          <ul>
            <li>在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本隐私政策的约束</li>
          </ul>
          
          <p>3.3 公开披露</p>
          <p>我们仅会在以下情况下，公开披露您的个人信息：</p>
          <ul>
            <li>获得您明确同意后</li>
            <li>基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>4. 我们如何保护您的个人信息</h3>
          <p>4.1 我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失：</p>
          <ul>
            <li>使用加密技术确保数据的保密性</li>
            <li>使用受信赖的保护机制防止数据遭到恶意攻击</li>
            <li>部署访问控制机制，确保只有授权人员才可访问个人信息</li>
            <li>举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>5. 您的权利</h3>
          <p>按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：</p>
          <ul>
            <li>访问您的个人信息</li>
            <li>更正您的个人信息</li>
            <li>删除您的个人信息</li>
            <li>改变您授权同意的范围</li>
            <li>注销账号</li>
            <li>获取个人信息副本</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>6. 变更</h3>
          <p>我们可能适时修订本隐私政策的条款。如该等变更会导致您在本隐私政策下权利的实质减损，我们将在变更生效前通过在主页上显著位置提示或向您发送电子邮件或其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的隐私政策的约束。</p>
        </div>
        
        <div class="privacy-section">
          <h3>7. 如何联系我们</h3>
          <p>如您对本隐私政策有任何疑问、意见或建议，可以通过以下方式与我们联系：</p>
          <ul>
            <li>发送邮件至：privacy@xuandaodao.com</li>
            <li>拨打客服电话：400-123-4567</li>
          </ul>
          <p>一般情况下，我们将在收到您的请求后15个工作日内回复。</p>
        </div>
        
        <p class="privacy-footer">感谢您花时间了解我们的隐私政策。我们将继续致力于保护您的个人信息和隐私安全。</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onClickLeft = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.privacy {
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px; // 为底部导航栏预留空间
}

.content {
  padding: 16px;
}

.privacy-container {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  margin-bottom: 32px; // 增加底部间距，确保内容不被 tabbar 遮挡
  
  h2 {
    text-align: center;
    margin: 0 0 8px;
    font-size: 20px;
    color: #333;
  }
  
  .update-time {
    text-align: center;
    color: #999;
    font-size: 14px;
    margin-bottom: 24px;
  }
}

.privacy-section {
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    color: #333;
    margin: 0 0 12px;
  }
  
  p {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 8px 0;
    text-align: justify;
  }
  
  ul {
    margin: 8px 0;
    padding-left: 20px;
    
    li {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin: 4px 0;
    }
  }
}

.privacy-footer {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 32px;
  text-align: center;
}

:deep(.van-nav-bar) {
  background-color: #fff;
  
  .van-nav-bar__title {
    color: #333;
    font-weight: bold;
  }
  
  .van-nav-bar__text {
    color: #666;
  }
  
  .van-icon {
    color: #666;
  }
}
</style>