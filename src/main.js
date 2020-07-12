import Vue from 'vue';
import App from './App.vue';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import 'vue-range-component/dist/vue-range-slider.min.css';
import './assets/css/main.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
