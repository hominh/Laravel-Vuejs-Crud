<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>
                    <div class="panel-body">
                        <form v-on:submit.prevent="createCustomer" method="POST">
                            <div v-bind:class="{ 'form-group': true,'has-error': errors.name }">
                                <label>Name</label>
                                <input type="text" v-model="customer.name" class="form-control" />
                                <span class="help-block" v-for="error in errors.name" v-text="error">
                                </span>
                            </div>
                            <div v-bind:class="{ 'form-group' : true, 'has-error': errors.email }">
                                <label>Email</label>
                                <input type="email" v-model="customer.email" class="form-control" />
                                <span class="help-block" v-for="error in errors.email" v-text="error">
                                </span>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="Create new customer" />
                            </div>
                        </form>
                        <table class="table table-bordered table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="customer in customers">
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.email }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">

</script>
<script>

    import customer from './Customer.vue';
    export default {
        http: {
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken
            },
        },
        data() {
            return {
                customers:[],
                errors:[],
                csrf: "",
                //token   : csrf_token,
                customer:{
                    name: '',
                    email: '',
                    //_token: 'MeZokygKLNuXKQ370BuMrCRW3TxcqKZots9O0yVf'
                    //csrf: "jsD8tOWOMvmO7yupIfvTbSe49aaBJ6d70Cd6MS3i"
                }
            }
        },
        mounted() {
            //this.csrf = window.Laravel.csrfToken;
            //console.log(window.Laravel.csrfToken);
        },
        created() {
            this.fetchCustomer();
        },
        methods: {
            fetchCustomer() {
                this.$http.get("customer").then( response => { this.customers = response.data.customers });
            },
            createCustomer() {
                this.$http.post("/customer/",this.customer).then(response => {
                    this.customers.push(response.data.customer); //push customer object to array customers
                    this.customer = {name: '',email: ''};
                    console.log(response.data);
                },response => {
                    console.log(response.data.errors);
                    this.errors = response.data.errors;

                });
            }
        }
    }
</script>
