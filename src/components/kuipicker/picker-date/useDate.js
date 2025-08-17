import {Nongli} from './QDate.js'
export function useDateRows(props) {
  // 年列表
  function buildYears(start, end) {
    start = start || 1900;
    end = end || 2100;
    return new Array(end - start + 1).fill(0).map((_, index) => {
      const year = start + index;
      return {
        label: year + "年",
        value: year,
      };
    });
  }
  // 月份列表
  function buildMonths() {
    const { lifa } = props;
    const yue = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    const yueArr = new Array(12).fill(0).map((_, index) => {
      const month = index + 1;
      const label = (lifa=='公' ? String(month).padStart(2, "0") : yue[index]) + "月";
      return {
        label,
        value: month,
      };
    });
    if(lifa === '农'){
      const leap = Nongli.leapMonth()
    }

    return yueArr
  }
  // 日列表
  function buildDays(year, month) {
    const days = new Date(year, month, 0).getDate();
    return new Array(days).fill(0).map((_, index) => {
      const day = index + 1;
      return {
        label: String(day).padStart(2, "0") + "日",
        value: day,
      };
    });
  }
  // 小时列表
  function buildHours() {
    return new Array(24).fill(0).map((_, hour) => {
      return {
        label: String(hour).padStart(2, "0") + "时",
        value: hour,
      };
    });
  }
  // 分钟列表
  function buildMinutes() {
    return new Array(60).fill(0).map((_, minute) => {
      return {
        label: String(minute).padStart(2, "0") + "分",
        value: minute,
      };
    });
  }

  return {
    buildYears,
    buildMonths,
    buildDays,
    buildHours,
    buildMinutes,
  };
}