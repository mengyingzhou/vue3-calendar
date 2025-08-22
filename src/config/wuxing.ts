/**
 * 八卦五行配置文件
 * 记录每个五行的名称、性格描述、图片链接和固定颜色搭配
 */

export interface WuxingElement {
  name: string;         // 五行名称
  description: string;  // 性格描述
  imageUrl: string;     // 图片链接
  imageUrlStar?: string; // 收藏日的图片链接
  color: string;        // 主色调（十六进制颜色代码）
  secondaryColor?: string; // 次要色调（可选）
  traits?: string[];    // 特质列表（可选）
  category?: string;    // 五行分类（如：甲木、乙木等）
}

// 十天干对应的五行元素配置
export const wuxingElements: WuxingElement[] = [
  {
    name: '甲木',
    description: '参天巨木 刚健中正 追求上进',
    imageUrl: '/src/assets/icon/首页/五行图标/甲木.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-甲木.png',
    color: '#95C924', // 海洋绿
    category: '木',
    traits: ['刚健', '中正', '上进', '坚韧']
  },
  {
    name: '乙木',
    description: '明媚花草 柔韧顽强 懂得进退',
    imageUrl: '/src/assets/icon/首页/五行图标/乙木.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-乙木.png',
    color: '#95C924', // 淡绿色
    category: '木',
    traits: ['柔韧', '顽强', '灵活', '聪慧']
  },
  {
    name: '丙火',
    description: '光明太阳 温暖和煦 热情磊落',
    imageUrl: '/src/assets/icon/首页/五行图标/丙火.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-丙火.png',
    color: '#FF7C5C', // 红橙色
    category: '火',
    traits: ['光明', '温暖', '热情', '磊落']
  },
  {
    name: '丁火',
    description: '幽微烛火 敏感细心 温和谦逊',
    imageUrl: '/src/assets/icon/首页/五行图标/丁火.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-丁火.png',
    color: '#FF7C5C', // 深橙色
    category: '火',
    traits: ['敏感', '细心', '温和', '谦逊']
  },
  {
    name: '戊土',
    description: '稳重高山 踏实可靠 务实保守',
    imageUrl: '/src/assets/icon/首页/五行图标/戊土.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-戊土.png',
    color: '#BF864D', // 马鞍棕色
    category: '土',
    traits: ['稳重', '踏实', '可靠', '务实']
  },
  {
    name: '己土',
    description: '沃野田园 耐心细致 滋养包容',
    imageUrl: '/src/assets/icon/首页/五行图标/己土.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-己土.png',
    color: '#BF864D', // 金菊黄
    category: '土',
    traits: ['耐心', '细致', '滋养', '包容']
  },
  {
    name: '庚金',
    description: '锋利刀剑 干脆果断 锐意进取',
    imageUrl: '/src/assets/icon/首页/五行图标/庚金.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-庚金.png',
    color: '#FFC300', // 银色
    category: '金',
    traits: ['锋利', '果断', '进取', '坚决']
  },
  {
    name: '辛金',
    description: '精致珠宝 追求完美 敏锐聪慧',
    imageUrl: '/src/assets/icon/首页/五行图标/辛金.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-辛金.png',
    color: '#FFC300', // 金色
    category: '金',
    traits: ['精致', '完美', '敏锐', '聪慧']
  },
  {
    name: '壬水',
    description: '江河湖海 自由不羁 灵活应变',
    imageUrl: '/src/assets/icon/首页/五行图标/壬水.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-壬水.png',
    color: '#73C7FF', // 海军蓝
    category: '水',
    traits: ['自由', '不羁', '灵活', '应变']
  },
  {
    name: '癸水',
    description: '绵绵细雨 情感丰富 灵动聪慧',
    imageUrl: '/src/assets/icon/首页/五行图标/癸水.png',
    imageUrlStar: '/src/assets/icon/我的页面/收藏记录/收藏记录-癸水.png',
    color: '#73C7FF', // 淡蓝色
    category: '水',
    traits: ['细腻', '情感', '灵动', '聪慧']
  },
  // 十二地支对应的五行元素
  {
    name: '子',
    description: '子为鼠 北方子时 水行旺盛',
    imageUrl: '/assets/images/dizhi/zi.png',
    color: '#73C7FF', // 水行色
    category: '水',
    traits: ['智慧', '灵活', '适应力强', '隐忍']
  },
  {
    name: '丑',
    description: '丑为牛 稳重踏实 土中藏水',
    imageUrl: '/assets/images/dizhi/chou.png',
    color: '#BF864D', // 土行色
    category: '土',
    traits: ['勤劳', '忠诚', '坚韧', '保守']
  },
  {
    name: '寅',
    description: '寅为虎 威猛刚烈 木气旺盛',
    imageUrl: '/assets/images/dizhi/yin.png',
    color: '#95C924', // 木行色
    category: '木',
    traits: ['勇敢', '威严', '独立', '冲劲']
  },
  {
    name: '卯',
    description: '卯为兔 温和敏感 木性柔和',
    imageUrl: '/assets/images/dizhi/mao.png',
    color: '#95C924', // 木行色
    category: '木',
    traits: ['温和', '敏感', '优雅', '机智']
  },
  {
    name: '辰',
    description: '辰为龙 变化多端 土中藏木',
    imageUrl: '/assets/images/dizhi/chen.png',
    color: '#BF864D', // 土行色
    category: '土',
    traits: ['神秘', '变化', '权威', '创造力']
  },
  {
    name: '巳',
    description: '巳为蛇 灵动智慧 火性隐秘',
    imageUrl: '/assets/images/dizhi/si.png',
    color: '#FF7C5C', // 火行色
    category: '火',
    traits: ['智慧', '敏锐', '神秘', '优雅']
  },
  {
    name: '午',
    description: '午为马 奔放热烈 火气旺盛',
    imageUrl: '/assets/images/dizhi/wu.png',
    color: '#FF7C5C', // 火行色
    category: '火',
    traits: ['活力', '热情', '自由', '直率']
  },
  {
    name: '未',
    description: '未为羊 温顺和善 土中藏火',
    imageUrl: '/assets/images/dizhi/wei.png',
    color: '#BF864D', // 土行色
    category: '土',
    traits: ['温顺', '和善', '艺术', '包容']
  },
  {
    name: '申',
    description: '申为猴 机智灵活 金气初显',
    imageUrl: '/assets/images/dizhi/shen.png',
    color: '#FFC300', // 金行色
    category: '金',
    traits: ['机智', '灵活', '变通', '好奇']
  },
  {
    name: '酉',
    description: '酉为鸡 精明严谨 金性锐利',
    imageUrl: '/assets/images/dizhi/you.png',
    color: '#FFC300', // 金行色
    category: '金',
    traits: ['精明', '严谨', '勤勉', '守时']
  },
  {
    name: '戌',
    description: '戌为狗 忠诚守护 土中藏金',
    imageUrl: '/assets/images/dizhi/xu.png',
    color: '#BF864D', // 土行色
    category: '土',
    traits: ['忠诚', '守护', '正直', '公正']
  },
  {
    name: '亥',
    description: '亥为猪 厚德载物 水气初生',
    imageUrl: '/assets/images/dizhi/hai.png',
    color: '#73C7FF', // 水行色
    category: '水',
    traits: ['厚道', '包容', '诚实', '富足']
  }
];

