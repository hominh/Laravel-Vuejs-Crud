
require('./bootstrap');
import Vue from 'vue';
import VueResource from 'vue-resource';
import Example from './components/Example';
import Customer from './components/Customer';
window.Vue = require('vue');
Vue.use(VueResource)
//Vue.component('example', require('./components/Example.vue'));

/*var vm = new Vue({
    el: '#app',
    render: h => h(Customer)
})*/
const app = new Vue({
    el: '#app',
    components: {Customer},
    render: h => h(Customer)
});
