import PickerDate from './PickerDate.vue';

PickerDate.install = (app) => {
  app.component(PickerDate.name, PickerDate);
};

export default PickerDate;