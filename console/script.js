document.addEventListener('DOMContentLoaded', function() {
    // 从JSON文件加载数据
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeBlocks(data);
        })
        .catch(error => console.error('Error loading data:', error));
});

// 初始化所有区块
function initializeBlocks(data) {
    const blocks = ['block-1', 'block-2', 'block-3'];
    blocks.forEach((blockClass, index) => {
        const container = document.querySelector(`.${blockClass} .components-container`);
        const components = data.blocks[index].components;
        
        components.forEach(componentData => {
            const component = createComponent(componentData, index);
            container.appendChild(component);
        });
    });
}

// 创建单个组件
function createComponent(data, blockIndex) {
    // 根据区块选择模板
    const templateId = blockIndex === 1 ? 'component-template-no-image' : 'component-template-with-image';
    const template = document.getElementById(templateId);
    const component = template.content.cloneNode(true);
    
    // 设置文本内容
    const textElement = component.querySelector('.text');
    textElement.textContent = data.text;
    
    // 设置链接
    const linkInput = component.querySelector('.link-input');
    linkInput.value = data.link;
    
    // 只为带图片的组件初始化图片上传
    if (blockIndex !== 1) {
        const imageContainer = component.querySelector('.image-upload-container');
        if (imageContainer) {
            // 设置正确的图片路径
            const img = component.querySelector('img');
            const componentIndex = document.querySelectorAll(`.block-${blockIndex+1} .component`).length;
            const imagePath = `images/image${blockIndex+1}-${componentIndex+1}.jpg`;
            img.src = imagePath;
            
            initializeImageUpload(imageContainer);
        }
    }
    
    // 初始化按钮事件
    initializeButtons(component.querySelector('.component'));
    
    // 初始化文本编辑
    initializeTextEdit(textElement);
    
    return component.firstElementChild;
}

// 初始化图片上传功能
function initializeImageUpload(container) {
    const input = container.querySelector('.image-upload');
    const img = container.querySelector('img');
    const uploadBtn = container.querySelector('.upload-btn');
    const progressBar = container.querySelector('.upload-progress');
    
    uploadBtn.addEventListener('click', () => input.click());
    
    input.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 检查文件大小
        const maxSize = parseInt(this.dataset.maxSize) * 1024;
        if (file.size > maxSize) {
            alert(`图片大小不能超过 ${maxSize/1024}KB`);
            return;
        }
        
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件');
            return;
        }

        // 生成新的文件名（使用当前图片名）
        const currentImageName = img.src.split('/').pop();
        const ext = file.name.split('.').pop();
        const newFileName = currentImageName.includes('placeholder') ? 
            `image_${Date.now()}.${ext}` : currentImageName;

        // 创建FormData对象
        const formData = new FormData();
        formData.append('image', file, newFileName);
        
        // 显示上传进度
        progressBar.style.width = '0%';
        
        try {
            // 发送图片到服务器保存
            const response = await fetch('upload', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // 更新图片显示
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                    progressBar.style.width = '100%';
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                    }, 500);
                    showSaveIndicator('图片上传成功');
                };
                reader.readAsDataURL(file);
            } else {
                throw new Error('上传失败');
            }
        } catch (error) {
            console.error('上传错误:', error);
            alert('图片上传失败，请重试');
            progressBar.style.width = '0%';
        }
    });
}

// 初始化按钮事件
function initializeButtons(component) {
    const showLinkBtn = component.querySelector('.show-link-btn');
    const editLinkBtn = component.querySelector('.edit-link-btn');
    const linkInput = component.querySelector('.link-input');
    
    showLinkBtn.addEventListener('click', () => {
        const url = linkInput.value.trim();
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('链接为空，无法跳转');
        }
    });
    
    editLinkBtn.addEventListener('click', () => {
        linkInput.style.display = linkInput.style.display === 'block' ? 'none' : 'block';
        if (linkInput.style.display === 'block') {
            linkInput.focus();
        }
    });
    
    linkInput.addEventListener('change', () => {
        saveToJson();
        linkInput.style.display = 'none';
    });
    
    linkInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            linkInput.blur();
        }
    });
}

// 初始化文本编辑
function initializeTextEdit(element) {
    element.addEventListener('blur', saveToJson);
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
}

// 保存数据到JSON
async function saveToJson() {
    const data = {
        title: "修改后台数据",
        blocks: []
    };
    
    ['block-1', 'block-2', 'block-3'].forEach((blockClass, index) => {
        const block = document.querySelector(`.${blockClass}`);
        const components = Array.from(block.querySelectorAll('.component')).map(comp => {
            const componentData = {
                text: comp.querySelector('.text').textContent,
                link: comp.querySelector('.link-input').value
            };
            
            return componentData;
        });
        
        data.blocks.push({
            title: block.querySelector('h2').textContent,
            components: components
        });
    });
    
    // 显示保存中提示
    showSaveIndicator('正在保存...');
    
    try {
        // 发送数据到服务器
        const response = await fetch('save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('保存失败');
        }
        
        // 显示保存成功提示
        showSaveIndicator('保存成功');
    } catch (error) {
        console.error('保存错误:', error);
        showSaveIndicator('保存失败');
    }
}

// 保存提示
let saveTimeout;
function showSaveIndicator(message = '已保存') {
    clearTimeout(saveTimeout);
    const indicator = document.getElementById('save-indicator') || createSaveIndicator();
    indicator.textContent = message;
    indicator.style.opacity = '1';
    
    if (message !== '正在保存...') {
        saveTimeout = setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }
}

function createSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'save-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 4px;
        transition: opacity 0.3s;
        z-index: 1000;
        font-size: 16px;
    `;
    document.body.appendChild(indicator);
    return indicator;
}