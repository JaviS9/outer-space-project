<template>
<div>
    <!-- BUTTON MODAL -->
    <button  v-if="type === 'user'" type="button"
        class="ms-2 btn btn-sm rounded-circle"
        :class="{ 'btn-outline-warning': title == 'suscripciones', 'btn-outline-primary': title == 'participaciones'}"
        data-bs-toggle="modal"
        :data-bs-target="'#' + id">
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
        <div class="modal-dialog">
            <div 
                class="modal-content bg-black p-3"
                :class="{ 'border-warning': title == 'suscripciones', 'border-primary': title == 'participaciones'}"
            >
                <div class="row-flex d-flex align-items-start my-2">
                <p
                    class="modal-title"
                    :class="{ 'text-warning': title == 'suscripciones', 'text-primary': title == 'participaciones'}"
                    id="exampleModalLabel">
                    Añadir {{ title }}
                </p>
                </div>
                <div class="row-flex d-flex align-items-center my-2">
                <select
                    v-if="type === 'user'"
                    class="mdb-select md-form form-control"
                    aria-placeholder="Elige los usuarios a suscribir"
                    v-model="selected_item"
                >
                    <option value="" disabled selected>Elige los usuarios a suscribir</option>
                    <option
                        v-for="item in list" :key="item.id"
                        :value="item">{{item.nickName}}
                    </option>
                </select>
                <select
                    v-if="type === 'project'"
                    class="mdb-select md-form form-control"
                    aria-placeholder="Elige los usuarios a suscribir"
                    v-model="selected_item"
                >
                    <option value="" disabled selected>Elige los proyectos a suscribir</option>
                    <option
                        v-for="item in list" :key="item.id"
                        :value="item">{{item.title}}
                    </option>
                </select>
                <button 
                    type="button"
                    class="btn btn-sm btn-outline-success rounded-circle ms-2"
                    v-on:click="saveItem(selected_items)"
                >
                    <i class="fa fa-plus"></i>
                </button>
                </div>
                <div v-if="selected_items.length === 0" class="row my-2">
                <p class="text-danger text-center">No seleccionado</p>
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
                <!--  -->
                <div class="row-flex d-flex justify-content-end align-items-center mt-2 p-2">
                <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" v-on:click="cancel">Cancelar</button>
                <button type="button"
                    class="btn text-black btn-sm ms-2"
                    :class="{ 'btn-warning': title == 'suscripciones', 'btn-primary': title == 'participaciones'}"
                    v-on:click="sendList">Añadir</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import swal from 'sweetalert';

export default {
    name:'ModalForm',
    data() {
        return {
            selected_item: null,
            selected_items: [],
        }
    },

    props: {
        id: String,
        title: String,
        type: String,
        list: Array,
    },

    methods: {
        cancel() {
            this.selected_items = [];
        },

        saveItem(list) {
            let found = false;
            for (let i = 0; i < list.length && found == false; i++) {
                if(this.type == 'user') {
                    if (this.selected_item.nickName == list[i].nickName) {
                        found = true;
                    }
                } else {
                    if (this.selected_item.title == list[i].title) {
                        found = true;
                    }
                }
            }
            if (found == false && this.selected_item != {}) {
                list.push(this.selected_item);
                console.log(list);
            }
            else {
                swal("Cuidado!", "Elemento ya añadido", "error");
            }
        },

        deleteItem (atrib, list) {
            let found = -1;
            for (let i = 0; i < list.length && found == -1; i++) {
                if(this.type == 'user') {
                    if (atrib == list[i].nickName) {
                        found = i;
                    }
                } else {
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

        sendList () {
            this.$emit('selected_items', this.selected_items)
        },
    }
}
</script>

<style>

</style>