// 创建一个键值对形式的访问对象
export const wuxingMap: Record<string, WuxingElement> = {};
wuxingElements.forEach(element => {
  wuxingMap[element.name] = element;
});

// 创建一个以首字为key的键值对访问对象
export const wuxingFirstCharMap: Record<string, WuxingElement> = {};
wuxingElements.forEach(element => {
  const firstChar = element.name.charAt(0);
  wuxingFirstCharMap[firstChar] = element;
});

export interface TiaohouElement {
  key: string;         // “五行+月份”（比如 "甲寅", "甲卯", "乙辰" …）
  value: string;  // 调候用神的内容
}

// 调候用神
export const TiaohouElements: TiaohouElement[] = [
  { key: '甲寅', value: '丙,癸' },
  { key: '甲卯', value: '庚,丙,丁,戊,己' },
  { key: '甲辰', value: '庚,丁,壬' },
  { key: '甲巳', value: '癸,庚,丁' },
  { key: '甲午', value: '癸,庚,丁' },
  { key: '甲未', value: '癸,庚,丁' },
  { key: '甲申', value: '庚,丁,壬' },
  { key: '甲酉', value: '庚,丁,丙' },
  { key: '甲戌', value: '庚,甲,丁,壬,癸' },
  { key: '甲亥', value: '庚,丁,丙,戊' },
  { key: '甲子', value: '丁,庚,丙' },
  { key: '甲丑', value: '丁,庚,丙' },

  { key: '乙寅', value: '丙,癸' },
  { key: '乙卯', value: '丙,癸' },
  { key: '乙辰', value: '癸,丙,戊' },
  { key: '乙巳', value: '癸' },
  { key: '乙午', value: '癸,丙' },
  { key: '乙未', value: '癸,丙' },
  { key: '乙申', value: '丙,癸,己' },
  { key: '乙酉', value: '癸,丙,丁' },
  { key: '乙戌', value: '癸,辛' },
  { key: '乙亥', value: '丙,戊' },
  { key: '乙子', value: '丙' },
  { key: '乙丑', value: '丙' },

  { key: '丙寅', value: '壬、庚' },
  { key: '丙卯', value: '壬,己' },
  { key: '丙辰', value: '壬,甲' },
  { key: '丙巳', value: '壬,癸,庚' },
  { key: '丙午', value: '壬,庚' },
  { key: '丙未', value: '壬,庚' },
  { key: '丙申', value: '壬,戊' },
  { key: '丙酉', value: '壬,癸' },
  { key: '丙戌', value: '甲,壬' },
  { key: '丙亥', value: '甲,戊,庚,壬' },
  { key: '丙子', value: '壬,戊,己' },
  { key: '丙丑', value: '壬,甲' },

  { key: '丁寅', value: '庚,甲' },
  { key: '丁卯', value: '庚,甲' },
  { key: '丁辰', value: '甲,庚' },
  { key: '丁巳', value: '甲,庚' },
  { key: '丁午', value: '壬,癸,庚' },
  { key: '丁未', value: '甲,壬,庚' },
  { key: '丁申', value: '甲,丙,庚,戊' },
  { key: '丁酉', value: '甲,丙,庚,戊' },
  { key: '丁戌', value: '甲,戊,庚' },
  { key: '丁亥', value: '甲,庚' },
  { key: '丁子', value: '甲,庚' },
  { key: '丁丑', value: '甲,庚' },

  { key: '戊寅', value: '丙,甲,癸' },
  { key: '戊卯', value: '丙,甲,癸' },
  { key: '戊辰', value: '甲,丙,癸' },
  { key: '戊巳', value: '甲,丙,癸' },
  { key: '戊午', value: '壬,甲,丙' },
  { key: '戊未', value: '癸,丙,甲' },
  { key: '戊申', value: '丙,癸,甲' },
  { key: '戊酉', value: '丙,癸' },
  { key: '戊戌', value: '甲,丙,癸' },
  { key: '戊亥', value: '甲,丙' },
  { key: '戊子', value: '丙,甲' },
  { key: '戊丑', value: '丙,甲' },

  { key: '己寅', value: '丙,庚,甲' },
  { key: '己卯', value: '甲,丙,癸' },
  { key: '己辰', value: '丙,癸,甲' },
  { key: '己巳', value: '癸,丙' },
  { key: '己午', value: '癸,丙' },
  { key: '己未', value: '癸,丙' },
  { key: '己申', value: '丙,癸' },
  { key: '己酉', value: '丙,癸' },
  { key: '己戌', value: '甲,丙,癸' },
  { key: '己亥', value: '丙,甲,戊' },
  { key: '己子', value: '丙,甲,戊' },
  { key: '己丑', value: '丙,甲,戊' },

  { key: '庚寅', value: '戊,甲,壬,丙,丁' },
  { key: '庚卯', value: '丁,甲,庚,丙' },
  { key: '庚辰', value: '甲,丁,壬,癸' },
  { key: '庚巳', value: '壬,戊,丙,丁' },
  { key: '庚午', value: '壬,癸' },
  { key: '庚未', value: '丁,甲' },
  { key: '庚申', value: '丁,甲' },
  { key: '庚酉', value: '丁,甲,丙' },
  { key: '庚戌', value: '甲,壬' },
  { key: '庚亥', value: '丁,丙' },
  { key: '庚子', value: '丁,甲,丙' },
  { key: '庚丑', value: '丁,甲,丙' },

  { key: '辛寅', value: '己,壬,庚' },
  { key: '辛卯', value: '壬,甲' },
  { key: '辛辰', value: '壬,甲' },
  { key: '辛巳', value: '壬,甲,癸' },
  { key: '辛午', value: '壬,己,癸' },
  { key: '辛未', value: '壬,庚,甲' },
  { key: '辛申', value: '壬,甲,戊' },
  { key: '辛酉', value: '壬,甲' },
  { key: '辛戌', value: '壬,甲' },
  { key: '辛亥', value: '壬,丙' },
  { key: '辛子', value: '丙,戊,壬,甲' },
  { key: '辛丑', value: '丙,壬,戊,己' },

  { key: '壬寅', value: '庚,丙,戊' },
  { key: '壬卯', value: '庚,辛,戊' },
  { key: '壬辰', value: '甲,庚' },
  { key: '壬巳', value: '壬,辛庚,癸' },
  { key: '壬午', value: '癸,庚,辛' },
  { key: '壬未', value: '辛,甲' },
  { key: '壬申', value: '戊,丁' },
  { key: '壬酉', value: '甲,庚' },
  { key: '壬戌', value: '甲,丙' },
  { key: '壬亥', value: '戊,丙,庚' },
  { key: '壬子', value: '戊,丙' },
  { key: '壬丑', value: '丙,甲,丁' },

  { key: '癸寅', value: '辛,丙' },
  { key: '癸卯', value: '庚,辛' },
  { key: '癸辰', value: '丙,辛,甲' },
  { key: '癸巳', value: '辛' },
  { key: '癸午', value: '庚,辛,壬,癸' },
  { key: '癸未', value: '庚,辛,壬,癸' },
  { key: '癸申', value: '丁' },
  { key: '癸酉', value: '辛,丙' },
  { key: '癸戌', value: '辛,甲,壬,癸' },
  { key: '癸亥', value: '庚,辛,戊,丁' },
  { key: '癸子', value: '丙,辛' },
  { key: '癸丑', value: '丙,丁' },
]

