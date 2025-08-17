// packages/index.d.ts
import type { App, Plugin, DefineComponent } from 'vue';

/** 默认导出：Vue 插件（app.use(...)） */
declare const KuiPicker: Plugin;
export default KuiPicker;

/** 具名导出：各组件（最小声明即可满足大多数 TS 使用场景） */
export const PickerColumn: DefineComponent<{}, {}, any>;
export const PickerView:   DefineComponent<{}, {}, any>;
export const PickerDate:   DefineComponent<{}, {}, any>;
export const Dialog:       DefineComponent<{}, {}, any>;
export const Button:       DefineComponent<{}, {}, any>;

/** 如果你通过 ref 获取 PickerDate 实例并调用 show()/hide()，可用这个类型辅助 */
export type PickerDateInstance = {
  show: () => void;
  hide: () => void;
};

/**（可选）为 UMD 使用者提供全局命名空间声明 */
// export as namespace KuiPicker;