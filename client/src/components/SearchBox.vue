<template>
<form>
    <div class="row m-0">
        <div class="col-md-6 m-0 p-0">
            <div class="row m-0 p-0">
                <div class="col-10 flex-column d-flex align-items-end justify-content-center m-0 p-0">
                    <input type="text" class="form-control" placeholder="Buscar..." v-model="item_searched">
                    <div class="container-x">
                        <button id="search-x" type="button" v-on:click="cancel">
                            <i class="fa fa-xmark"></i>
                        </button>
                    </div>
                </div>
                <div class="col-2">
                    <input type="button" class="btn btn-outline-light" value="Buscar" v-on:click="search">
                </div>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import adminApi from '@/services/adminApi'
import projectApi from '@/services/projectApi'
import techApi from '@/services/techApi'
import userApi from '@/services/userApi'

export default {
    name: 'SearchBox',
    data() {
        return {
            item_searched: "",
        }
    },

    props: {
        table: String
    },

    methods: {
        async search() {
            try {
                if (this.item_searched) {
                    var result
                    switch(this.$props.table){
                        case 'User': result = await userApi.searchUser(this.item_searched)
                            break
                        case 'Project': result = await projectApi.searchProject(this.item_searched)
                            break
                        case 'Admin': result = await adminApi.searchAdmin(this.item_searched)
                            break
                        case 'Tech': result = await techApi.searchTech(this.item_searched)
                            break
                        case 'Update': result = await projectApi.searchUpdate(this.item_searched)
                            break
                    }
                    if (result) {
                        console.log(result.data)
                        this.$emit('search', result.data)
                    }
                } else { this.$emit('search', -1) }
            } catch (err) {
                console.log(err)
            }
        },

        cancel() {
            this.item_searched = ""
            this.search()
        }
    }
}
</script>

<style>

</style>