<template>
<div id="modalForm">
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#MyModal">
    <i class="fa fa-plus"></i>
  </button>
  <div id="MyModal" class="modal-dialog modal-lg fade bg-black text-white">
    <div class="row-flex d-flex justify-content-center align-items-center">
        <p>Añade {{ title }} al proyecto: </p>
        <div class="col-md-10 d-flex flex-column justify-content-center">
            <!--  -->
            <select 
                v-if="type == 'User'"
                class="mdb-select md-form form-control"
                searchable="Busca aqui"
                v-model="selected_element"
            >
                <option value="" disabled selected>Elige a los elementes</option>
                <option
                    v-for="element in elements" :key="element.id"
                    :value="element">{{element.nickName}}
                </option>
            </select>
            <!--  -->
            <select 
                v-else-if="type == 'Project'"
                class="mdb-select md-form form-control"
                searchable="Busca aqui"
                v-model="selected_element"
            >
                <option value="" disabled selected>Elige a los elementes</option>
                <option
                    v-for="element in elements" :key="element.id"
                    :value="element">{{element.title}}
                </option>
            </select>
            <!--  -->
        </div>
        <div class="col-md-1 ms-4 d-flex justify-content-center">
            <button 
                type="button"
                class="btn btn-md btn-outline-success rounded-circle"
                v-on:click="saveElement"
            >
                <i class="fa fa-plus"></i>
            </button>
        </div>
    </div>
    <div class="row">
        <p class="fw-bold"></p>
        <p v-if="elements.length === 0" class="text-danger text-center">No seleccionado</p>
        <div v-else class="col">
            <div v-for="(part) in elements" :key="part" class="row mb-2">
                <button
                type="button"
                class="btn btn-danger btn-sm rounded-pill p-3"
                style="width: 100%;"
                v-on:click="deleteElement(part.nickName)"
                >
                {{ part.nickName }} <i class="fa-solid fa-circle-xmark"></i>
                </button>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
    name: 'modalForm',
    props: {
        model: String,
        list: Array
    },

    data() {
        return {
            type: "",
            elements: []
        }
    },

    created(props) {
        this.type = props.model
        this.elements = props.list
    },

    methods : {
        saveElement() {
            let found = false
            for(let i = 0; i < this.elements.length && found == false; i++){
                if(this.selected_element.nickName == this.elements[i].nickName){
                found = true
                }
            }
            if (found == false && this.selected_element != {}) { 
                this.elements.push(this.selected_element)
                console.log(this.elements)
            }
            else { console.log("ERROR: elemente ya añadido")} 
        },

        deleteElement(atrib) {
            let found = -1
            for(let i = 0; i < this.elements.length && found == -1; i++){
                if(atrib == this.elements[i].atrib){
                found = i
                }
            }
            if (found != -1) {
                this.elements.splice(found, 1)
                console.log(this.elements)
            }
        },
    }
}
</script>

<style>

</style>