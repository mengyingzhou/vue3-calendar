import PickerView from './PickerView.vue';

PickerView.install = (app) => {
  app.component(PickerView.name, PickerView);
};

export default PickerView;