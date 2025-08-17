/**
 * @1900-2100区间内的公历、农历互转
 * @charset UTF-8
 * @公历转农历：Nongli.solar2lunar(1987,11,01); [you can ignore params of prefix 0]
 */
export const Nongli = {

    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex
     */
    lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
      0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
      0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
      0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
      0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
      0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
      0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
      0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
      0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
      0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
      0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
      0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
      0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
      0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
      0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
      /**Add By JJonline@JJonline.Cn**/
      0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
      0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
      0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
      0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
      0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
      0x0d520],//2100
  
    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number
     */
    solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
  
    /**
     * 数字转中文速查表
     * @Array Of Property
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string
     */
    nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],
  
    /**
     * 日期转农历称呼速查表
     * @Array Of Property
     * @trans ['初','十','廿','卅']
     * @return Cn string
     */
    nStr2:["\u521d","\u5341","\u5eff","\u5345"],
  
    /**
     * 月份转农历称呼速查表
     * @Array Of Property
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string
     */
    nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],
  
    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param lunar Year
     * @return Number (0-12)
     * @eg:var leapMonth = Nongli.leapMonth(1987) ;//leapMonth=6
     */
    leapMonth:function(y) { //闰字编码 \u95f0
      return(this.lunarInfo[y-1900] & 0xf);
    },
  
    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param lunar Year
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = Nongli.leapDays(1987) ;//leapMonthDay=29
     */
    leapDays:function(y) {
      if(this.leapMonth(y))  {
        return((this.lunarInfo[y-1900] & 0x10000)? 30: 29);
      }
      return(0);
    },
  
    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param lunar Year
     * @return Number (-1、29、30)
     * @eg:var MonthDay = Nongli.monthDays(1987,9) ;//MonthDay=29
     */
    monthDays:function(y,m) {
      if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
      return( (this.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
    },
  
    /**
     * 返回公历(!)y年m月的天数
     * @param solar Year
     * @return Number (-1、28、29、30、31)
     * @eg:var solarMonthDay = Nongli.leapDays(1987) ;//solarMonthDay=30
     */
    solarDays:function(y,m) {
      if(m>12 || m<1) {return -1} //若参数错误 返回-1
      var ms = m-1;
      if(ms==1) { //2月份的闰平规律测算后确认返回28或29
        return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
      }else {
        return(this.solarMonth[ms]);
      }
    },
  
    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @param lunar month
     * @return Cn string
     * @eg:var cnMonth = Nongli.toChinaMonth(12) ;//cnMonth='腊月'
     */
    toChinaMonth:function(m) { // 月 => \u6708
      if(m>12 || m<1) {return -1} //若参数错误 返回-1
      var s = this.nStr3[m-1];
      s+= "\u6708";//加上月字
      return s;
    },
    
    /**
     * 传入农历日期数字返回汉字表示法
     * @param lunar day
     * @return Cn string
     * @eg:var cnDay = Nongli.toChinaDay(21) ;//cnMonth='廿一'
     */
    toChinaDay:function(d){ //日 => \u65e5
      var s;
      switch (d) {
        case 10:
          s = '\u521d\u5341';
          break;
        case 20:
          s = '\u4e8c\u5341';
          break;
        case 30:
          s = '\u4e09\u5341';
          break;
        default :
          s = this.nStr2[Math.floor(d/10)];
          s += this.nStr1[d%10];
      }
      return(s);
    },
}

// 格式化日期字符串 支持：1993-05-15 16:15:32 、 05/15/1993 16:15:32 、 05/15/1993
function formatDateStr(dateStr) {
  const DATE_REGX = /^(\d+).(\d+).(\d+).?(\d+)?:?(\d+)?:?(\d+)?:?(\d+)?$/;
  const reg = dateStr.trim().match(DATE_REGX);
  if (!reg) {
    return null;
  }
  let date = { $H: reg[4], $m: reg[5], $s: reg[6], $ms: reg[7] };
  if (reg[1].length == 4) {
    date = Object.assign({}, { $y: reg[1], $M: reg[2], $D: reg[3] }, date);
  } else {
    date = Object.assign({}, { $y: reg[3], $M: reg[1], $D: reg[2] }, date);
  }
  return date;
}
// 农历日期模拟Date对象
function dateObj(dateStr) {
  const date = formatDateStr(dateStr);
  return {
    getFullYear: () => date.$y,
    getMonth: () => parseInt(date.$M) - 1,
    getDate: () => date.$D,
    getDay: () => date.$W,
    getHours: () => date.$H,
    getMinutes: () => date.$m,
    getSeconds: () => date.$s,
    getMilliseconds: () => date.$ms,
    getTimezoneOffset() {
      return new Date().getTimezoneOffset();
    },
  };
}

// 日期处理
const padStart = (string, length, pad) => {
  const s = String(string);
  if (!s || s.length >= length) return string;
  return `${Array(length + 1 - s.length).join(pad)}${string}`;
};

const padZoneStr = (instance) => {
  const negMinutes = -instance.utcOffset();
  const minutes = Math.abs(negMinutes);
  const hourOffset = Math.floor(minutes / 60);
  const minuteOffset = minutes % 60;
  return `${negMinutes <= 0 ? "+" : "-"}${padStart(
    hourOffset,
    2,
    "0"
  )}:${padStart(minuteOffset, 2, "0")}`;
};

const isQDate = (d) => d instanceof QDate;

const parseDate = function (cfg) {
  const tags = typeof cfg;
  let lifa = "公",
    date = cfg,
    leap = false;
  if (cfg && tags == "string") {
    const ds = cfg.match(/^([公农历]+\s+)?(.+?)(\(.+\))?$/);
    if (ds) {
      lifa = ds[1] ? ds[1].substring(0, 1) : "公";
      date = ds[2].trim().replace(/\-/g, "/");
      leap = ds[3] ? true : false;
    }
  } else if (tags == "object" && cfg.date) {
    if (["公", "农"].includes(cfg.lifa)) lifa = cfg.lifa;
    if (typeof cfg.leap == "boolean") leap = cfg.leap;
    date = cfg.date;
  }
  if (lifa == "农") {
    date = dateObj(date);
  } else if (Array.isArray(date)) {
    // 支持Array传参
    const ndate = structuredClone(date);
    if (ndate[1] < 0) {
      leap = true;
      ndate[1] = Math.abs(ndate[1]);
    }
    ndate[1] -= 1;
    date = new Date(...ndate);
  } else {
    date = new Date(Date.parse(date));
  }

  return {
    lifa,
    date,
    leap,
  };
};

class QDate {
  constructor(cfg, format) {
    this.$format = format || "YYYY-MM-DDTHH:mm:ssZ";
    this.parse(cfg);
    this.init();
  }
  init() {
    const { $d } = this;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
    // 从1开始的月份
    this.$Mo = this.$M + 1;
  }
  parse(cfg) {
    const { lifa, date, leap } = parseDate(cfg);
    this.$d = date;
    this.$lifa = lifa;
    this.$leap = leap;
  }
  set(key, value) {
    this[key] = value;
  }
  clone() {
    return structuredClone(this);
  }
  format(formatStr) {
    const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
    const str = formatStr || this.$format;
    const zoneStr = padZoneStr(this);
    const { $H, $m, $M } = this;

    const get$H = (num) => padStart($H % 12 || 12, num, "0");

    const meridiemFunc = (hour, minute, isLowercase) => {
      const m = hour < 12 ? "AM" : "PM";
      return isLowercase ? m.toLowerCase() : m;
    };
    const matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: padStart($M + 1, 2, "0"),
      D: this.$D,
      DD: padStart(this.$D, 2, "0"),
      d: String(this.$W),
      H: String($H),
      HH: padStart($H, 2, "0"),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: padStart($m, 2, "0"),
      s: String(this.$s),
      ss: padStart(this.$s, 2, "0"),
      SSS: padStart(this.$ms, 3, "0"),
      Z: zoneStr, // 'ZZ' logic below
    };

    return str.replace(
      REGEX_FORMAT,
      (match, $1) => $1 || matches[match] || zoneStr.replace(":", "")
    ); // 'ZZ'
  }

  utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }
  // 获取当前月份天数
  monthDays() {
    //let days = new Date(this.$y, this.$M + 1, 0).getDate()
    let days = Nongli.solarDays(this.$y, this.$Mo);
    if (this.$lifa == "农") {
      days = this.$leap
        ? Nongli.leapDays(this.$y)
        : Nongli.monthDays(this.$y, this.$Mo);
    }
    return days;
  }
  isValid() {
    return this.$d.toString() !== "Invalid Date";
  }
  // 转数组[Y,M,D,H,m]，无历法
  toArray() {
    return [this.$y, this.$Mo, this.$D, this.$H, this.$m];
  }
  // 转字符串 带历法
  toString() {
    return [
      this.$lifa + "历",
      this.format(),
      this.$leap && this.$lifa=='农' ? "(闰" + this.$Mo + "月)" : "",
    ]
      .filter((vo) => vo)
      .join(" ");
  }
}

export default (date, format) => (isQDate(QDate) ? date.clone() : new QDate(date, format));