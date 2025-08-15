/**
 * 星座配置文件
 * 记录每个星座的名称、日期范围、性格描述、图片链接和固定颜色搭配
 */

export interface Constellation {
  name: string;         // 星座名称
  englishName: string;  // 英文名称
  dateRange: string;    // 日期范围
  description: string;  // 性格描述
  imageUrl: string;     // 图片链接
  color: string;        // 主色调（十六进制颜色代码）
  element: string;      // 所属元素（风、火、土、水）
  traits?: string[];    // 特质列表（可选）
  luckyNumber?: number; // 幸运数字（可选）
  luckyColor?: string;  // 幸运颜色（可选）
}

// 十二星座配置
export const constellations: Constellation[] = [
  {
    name: '白羊座',
    englishName: 'Aries',
    dateRange: '3月21日 - 4月19日',
    description: '热情活力 勇敢直率 独立自主',
    imageUrl: '/assets/images/constellation/aries.png',
    color: '#FF5733',
    element: '火象',
    traits: ['热情', '勇敢', '冲动', '领导力'],
    luckyNumber: 9,
    luckyColor: '红色'
  },
  {
    name: '金牛座',
    englishName: 'Taurus',
    dateRange: '4月20日 - 5月20日',
    description: '稳重踏实 享受生活 固执坚定',
    imageUrl: '/assets/images/constellation/taurus.png',
    color: '#77DD77',
    element: '土象',
    traits: ['耐心', '可靠', '固执', '感性'],
    luckyNumber: 6,
    luckyColor: '绿色'
  },
  {
    name: '双子座',
    englishName: 'Gemini',
    dateRange: '5月21日 - 6月21日',
    description: '聪明机智 善变多面 好奇心强',
    imageUrl: '/assets/images/constellation/gemini.png',
    color: '#FFD700',
    element: '风象',
    traits: ['适应性强', '聪明', '善变', '交际能力强'],
    luckyNumber: 5,
    luckyColor: '黄色'
  },
  {
    name: '巨蟹座',
    englishName: 'Cancer',
    dateRange: '6月22日 - 7月22日',
    description: '情感丰富 重视家庭 敏感细腻',
    imageUrl: '/assets/images/constellation/cancer.png',
    color: '#87CEFA',
    element: '水象',
    traits: ['情感丰富', '保护欲强', '直觉敏锐', '记忆力强'],
    luckyNumber: 2,
    luckyColor: '银色'
  },
  {
    name: '狮子座',
    englishName: 'Leo',
    dateRange: '7月23日 - 8月22日',
    description: '自信阳光 慷慨大方 天生领袖',
    imageUrl: '/assets/images/constellation/leo.png',
    color: '#FFA500',
    element: '火象',
    traits: ['自信', '慷慨', '忠诚', '戏剧性'],
    luckyNumber: 1,
    luckyColor: '金色'
  },
  {
    name: '处女座',
    englishName: 'Virgo',
    dateRange: '8月23日 - 9月22日',
    description: '细致完美 理性分析 实际可靠',
    imageUrl: '/assets/images/constellation/virgo.png',
    color: '#A0522D',
    element: '土象',
    traits: ['分析能力强', '完美主义', '谨慎', '实际'],
    luckyNumber: 5,
    luckyColor: '棕色'
  },
  {
    name: '天秤座',
    englishName: 'Libra',
    dateRange: '9月23日 - 10月23日',
    description: '优雅和谐 公平正义 善于交际',
    imageUrl: '/assets/images/constellation/libra.png',
    color: '#FF69B4',
    element: '风象',
    traits: ['外交能力强', '和平主义', '优雅', '犹豫不决'],
    luckyNumber: 6,
    luckyColor: '粉色'
  },
  {
    name: '天蝎座',
    englishName: 'Scorpio',
    dateRange: '10月24日 - 11月22日',
    description: '神秘强大 洞察力强 情感深刻',
    imageUrl: '/assets/images/constellation/scorpio.png',
    color: '#800080',
    element: '水象',
    traits: ['热情', '坚定', '神秘', '敏锐'],
    luckyNumber: 8,
    luckyColor: '深红色'
  },
  {
    name: '射手座',
    englishName: 'Sagittarius',
    dateRange: '11月23日 - 12月21日',
    description: '乐观开朗 追求自由 热爱冒险',
    imageUrl: '/assets/images/constellation/sagittarius.png',
    color: '#4169E1',
    element: '火象',
    traits: ['乐观', '诚实', '冒险', '哲学思想'],
    luckyNumber: 3,
    luckyColor: '蓝色'
  },
  {
    name: '摩羯座',
    englishName: 'Capricorn',
    dateRange: '12月22日 - 1月19日',
    description: '踏实勤奋 责任感强 目标明确',
    imageUrl: '/assets/images/constellation/capricorn.png',
    color: '#2F4F4F',
    element: '土象',
    traits: ['野心', '自律', '实际', '谨慎'],
    luckyNumber: 8,
    luckyColor: '深绿色'
  },
  {
    name: '水瓶座',
    englishName: 'Aquarius',
    dateRange: '1月20日 - 2月18日',
    description: '独立创新 人道主义 思想前卫',
    imageUrl: '/assets/images/constellation/aquarius.png',
    color: '#00BFFF',
    element: '风象',
    traits: ['独立', '创新', '人道主义', '叛逆'],
    luckyNumber: 4,
    luckyColor: '电光蓝'
  },
  {
    name: '双鱼座',
    englishName: 'Pisces',
    dateRange: '2月19日 - 3月20日',
    description: '浪漫梦幻 富有同情心 艺术气质',
    imageUrl: '/assets/images/constellation/pisces.png',
    color: '#9370DB',
    element: '水象',
    traits: ['直觉', '富有同情心', '艺术气质', '梦幻'],
    luckyNumber: 7,
    luckyColor: '紫色'
  }
];

