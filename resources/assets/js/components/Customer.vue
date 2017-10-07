<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>

                    <div class="panel-body">
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

<script>
    export default {
        data() {
            return {
                customers:[],
            }
        },
        created() {
            this.fetchCustomer();
        },
        methods: {
            fetchCustomer() {
                this.$http.get("customer").then( response => { this.customers = response.data.customers });
            },
        }
    }
</script>