// 创建一个键值对形式的访问对象
export const tiaohouMap: Record<string, TiaohouElement> = {};
TiaohouElements.forEach(element => {
  tiaohouMap[element.key] = element;
});

// 八卦配置
export interface BaguaElement {
  name: string;         // 卦名
  description: string;  // 卦象描述
  imageUrl: string;     // 图片链接
  color: string;        // 主色调
  wuxingRelation: string; // 对应五行
  symbol: string;       // 卦象符号
  traits?: string[];    // 特质列表（可选）
}

// 八卦基本元素配置
export const baguaElements: BaguaElement[] = [
  {
    name: '乾',
    description: '乾为天，象征天，代表父亲，性质刚健、纯阳',
    imageUrl: '/assets/images/bagua/qian.png',
    color: '#C0C0C0', // 银色
    wuxingRelation: '金',
    symbol: '☰',
    traits: ['创造', '领导', '力量', '权威']
  },
  {
    name: '坤',
    description: '坤为地，象征地，代表母亲，性质柔顺、纯阴',
    imageUrl: '/assets/images/bagua/kun.png',
    color: '#8B4513', // 棕色
    wuxingRelation: '土',
    symbol: '☷',
    traits: ['包容', '顺从', '滋养', '和谐']
  },
  {
    name: '震',
    description: '震为雷，象征雷，代表长男，性质动荡',
    imageUrl: '/assets/images/bagua/zhen.png',
    color: '#228B22', // 绿色
    wuxingRelation: '木',
    symbol: '☳',
    traits: ['行动', '震动', '新生', '惊醒']
  },
  {
    name: '巽',
    description: '巽为风，象征风，代表长女，性质顺从',
    imageUrl: '/assets/images/bagua/xun.png',
    color: '#006400', // 深绿色
    wuxingRelation: '木',
    symbol: '☴',
    traits: ['柔顺', '渗透', '谦逊', '顺应']
  },
  {
    name: '坎',
    description: '坎为水，象征水，代表中男，性质险陷',
    imageUrl: '/assets/images/bagua/kan.png',
    color: '#000080', // 深蓝色
    wuxingRelation: '水',
    symbol: '☵',
    traits: ['危险', '深邃', '智慧', '流动']
  },
  {
    name: '离',
    description: '离为火，象征火，代表中女，性质光明',
    imageUrl: '/assets/images/bagua/li.png',
    color: '#FF0000', // 红色
    wuxingRelation: '火',
    symbol: '☲',
    traits: ['光明', '美丽', '文明', '附着']
  },
  {
    name: '艮',
    description: '艮为山，象征山，代表少男，性质止静',
    imageUrl: '/assets/images/bagua/gen.png',
    color: '#A0522D', // 赭石色
    wuxingRelation: '土',
    symbol: '☶',
    traits: ['稳定', '停止', '冥想', '限制']
  },
  {
    name: '兑',
    description: '兑为泽，象征泽，代表少女，性质愉悦',
    imageUrl: '/assets/images/bagua/dui.png',
    color: '#FFD700', // 金色
    wuxingRelation: '金',
    symbol: '☱',
    traits: ['喜悦', '满足', '交流', '愉快']
  }
];

// 创建八卦映射表
export const baguaMap: Record<string, BaguaElement> = {};
baguaElements.forEach(element => {
  baguaMap[element.name] = element;
});

// 五行相生相克关系
export const wuxingRelations = {
  // 相生关系（A生B）
  generating: {
    '木': '火', // 木生火
    '火': '土', // 火生土
    '土': '金', // 土生金
    '金': '水', // 金生水
    '水': '木'  // 水生木
  },
  
  // 相克关系（A克B）
  overcoming: {
    '木': '土', // 木克土
    '土': '水', // 土克水
    '水': '火', // 水克火
    '火': '金', // 火克金
    '金': '木'  // 金克木
  }
};