// 创建一个键值对形式的访问对象
export const constellationMap: Record<string, Constellation> = {};
constellations.forEach(constellation => {
  constellationMap[constellation.name] = constellation;
});

// 按元素分类的星座
export const constellationsByElement = {
  '火象': constellations.filter(c => c.element === '火象'),
  '土象': constellations.filter(c => c.element === '土象'),
  '风象': constellations.filter(c => c.element === '风象'),
  '水象': constellations.filter(c => c.element === '水象')
};

// 星座相位关系
export const constellationAspects = {
  // 三合相位 (120°) - 同元素星座
  trine: {
    '火象': ['白羊座', '狮子座', '射手座'],
    '土象': ['金牛座', '处女座', '摩羯座'],
    '风象': ['双子座', '天秤座', '水瓶座'],
    '水象': ['巨蟹座', '天蝎座', '双鱼座']
  },
  
  // 六合相位 (60°) - 互补元素星座
  sextile: {
    '火象': ['风象'], // 火与风相合
    '土象': ['水象'], // 土与水相合
    '风象': ['火象'], // 风与火相合
    '水象': ['土象']  // 水与土相合
  },
  
  // 对冲相位 (180°) - 对立星座
  opposition: {
    '白羊座': '天秤座',
    '金牛座': '天蝎座',
    '双子座': '射手座',
    '巨蟹座': '摩羯座',
    '狮子座': '水瓶座',
    '处女座': '双鱼座',
    '天秤座': '白羊座',
    '天蝎座': '金牛座',
    '射手座': '双子座',
    '摩羯座': '巨蟹座',
    '水瓶座': '狮子座',
    '双鱼座': '处女座'
  }
};

// 根据日期获取星座
export function getConstellationByDate(month: number, day: number): Constellation | null {
  // 月份从1开始计数
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return constellationMap['白羊座'];
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return constellationMap['金牛座'];
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return constellationMap['双子座'];
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return constellationMap['巨蟹座'];
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return constellationMap['狮子座'];
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return constellationMap['处女座'];
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return constellationMap['天秤座'];
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    return constellationMap['天蝎座'];
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    return constellationMap['射手座'];
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return constellationMap['摩羯座'];
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return constellationMap['水瓶座'];
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return constellationMap['双鱼座'];
  }
  
  return null;
}