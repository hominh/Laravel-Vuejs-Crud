

window.$ = window.jQuery = require('jquery');
window.Laravel = { csrfToken: $('meta[name=csrf-token]').attr("content") };

require('./bootstrap');
import Vue from 'vue';
import VueResource from 'vue-resource';
import Example from './components/Example';
import Customers from './components/Customers';
window.Vue = require('vue');
Vue.use(VueResource)
//Vue.component('example', require('./components/Example.vue'));

/*var vm = new Vue({
    el: '#app',
    render: h => h(Customer)
})*/
const app = new Vue({
    el: '#app',
    //omponents: {Customers},
    render: h => h(Customers)
});
