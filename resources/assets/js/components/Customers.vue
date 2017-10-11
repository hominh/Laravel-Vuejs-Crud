<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>
                    <div class="panel-body">
                        <form  v-on:submit.prevent method="POST">
                            <div v-bind:class="{ 'form-group': true,'has-error': errors.name }">
                                <label>Name</label>
                                <input type="text" v-model="inputcustomer.name" class="form-control" />
                                <span class="help-block" v-for="error in errors.name" v-text="error">
                                </span>
                            </div>
                            <div v-bind:class="{ 'form-group' : true, 'has-error': errors.email }">
                                <label>Email</label>
                                <input type="email" v-model="inputcustomer.email" class="form-control" />
                                <span class="help-block" v-for="error in errors.email" v-text="error">
                                </span>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" v-on:click="createCustomer" value="Create new customer" />
                            </div>
                        </form>
                        <table class="table table-bordered table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="customer in customers">
                                    <td>{{ customer.id }}</td>
                                    <td>
                                        {{ customer.name }}
                                    </td>
                                    <td>
                                        {{ customer.email }}
                                    </td>
                                    <td>
                                        <button type="button" v-on:click="deleteCustomer(customer)" class="btn btn-danger btn-xs">Delete</button>
                                        <button type="button" v-on:click="editCustomer(customer)" v-if="!edit" class="btn btn-warning btn-xs">Edit</button>
                                        <button type="button" v-on:click="cancelEdit" v-if="edit" class="btn btn-warning btn-xs">Cancel</button>
                                        <button type="button" v-on:click="updateCustomer(customer,inputcustomer)"  class="btn btn-warning btn-xs">Update</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        http: {
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken
            },
        },
        data() {
            return {
                edit: false,
                editForm: {
                    name: '',
                    email: ''
                },
                customers:[],
                errors:[],
                csrf: "",
                inputcustomer:{
                    name: '',
                    email: '',
                }
            }
        },
        mounted() {
        },
        created() {
            this.fetchCustomer();
        },
        methods: {
            fetchCustomer() {
                this.$http.get("customer").then( response => { this.customers = response.data.customers });
            },
            createCustomer() {
                this.$http.post("/customer/",this.inputcustomer).then(response => {
                    this.customers.push(response.data.customer); //push customer object to array customers
                    this.customer = {name: '',email: ''};
                    if(this.errors) {
                        this.errors = [];
                    }
                    console.log(response.data);
                },response => {
                    console.log(response.data.errors);
                    this.errors = response.data.errors;
                });
            },
            deleteCustomer(customer) {
                this.$http.delete("/customer/"+customer.id).then( response =>{
                    let index = this.customers.indexOf(customer);
                    console.log(index);
                    this.customers.splice(index,1); //remove 1 element start from index
                });

            },
            editCustomer(customer) {
                this.edit = true;
                console.log(customer.id);
                this.inputcustomer.name = customer.name;
                this.inputcustomer.email = customer.email;
            },
            cancelEdit() {
                this.edit = false;
                this.inputcustomer.name = '';
                this.inputcustomer.email = '';
            },
            updateCustomer(customer,newCustomer) {
                //console.log(customer.id);
                this.$http.patch("/customer/"+customer.id,newCustomer).then( response =>{
                    console.log(response.data);
                    this.fetchCustomer();
                    this.cancelEdit();
                });
                //alert('update');
            }
        }
    }
</script>
