<template>
<div>
    <!-- BUTTON MODAL -->
    <button  v-if="type === 'user'" type="button"
        class="btn-outline-warning ms-2 btn btn-sm rounded-circle"
        data-bs-toggle="modal"
        :data-bs-target="'#' + id"
        v-on:click="getList"
    >
        <i class="fa fa-plus"></i>
    </button>
    <button v-if="type === 'project'" type="button"
        class="btn btn-sm btn-success text-white border border-2 rounded-pill"
        data-bs-toggle="modal"
        :data-bs-target="'#' + id">
        <i class="fa fa-plus"></i>
    </button>
    <!-- MODAL SUBSCRIPTIONS -->
    <div class="modal fade modal-lg" 
        data-bs-backdrop="static" data-bs-keyboard="false" 
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
        :id="id" >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="border-warning modal-content bg-black p-3">
                <div class="row-flex d-flex align-items-start my-2">
                    <p
                        class="text-warning modal-title"
                        id="exampleModalLabel">
                        Añadir {{ title }}
                    </p>
                </div>
                <div v-if="selected_items.length === 0" class="row my-2">
                    <p class="text-danger text-center">Ninguno seleccionado</p>
                </div>
                <div v-else-if="type === 'user'" class="row my-2">
                    <div class="col d-flex justify-content-start align-items-center">
                        <button
                        v-for="(item) in selected_items" :key="item.id"
                        type="button"
                        class="btn btn-danger btn-sm rounded-pill p-2 me-2"
                        v-on:click="deleteItem(item.nickName, selected_items)"
                        >
                        {{ item.nickName }} <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
                <div v-else-if="type === 'project'" class="row my-2">
                    <div class="col d-flex justify-content-start align-items-center">
                        <button
                        v-for="(item) in selected_items" :key="item.id" 
                        type="button"
                        class="btn btn-danger btn-sm rounded-pill p-2 me-2"
                        v-on:click="deleteItem(item.title, selected_items)"
                        >
                        {{ item.title }} <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
                <div class="row d-flex align-items-center m-0 py-2">
                    <SearchBox :table="'User'" @search="search" v-if="type === 'user'"/>
                    <SearchBox :table="'Project'" @search="search" v-else-if="type === 'project'"/>
                </div>
                <div class="container border rounded border-1 m-0 py-3 scrollable"
                    style="height: 300px"
                >
                    <div class="row  d-flex justify-content-center justify-content-center">
                        <div class="col-10">
                            <div v-if="originlist.length === 0">
                                <p class="text-danger text-center h5 p-3">No encontrado</p>
                            </div>
                            <div v-else-if="type === 'user' && originlist.length > 0"
                                v-for="user in originlist" :key="user.id"
                                class="card bg-black text-white border border-2 mx-0 mb-2 p-0"
                            >
                                <div class="card-body m-0 p-0">
                                    <div class="row-flex d-flex align-items-center justify-content-center p-2">
                                        <div class="col-md-2 flex-column d-flex align-items-end justify-content-center">
                                            <div class="imagePreview__mini-image border border-3 rounded-circle" :style="{ 'background-image': `url(${user.photo})` }"></div>
                                        </div>
                                        <div class="col-md-8 flex-column d-flex align-items-start justify-content-center">
                                            <p class="m-0">{{ user.nickName }}</p>
                                        </div>
                                        <div class="col-md-2 flex-column d-flex align-items-end justify-content-center">
                                            <div class="row-flex d-flex justify-content-center align-items-center">
                                                <button 
                                                    type="button"
                                                    class="btn btn-sm btn-outline-success rounded-circle ms-2"
                                                    v-on:click="saveItem(user, selected_items)"
                                                >
                                                    <i class="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="type === 'project' && originlist.length > 0"
                                v-for="pro in originlist" :key="pro.id"
                                class="card bg-black text-white border border-2 mx-0 mb-2 p-0"
                            >
                                <div class="card-body m-0 p-0">
                                    <div class="row-flex d-flex align-items-center justify-content-center p-2">
                                        <div class="col-md-2 flex-column d-flex align-items-end justify-content-center">
                                            <div class="imagePreview__mini-image border border-3 rounded-circle" :style="{ 'background-image': `url(${pro.photo})` }"></div>
                                        </div>
                                        <div class="col-md-8 flex-column d-flex align-items-start justify-content-center">
                                            <p class="m-0">{{ pro.title }}</p>
                                        </div>
                                        <div class="col-md-2 flex-column d-flex align-items-end justify-content-center">
                                            <div class="row-flex d-flex justify-content-center align-items-center">
                                                <button 
                                                    type="button"
                                                    class="btn btn-sm btn-outline-success rounded-circle ms-2"
                                                    v-on:click="saveItem(pro, selected_items)"
                                                >
                                                    <i class="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="row-flex d-flex justify-content-end align-items-center mt-2 p-2">
                <button type="button" id="close" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" v-on:click="cancel">Cancelar</button>
                <button type="submit"
                    class="btn-warning btn text-black btn-sm ms-2"
                    v-on:click="sendList">Añadir</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import swal from 'sweetalert';
import SearchBox from './SearchBox.vue';

export default {
    name: "ModalForm",
    data() {
        return {
            selected_item: null,
            selected_items: [],
            originlist: []
        };
    },

    props: {
        id: String,
        title: String,
        type: String,
        list: Array,
    },

    created() {
        this.originlist = this.$props.list
    },

    methods: {

        cancel() {
            this.selected_items = [];
        },

        getList() {
            this.originlist = this.$props.list
        },
        
        search(search) {
            if(search != -1) { this.originlist = search }
            else { this.originlist = this.$props.list }            
        },

        saveItem(item, list) {
            let found = false;
            for (let i = 0; i < list.length && found == false; i++) {
                if (this.type == "user") {
                    if (item.nickName == list[i].nickName) {
                        found = true;
                    }
                }
                else {
                    if (item.title == list[i].title) {
                        found = true;
                    }
                }
            }
            if (found == false && this.selected_item != {}) {
                list.push(item);
                console.log(list);
            }
            else {
                swal("Cuidado!", "Elemento ya añadido", "warning");
            }
        },
        deleteItem(atrib, list) {
            let found = -1;
            for (let i = 0; i < list.length && found == -1; i++) {
                if (this.type == "user") {
                    if (atrib == list[i].nickName) {
                        found = i;
                    }
                }
                else {
                    if (atrib == list[i].title) {
                        found = i;
                    }
                }
            }
            if (found != -1) {
                list.splice(found, 1);
                console.log(list);
            }
        },
        sendList() {
            this.originlist = this.$props.list
            this.$emit("selected_items", this.selected_items);
            this.selected_items = []
        },
    },
    components: { SearchBox }
}
</script>

<style>

</style>