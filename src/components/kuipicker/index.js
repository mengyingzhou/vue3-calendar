import PickerColumn from "./picker-column";
import PickerView from "./picker-view";
import PickerDate from "./picker-date";
import Dialog from "./dialog";
import Button from "./button";

// 组件列表
const components = { PickerColumn, PickerView, PickerDate, Dialog, Button };
// 组件前缀
const affix = "Kui";

const install = (app) => {
  Object.keys(components).forEach((key) => {
    const name = affix + key;
    const component = components[key];
    app.component(name, component);
  });
};

export default {
  install,
  ...components,
};