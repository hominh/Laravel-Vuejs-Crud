require('./bootstrap');
import Vue from 'vue';
import Customer from './components/Customer';
window.Vue = require('vue');

//Vue.component('example', require('./components/Example.vue'));
var vm = new Vue({
    el: '#app',
    render: h => h(Customer)
})
