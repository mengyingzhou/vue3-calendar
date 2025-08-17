// column props
export const columnProps = {
  // 选项列表
  options: Array,
  // Label变量名
  optionLabel: {
    type: String,
    default: "label",
  },
  // Value变量名
  optionValue: {
    type: String,
    default: "value",
  },
  emitValue: Boolean,
  // 对齐方式
  align: {
    type: String,
    default: "center",
  },
  // 行高
  itemHeight: {
    type: Number,
    default: 44,
  },
  // 行数(奇数)
  rowNumber: {
    type: Number,
    default: 5,
    validator(value) {
      return value % 2 === 1;
    },
  },
};

// column Hook
export function usePickerColumn(props) {
  // 获取字符串值
  function getItemStrValue(item) {
    const { optionValue } = props;
    return ["object", "array"].includes(typeof item) ? item[optionValue] : item;
  }
  // 读取options item 的值
  function getItemValue(item) {
    return props.emitValue ? getItemStrValue(item) : item;
  }

  function getItemIndex(value, optList) {
    optList = optList || props.options;
    
    return optList.findIndex((item) => {
      return getItemStrValue(item) === getItemStrValue(value);
    });
  }

  return { getItemValue, getItemIndex };
}